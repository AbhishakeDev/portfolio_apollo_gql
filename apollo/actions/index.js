import { GET_PORTFOLIOS } from '@/apollo/queries';
import {
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
} from '@/apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const useGetPortfolio = () => useQuery(GET_PORTFOLIOS);
// onCompleted is a funciotn indicates that mutation has occured and result has been fetched
// for updating the cache memory after every mutation we will use update method
// do look in the apollo docs (https://www.apollographql.com/docs/react/v2/data/mutations/)
export const useCreatePortfolio = () =>
  useMutation(
    CREATE_PORTFOLIO,
    // {onCompleted: onPortfolioCreated,}
    // this update method asks the client to recreate the get query after the mutation is done and add the newly added portfolio to the state cache
    // the update function helps updation of data in realtime
    {
      update(cache, { data: { createPortfolio } }) {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        cache.writeQuery({
          query: GET_PORTFOLIOS,
          data: { portfolios: [...portfolios, createPortfolio] },
        });
      },
    }
  );

export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
      const newPortfolios = portfolios.filter((p) => p._id !== deletePortfolio);
      cache.writeQuery({
        query: GET_PORTFOLIOS,
        data: { portfolios: [...newPortfolios] },
      });
    },
  });
