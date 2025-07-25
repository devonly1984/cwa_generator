'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { ReactNode, useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
import SuperJSON from 'superjson';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
const getQueryClient=()=> {
  if (typeof window === 'undefined') {
 
    return makeQueryClient();
  }
 
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
const getUrl=()=> {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}
export const  TRPCReactProvider=(
  props: Readonly<{
    children: ReactNode;
  }>,
) =>{

  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON, 
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}