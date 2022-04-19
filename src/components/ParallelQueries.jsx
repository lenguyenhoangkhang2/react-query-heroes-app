import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchSuperHeros = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

function ParallelQueries() {
  useQuery('super-heroes', fetchSuperHeros);
  useQuery('friends', fetchFriends);

  return <div>ParallelQueries</div>;
}

export default ParallelQueries;
