import React from 'react';
import axios from 'axios';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import { useState } from 'react';

const fetchPortfolios = async () => {
  const query = `query Portfolios {
    portfolios{
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
  }`;
  const {
    data: {
      data: { portfolios },
    },
  } = await axios.post('http://localhost:3000/graphql', {
    query,
  });
  return portfolios;
};

const graphCreatePortfolio = async () => {
  const query = `mutation CreatePortfolio($input:PortfolioInput) {
    createPortfolio(portfolioInput:$input) {
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
  const variables = {
    input: {
      company: 'Wipro',
      companyWebsite: 'www.google.com',
      location: 'India',
      title: 'Full Stack Developer',
      endDate: '01/01/2016',
      description: 'Doing something, programing....',
      jobTitle: 'Engineer',
    },
  };
  const {
    data: {
      data: { createPortfolio },
    },
  } = await axios.post('http://localhost:3000/graphql', {
    query,
    variables,
  });
  return createPortfolio;
};

const graphUpdatePortfolio = async (id) => {
  const query = `mutation UpdatePortfolio($id:ID,$input:PortfolioInput) {
    updatePortfolio(id:$id,portfolioInput:$input) {
      _id
      company
      companyWebsite
      location
      title
      endDate
      description
      jobTitle
    }
  }`;
  const variables = {
    id,
    input: {
      company: 'Star',
      companyWebsite: 'www.facebook.com',
      location: 'USA',
      title: 'Full Stack Web Developer',
      endDate: '01/01/2016',
      description: 'Doing something, developing....',
      jobTitle: 'Web Engineer',
    },
  };
  const {
    data: {
      data: { updatePortfolio },
    },
  } = await axios.post('http://localhost:3000/graphql', {
    query,
    variables,
  });
  return updatePortfolio;
};

const graphDeletePortfolio = async (id) => {
  const query = `mutation DeletePortfolio($id:ID) {
    deletePortfolio(id:$id) 
  }
  `;
  const variables = {
    id,
  };
  const {
    data: {
      data: { deletePortfolio },
    },
  } = await axios.post('http://localhost:3000/graphql', {
    query,
    variables,
  });
  return deletePortfolio;
};

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data);

  const createPortfolio = async () => {
    const newData = await graphCreatePortfolio();
    // console.log(newData);
    setPortfolios([...portfolios, newData]);
  };

  const updatePortfolio = async (id) => {
    const index = portfolios.findIndex((p) => p._id === id);
    const newData = await graphUpdatePortfolio(id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = newData;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const dataId = await graphDeletePortfolio(id);
    const newPortfolios = portfolios.filter((p) => p._id !== dataId);
    setPortfolios(newPortfolios);
  };

  return (
    <>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className='btn btn-primary' onClick={createPortfolio}>
          Create Portfolio
        </button>
      </section>
      <section className='pb-5'>
        <div className='row'>
          {portfolios.map((portfolio) => (
            <div className='col-md-4' key={portfolio._id}>
              <PortfolioCard portfolio={portfolio} />
              <button
                className='btn btn-primary'
                onClick={() => updatePortfolio(portfolio._id)}
              >
                Update Portfolio
              </button>
              <button
                className='btn btn-primary'
                onClick={() => deletePortfolio(portfolio._id)}
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

// Portfolios.getInitialProps = async () => {
//   const data = await apiCall();
//   return { ...data };
// };

Portfolios.getInitialProps = async () => {
  const data = await fetchPortfolios();
  return { data };
};

export default Portfolios;
