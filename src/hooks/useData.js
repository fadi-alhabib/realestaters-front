import { useEffect, useState } from "react";
import apiService from "../services/api-service";

const useData = (endpoint, requestConfig, dependencies) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      apiService
        .get(endpoint, { signal: controller.signal, ...requestConfig })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });

      return () => {
        controller.abort();
      };
    },
    dependencies ? [...dependencies] : []
  );
  return { data, error, isLoading };
};

export default useData;
