import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// const fetchSuperHero = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// const useHero = (heroId) => {
//   return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId), {
//     select: ({ data }) => data
//   });
// };

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useHero = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(['super-hero', heroId], fetchSuperHero, {
    // Initial Query Data
    initialData: () => {
      const heros = queryClient.getQueryData('super-heroes')?.data;

      if (!heros) return undefined;

      const hero = heros.find(({ id }) => id === +heroId);

      return {
        data: hero
      };
    },
    select: ({ data }) => data
  });
};

export default useHero;
