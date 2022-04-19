import { useQuery } from 'react-query';
import request from '../utils/axiosUtil';

const fetchSuperHero = () => {
  return request({
    url: '/superheroes'
  });
};

const useHeroes = ({ onSuccess, onError }) => {
  return useQuery('super-heroes', fetchSuperHero, {
    onSuccess,
    onError,
    select: (data) => data.data
  });
};

export default useHeroes;
