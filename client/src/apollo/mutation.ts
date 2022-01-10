import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      status
      message
    }
  }
`;

export const LOGINIZATION = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      status
      message
      accessToken
      refreshToken
      validation
    }
  }
`;

export const ACCESS_TOKEN_AUTH = gql`
  mutation accessTokenAuth($input: TokenAccess) {
    accessTokenAuth(input: $input) {
      email
      login
      status
      message
    }
  }
`;

export const REFRESH_TOKEN_AUTH = gql`
  mutation refreshTokenAuth($input: TokenRefresh) {
    refreshTokenAuth(input: $input) {
      email
      login
      accessToken
      refreshToken
      validation
      status
      message
    }
  }
`;
