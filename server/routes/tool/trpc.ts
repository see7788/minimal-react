import { inferAsyncReturnType, initTRPC, createInputMiddleware } from '@trpc/server';
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { CreateHTTPContextOptions, createHTTPHandler } from '@trpc/server/adapters/standalone';
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws"
import { NodeHTTPCreateContextOption } from "@trpc/server/adapters/node-http"
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
export async function expressContext(op: CreateExpressContextOptions) {
    // if (!op.req.cookies["id_user"]) {
    //     throw new TRPCError({ code: "UNAUTHORIZED", message: "需要登录" })
    // }
    return { ...op };
}

export default new class {
    base = initTRPC.create();
    express
    constructor() {
        this.express = initTRPC
            // .meta<{ id_use: string }>()
            .context<inferAsyncReturnType<typeof expressContext>>()
            // .context<Awaited<ReturnType<typeof expressContext>>>()
            // .context<context_t>()
            .create({
                // transformer: superjson
            })
        const expresspipe = this.express.middleware((op) => {
            return op.next();
        }).unstable_pipe((op) => {
            if (!op.ctx.req.cookies["id_user"]) {
                throw new TRPCError({ code: "UNAUTHORIZED", message: "需要登录" })
            }
            return op.next({
                ctx: {
                    //...ctx,
                    id_use: 'bar' as const,
                },
            });
        });
        this.expressUser = this.express.procedure.use(expresspipe);
        this.expressUserLogin = this.express.procedure.input(z.number().nullish()).query((op) => {
            if (op.input) {
                op.ctx.res.cookie("id_user", "expressRouter" + new Date().getTime(), {})
            }
            return op.ctx.req.cookies?.id_user || op.input || "op.input is null"
        })

    }
    expressUser;
    expressUserLogin;
}




