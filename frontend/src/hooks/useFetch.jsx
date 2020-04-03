import React, { useEffect, useState } from 'react';
/*
const useFetch = (url) => {
  const [data, setData] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [status, setStatus] = useState();
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url, {credentials: 'include'})
      .then(result => {
        setStatus(result.status);
        console.dir({result});
        return result.json();
      })
      .then(data => {
        console.dir({data});
        setData(data);
        setLoaded(true);
      })
      .catch(err => {
        setError(err);
      });
  }, [])

  return { data, status, isLoaded, error };
}
*/

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
        console.log('wtf');
        setFetchResult(newFetchResult);
      });
  }, [])

  return fetchResult;
}

export default useFetch;
