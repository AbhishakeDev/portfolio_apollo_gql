import { gql } from 'apollo-boost';

export const CREATE_PORTFOLIO = gql`
  mutation CreatePortfolio($input: PortfolioInput) {
    createPortfolio(portfolioInput: $input) {
      _id
      company
      companyWebsite
      location
      title
      startDate
      endDate
      description
      jobTitle
    }
  }
`;

export const UPDATE_PORTFOLIO = gql`
  mutation UpdatePortfolio($id: ID, $input: PortfolioInput) {
    updatePortfolio(id: $id, portfolioInput: $input) {
      _id
      company
      companyWebsite
      location
      title
      endDate
      description
      jobTitle
    }
  }
`;

export const DELETE_PORTFOLIO = gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`;
