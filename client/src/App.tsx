import { trpc } from './trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, createTRPCProxyClient, createWSClient, wsLink } from '@trpc/client';
import { useState } from 'react';
import { Greeting } from './page/Greeting';
import * as config from 'server/config';
export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),//打印日志
        httpBatchLink({
          url: config.express.url,
          headers() {
            return {}
          },
          // fetch(url, options) {
          //   return fetch(url, {
          //     ...options,
          //     credentials: 'include',
          //   });
          // },
        }),
      ],
    }),
  );
  return (
    // <div className="wrapper">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Greeting />
        </QueryClientProvider>
      </trpc.Provider>
    // </div>
  );
}