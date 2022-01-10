import graphql from "graphql";
const { buildSchema } = graphql;

export const schema = buildSchema(`
    type RegisterReturn{
        status: Int
        message:String
    }
    type LoginReturn{
        status:Int
        message:String
        accessToken: String
        refreshToken: String
        validation: Boolean
    }
    type AccessTokenControll{
        email:String
        login:String
        status:Int
        message:String
    }
    type RefreshTokenControll{
        email:String
        login:String
        accessToken: String
        refreshToken: String
        validation:Boolean
        status:Int
        message:String
    }
    input RegisterInput{
        login: String!
        email: String!
        password: String!
        rememberme: Boolean
    }
    input LoginInput{
        login: String!
        password:String!
    }
    input TokenAccess{
        accessToken: String!
    }
    input TokenRefresh{
        refreshToken: String!
    }
    type Query{
        fakeForQueryGraphQL(input:String): String
    }
    type Mutation{
        register(input:RegisterInput): RegisterReturn
        login(input:LoginInput): LoginReturn
        accessTokenAuth(input:TokenAccess):AccessTokenControll
        refreshTokenAuth(input:TokenRefresh):RefreshTokenControll
    }
`);
