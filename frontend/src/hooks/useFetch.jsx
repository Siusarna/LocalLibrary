import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [fetchResult, setFetchResult] = useState({ isLoaded: false, error: null });

  useEffect(() => {
    if (!shouldUpdate) return;
    const newFetchResult = {};
    fetch(url, { credentials: 'include' })
      .then((result) => {
        newFetchResult.status = result.status;
        newFetchResult.isLoaded = result.ok;
        return result.json();
      })
      .then((data) => {
        newFetchResult.data = data;
      })
      .catch((error) => {
        newFetchResult.error = error;
      })
      .then(() => {
        setFetchResult(newFetchResult);
        setShouldUpdate(false);
      });
  }, [shouldUpdate]);

  return { ...fetchResult, update: () => { setShouldUpdate(true); } };
};

export default useFetch;
