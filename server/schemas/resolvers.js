const { AuthenticationError } = require("apollo-server-express");
const { bookSchema, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getUser: async (parent, { id, username, user = null }) => {
      return User.findOne({
        $or: [{ _id: user ? user._id : id }, { username: username }],
      });
    },
  },

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findIneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
