import { useEffect, useState } from "react";
import { apiDomain } from "../config";

const useCompare = (data) => {
  const [similarity, setSimilarity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
    };

    if (data.from_product && data.to_product) {
      setIsLoading(true);

      fetch(`${apiDomain}/api/v1/compare/`, params)
        .then(response => response.json())
        .then(json => setSimilarity(json.similarity))
        .finally(() => setIsLoading(false));
    }
  }, [data.from_product, data.to_product]);

  return {
    similarity,
    isLoading
  }
};

export default useCompare;
