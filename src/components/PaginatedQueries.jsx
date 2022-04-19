import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, isFetching, data, isPreviousData } =
    useQuery(['color', pageNumber], () => fetchColors(pageNumber), {
      // Keep show pervious page data until next page is fetched
      keepPreviousData: true
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
        {data?.data.map((color) => (
          <div key={color.id}>
            <h3>
              {color.id} - {color.label}
            </h3>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
          type="button"
        >
          Previous Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 5}
          type="button"
        >
          Next Page
        </button>
      </div>

      {isFetching && isPreviousData && 'Loading...'}
    </>
  );
}

export default PaginatedQueries;
