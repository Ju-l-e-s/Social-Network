"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { getCurrentUser, type AuthUser } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/use-auth";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 30,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator />
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function AuthHydrator() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const { data, error } = useQuery<AuthUser>({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (error) {
      clearUser();
    }
  }, [clearUser, error]);

  return null;
}
