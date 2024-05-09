import { useState, useEffect } from "react";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetch(`${url}?search=`)
      .then((response) => response.json())
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
