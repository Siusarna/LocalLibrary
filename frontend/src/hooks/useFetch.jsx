import React, { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [fetchResult, setFetchResult] = useState({ isLoaded: false, error: null });

  useEffect(() => {
    const newFetchResult = {};
    fetch(url, {credentials: 'include'})
      .then(result => {
        newFetchResult.status = result.status;
        newFetchResult.isLoaded = result.ok;
        return result.json();
      })
      .then(data => {
        newFetchResult.data = data;
      })
      .catch(error => {
        newFetchResult.error = error;
      })
      .then(() => {
        setFetchResult(newFetchResult);
      });
  }, [])

  return fetchResult;
}

export default useFetch;
