import graphql from 'graphql';
const { buildSchema } = graphql;

export const schema = buildSchema(`
    type User{
        id:ID
        login: String
        email: String
        password: String
    }
    input UserInput{
        login: String
        email: String!
        password: String!
    }
    type Query{
        getUser: [User]
    }
    type Mutation{
        createNewUser(input:UserInput): User
    }
`)
