import { gql } from 'apollo-boost';

export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio(id: $id) {
      _id
      company
      companyWebsite
      location
      title
      endDate
      startDate
      description
      jobTitle
    }
  }
`;
export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      company
      companyWebsite
      location
      title
      endDate
      startDate
      description
      jobTitle
    }
  }
`;
