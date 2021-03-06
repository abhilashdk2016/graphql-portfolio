import { gql } from '@apollo/client';
export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio (id: $id) {
      _id
      title
      daysofExperience @client
      company
      companyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
}`;

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios { 
      _id 
      title 
      company 
      companyWebsite 
      jobTitle 
      description 
      location 
      startDate 
      endDate 
    }
}`;

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio(
    $title: String
    $company: String
    $companyWebsite: String
    $location: String
    $jobTitle: String
    $description: String
    $startDate: String
    $endDate: String
  ) {
    createPortfolio(portfolio: {
      title: $title
      company: $company
      companyWebsite: $companyWebsite
      location: $location
      jobTitle: $jobTitle
      description: $description
      startDate: $startDate
      endDate: $endDate
    })
    { 
      _id 
      title 
      company 
      companyWebsite 
      jobTitle 
      description 
      location 
      startDate 
      endDate 
    }
}`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio(
      $id: ID
      $title: String  
      $company: String 
      $companyWebsite: String 
      $jobTitle: String 
      $description: String 
      $location: String 
      $startDate: String 
      $endDate: String
    ) {
    updatePortfolio(id: $id, portfolio: {
      title: $title
      company: $company 
      companyWebsite: $companyWebsite 
      jobTitle: $jobTitle 
      description: $description 
      location: $location 
      startDate: $startDate 
      endDate: $endDate
    })
    { 
      _id
      title 
      company 
      companyWebsite 
      jobTitle 
      description 
      location 
      startDate 
      endDate 
    }
}`;

export const DELETE_PORTFOLIO = gql`
mutation DeletePortfolio($id: ID) {
  deletePortfolio(id: $id)
}`;

// AUTH Queries
export const SIGN_UP = gql`
  mutation SignUp(
      $avatar: String
      $username: String!
      $email: String!
      $password: String!
      $passwordConfirmation: String!
    ) {
      signUp(input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      })
    }
`;

export const SIGN_IN = gql`
  mutation SignIn(
      $email: String!
      $password: String!
    ) {
      signIn(input: {
        email: $email
        password: $password
      }) {
        username
        _id
        avatar
        email
        role
      }
    }
`;

export const GET_USER = gql`
  query User {
    user {
      _id,
      username,
      role,
      avatar
    }
  }
`;

export const SIGN_OUT = gql`mutation SignOut { signOut }`;

export const GET_USER_PORTFOLIOS = gql`
  query UserPortfolio {
  userPortfolios {
    _id
    title
    jobTitle
    startDate
    endDate
  }
}
`;
