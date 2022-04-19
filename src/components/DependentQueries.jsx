import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueries({ email }) {
  const { data: userResult } = useQuery(['users', email], () => fetchUserByEmail(email));

  const channelId = userResult?.data.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId
  });

  return <div>DependentQueries</div>;
}

export default DependentQueries;
