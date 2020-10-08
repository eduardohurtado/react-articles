//Models
import Article from "../models/taskModel";

//Controller -> GraphQL resolvers
const resolvers = {
  Query: {
    async articles() {
      return await Article.find();
    },
  },
  Mutation: {
    async createArticle(_, { input }) {
      console.log(input);
      const newArticle = new Article(input);
      await newArticle.save();
      return newArticle;
    },
    async deleteArticle(_, { _id }) {
      return await Article.findByIdAndDelete(_id);
    },
    async updateArticle(_, { _id, input }) {
      return await Article.findByIdAndUpdate(_id, input, { new: true });
    },
  },
};

export default resolvers;
