import React from 'react';
// import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';
import { GET_PORTFOLIO } from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

// const PortfolioDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   return <h1>I am detail page with ID: {id}</h1>;
// };

// const fetchPortfolio = async (id) => {
//   const query = `query Portfolio($id:ID){
//     portfolio(id:$id){
//      _id
//       company
//       companyWebsite
//       location
//       title
//       endDate
//       startDate
//       description
//       jobTitle
//     }
//   }`;
//   const variables = { id };
//   const {
//     data: {
//       data: { portfolio },
//     },
//   } = await axios.post('http://localhost:3000/graphql', {
//     query,
//     variables,
//   });
//   return portfolio;
// };

const PortfolioDetail = ({ query: { id } }) => {
  const { loading, error, data } = useQuery(GET_PORTFOLIO, {
    variables: { id },
  });
  const portfolio = (data && data.portfolio) || {};

  if (loading) {
    return 'Loading...';
  }

  const {
    title,
    company,
    location,
    endDate,
    startDate,
    description,
    jobTitle,
  } = portfolio;

  return (
    <div className='portfolio-detail'>
      <div className='container'>
        <div className='jumbotron'>
          <h1 className='display-3'>{title}</h1>
          <p className='lead'>{jobTitle}</p>
          <p>
            <a className='btn btn-lg btn-success' href='#' role='button'>
              {company}
            </a>
          </p>
        </div>

        <div className='row marketing'>
          <div className='col-lg-6'>
            <h4 className='title'>Location</h4>
            <p className='text'>{location}</p>

            <h4 className='title'>Start Date</h4>
            <p className='text'>{startDate}</p>
          </div>

          <div className='col-lg-6'>
            {/* TODO: days later... */}
            <h4 className='title'>Days</h4>
            <p className='text'>44</p>

            <h4 className='title'>End Date</h4>
            <p className='text'>{endDate}</p>
          </div>
          <div className='col-md-12'>
            <hr />
            <h4 className='title'>Description</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//here we recieve query from url parameters and not througgh any component, here query is refered to req.query.params.id
PortfolioDetail.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(PortfolioDetail, { getDataFromTree });
