import { nanoid } from 'nanoid';
import { useMutation, useQueryClient } from 'react-query';
import request from '../utils/axiosUtil';

const addSuperHero = (hero) => {
  return request({
    url: '/superheroes',
    method: 'post',
    data: hero
  });
};

const useAddHero = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: ({ data: addedHero }) => {
    //   // Refetch list heroes
    //   // queryClient.invalidateQueries('super-heroes');
    //   // Or
    //   queryClient.setQueriesData('super-heroes', (oldQueries) => ({
    //     ...oldQueries,
    //     data: [...oldQueries.data, addedHero]
    //   }));
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes');

      const prevHerosData = queryClient.getQueriesData('super-heroes');

      queryClient.setQueriesData('super-heroes', (oldQueries) => ({
        ...oldQueries,
        data: [
          ...oldQueries.data,
          {
            id: nanoid(),
            ...newHero
          }
        ]
      }));

      return {
        prevHerosData
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.prevHerosData);
    },
    // called on success or error
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    }
  });
};

export default useAddHero;
