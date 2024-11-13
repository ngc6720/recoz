"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import * as api from "@/app/lib/services/spotify";
import { useEffect } from "react";
import { useNotify } from "@/app/ui/notification/NotificationContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: 0,
    },
  },
});

import { usePlaylistValue } from "./playlistContext";

export const QueryProvider = (props: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export const useSearch = (value: string) => {
  const notify = useNotify();

  const q = useQuery({
    queryKey: [value],
    queryFn: () => api.getSearch(value),
    initialData: null,
  });

  useEffect(() => {
    if (q.error) {
      notify({ type: "error", message: q.error.message, duration: Infinity });
    }
  }, [q.error, notify]);

  return q;
};

export const useTracklist = () => {
  const notify = useNotify();
  const playlist = usePlaylistValue();

  const q = useQuery({
    queryKey: [JSON.stringify(playlist)],
    queryFn: () => api.getRecommendations(playlist),
    initialData: null,
  });

  useEffect(() => {
    if (q.error) {
      notify({ type: "error", message: q.error.message, duration: Infinity });
    }
  }, [q.error, notify]);

  return q;
};
