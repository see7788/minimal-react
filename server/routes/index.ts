import { z } from 'zod';
import trpc from "./tool/trpc"
export const expressRouter = trpc.base.router({
    login: trpc.base.router({
        user: trpc.expressUserLogin,
        admin: trpc.expressUserLogin,
    }),
    user: trpc.base.router({
        test: trpc.expressUser.query(op => console.log(op.ctx.id_use)),
        query: trpc.expressUser.input(z.string().nullish()).query(op => op.ctx.req.cookies),
        mutation: trpc.expressUser.input(z.string().nullish()).mutation(v => v.input || "提交的是 nullish"),
    }),
    admin: trpc.base.router({
        test: trpc.expressUser.query(op => console.log(op.ctx.id_use)),
        query: trpc.expressUser.input(z.string().nullish()).query(op => {
            console.log(op.ctx.req.cookies)
            return 11
        }),
        mutation: trpc.expressUser.input(z.string().nullish()).mutation(v => v.input || "提交的是 nullish"),

    })
});
export type expressRouter_t = typeof expressRouter;