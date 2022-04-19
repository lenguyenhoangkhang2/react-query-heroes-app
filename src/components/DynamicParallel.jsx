import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

function DynamicParallel({ heroIds }) {
  useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id)
      };
    })
  );

  return <div>DynamicParallel</div>;
}

export default DynamicParallel;
