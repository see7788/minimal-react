import cors from 'cors';
// import {ipcTest} from "ipc/node"
import { expressContext } from "./routes/tool/trpc"
import { expressRouter } from "./routes"
import * as config from "./config"
import bodyParser from "body-parser"
import { renderTrpcPanel as renderTrpcDoc } from "trpc-panel";
import express from "express"
import cookieParser from 'cookie-parser';
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { applyWSSHandler } from "@trpc/server/adapters/ws"
try {
  console.log("init")
  const app = express();
  app.use(cors({ credentials: true, }));// 允许跨域请求携带 cookie
 // app.use(ipcTest().expressRequestHandler)
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use("/d", (req, res) => {
    // res.clearCookie("name");
    // res.cookie("id_user","tdemo"+new Date().getTime(), {})
    res.send(
      renderTrpcDoc(expressRouter, {
        url: config.express.url,
      })
    )
  })
  app.use(
    config.express.path,
    createExpressMiddleware({
      createContext: expressContext,
      router: expressRouter,
    }));

  const server = app.listen(config.express.port, () => {
    console.log(`express server port ${config.express.port}`)
  });
} catch (e) {
  console.log(e)
}
