import React from 'react';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import {
  useGetPortfolio,
  useCreatePortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
} from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const Portfolios = () => {
  const { data, loading } = useGetPortfolio();
  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();
  const [createPortfolio] = useCreatePortfolio();

  if (loading) {
    return 'Loading...';
  }

  const handleCreate = () => {
    createPortfolio({
      variables: {
        input: {
          company: 'Wipro',
          companyWebsite: 'www.google.com',
          location: 'India',
          title: 'Full Stack Developer',
          startDate: '2012-12-12T23:59Z',
          endDate: '2013-11-14T23:59Z',
          description: 'Doing something, programing....',
          jobTitle: 'Engineer',
        },
      },
    });
  };

  const handleUpdate = (id) => {
    updatePortfolio({
      variables: {
        id,
        input: {
          company: 'Star',
          companyWebsite: 'www.facebook.com',
          location: 'USA',
          title: 'Full Stack Web Developer',
          startDate: '2012-12-12T23:59Z',
          endDate: '2013-11-14T23:59Z',
          description: 'Doing something, developing....',
          jobTitle: 'Web Engineer',
        },
      },
    });
  };

  const portfolios = (data && data.portfolios) || {};

  return (
    <>
      <section className='section-title'>
        <div className='px-2'>
          <div className='pt-5 pb-4'>
            <h1>Portfolios</h1>
          </div>
        </div>
        <button className='btn btn-primary' onClick={handleCreate}>
          Create Portfolio
        </button>
      </section>
      <section className='pb-5'>
        <div className='row'>
          {portfolios &&
            portfolios.map((portfolio) =>
              portfolio ? (
                <div className='col-md-4' key={portfolio?._id}>
                  <a className='card=link'>
                    <PortfolioCard portfolio={portfolio} />
                  </a>
                  <button
                    className='btn btn-warning'
                    onClick={() => handleUpdate(portfolio._id)}
                  >
                    Update Portfolio
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() =>
                      deletePortfolio({ variables: { id: portfolio._id } })
                    }
                  >
                    Delete Portfolio
                  </button>
                </div>
              ) : (
                <p>Loading....</p>
              )
            )}
        </div>
      </section>
    </>
  );
};

// Portfolios.getInitialProps = async () => {
//   const data = await apiCall();
//   return { ...data };
// };

// Portfolios.getInitialProps = async () => {
//   const data = await fetchPortfolios();
//   return { data };
// };

export default withApollo(Portfolios, { getDataFromTree });
