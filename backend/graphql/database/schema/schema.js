import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../controller/resolver";

const typeDefs = `
    type Query{
        articles: [Article]
    }

    type Mutation{
        createArticle(input: ArticleInput): Article
        deleteArticle(_id: ID): Article
        updateArticle(_id: ID, input: ArticleInput): Article
    }

    type Article{
        _id: ID
        name: String!
        lastName: String!
        gender: String!
        title: String!
        description: String!
    }

    input ArticleInput{
        name: String!
        lastName: String!
        gender: String!
        title: String!
        description: String!
    }
`;

export default makeExecutableSchema({ typeDefs, resolvers });
