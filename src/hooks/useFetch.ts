import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  handleCancelRequest: () => void;
}

export function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);

    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((data: T[]) => setData(data))
      .catch((error) => {
        if (error.name === "AbortError") console.log("Request Cancelled");
        setError(error.message);
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request Cancelled");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
