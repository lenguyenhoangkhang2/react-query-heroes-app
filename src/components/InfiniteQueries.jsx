import React, { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_, pages) => {
      if (pages.length < 5) return pages.length + 1;

      return undefined;
    }
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.data.map((color) => (
              <h2 key={color.id}>
                {color.id} - {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} type="button" onClick={fetchNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage && 'Fetching'}</div>
    </>
  );
}

export default InfiniteQueries;
