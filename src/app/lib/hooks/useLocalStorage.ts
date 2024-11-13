import { useState, useEffect } from "react";

export default function useLocalStorage<T>(k: string) {
  const [v, setV] = useState<T | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(k);
    if (stored) setV(JSON.parse(stored));
  }, [k]);

  useEffect(() => {
    if (v !== null) window.localStorage.setItem(k, JSON.stringify(v));
  }, [k, v]);

  return [v, setV] as const;
}
