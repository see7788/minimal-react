import { 
    createTRPCReact,
    // type inferReactQueryProcedureOptions,
    httpBatchLink,
    createTRPCProxyClient
 } from '@trpc/react-query';
import type { expressRouter_t } from 'server/routes';
// import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
export const trpc = createTRPCReact<expressRouter_t>();
// export type ReactQueryOptions = inferReactQueryProcedureOptions<expressRouter_t>;
// export type RouterInputs = inferRouterInputs<expressRouter_t>;
// export type RouterOutputs = inferRouterOutputs<expressRouter_t>;
// const client = createTRPCProxyClient<expressRouter_t>({
//     links: [
//       httpBatchLink({
//         url: 'http://localhost:3000/trpc',
//         // You can pass any HTTP headers you wish here
//         async headers() {
//           return {
//             authorization: getAuthCookie(),
//           };
//         },
//       }),
//     ],
//   });