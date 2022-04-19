import React from 'react';
import { useParams } from 'react-router-dom';
import useHero from '../hooks/useHero';

function RQSuperHero() {
  const { id } = useParams();

  const { isLoading, data, isError, error } = useHero(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    data && (
      <div>
        {data.name} - {data.alterEgo}
      </div>
    )
  );
}

export default RQSuperHero;
