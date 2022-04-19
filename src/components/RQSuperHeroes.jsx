import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAddHero from '../hooks/useAddHero';
import useHeroes from '../hooks/useHeroes';

const onSuccess = () => {
  console.log('Perform side effect after data fetching');
};

const onError = () => {
  console.log('Perform side effect encountering error');
};

function RQSuperHeroes() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const { data, refetch, isLoading, isError, error } = useHeroes({
    onSuccess,
    onError
  });

  const {
    mutate: addHero,
    isError: isAddHeroError,
    error: addHeroError,
    isLoading: isAddHeroLoading
  } = useAddHero();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleAddHeroSubmit = (e) => {
    e.preventDefault();

    addHero({
      name,
      alterEgo
    });

    setName('');
    setAlterEgo('');
  };

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <form onSubmit={handleAddHeroSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          placeholder="Alter Ego"
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button type="submit">
          {isAddHeroLoading ? 'Adding...' : 'Add Hero'}
        </button>
      </form>
      {isAddHeroError && <p>{addHeroError.message}</p>}
      <br />
      {data &&
        data.map((hero) => (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        ))}
      <br />
      <button onClick={refetch} type="button">
        Fetch Heroes
      </button>
    </>
  );
}

export default RQSuperHeroes;
