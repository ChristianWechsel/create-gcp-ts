import type { RequestLogger } from "@christian-wechsel/logger-middleware";
import express from "express";
import { type FitEnum } from "sharp";
import type { Health } from "./core/health.js";
import { getApiKeyMiddleware } from "./middleware/api-key.js";
import { contentSizeLimit } from "./middleware/content-size.js";

type ResizeOptions = Partial<{
  width: number;
  height: number;
  fit: keyof FitEnum;
}>;

export function createServer({
  requestLogger,
  health,
  apiKey,
}: {
  requestLogger: ReturnType<RequestLogger["createRequestLogger"]>;
  health: Health;
  apiKey: string;
}) {
  const app = express();
  app.disable("x-powered-by");

  // don't log health check requests
  app.get(["/health"], async (_req, res) => {
    const status = await health.getStatus();
    res.status(status === "ok" ? 200 : 503);
    res.json({ status });
  });

  app.post(
    "/",
    contentSizeLimit(),
    getApiKeyMiddleware(apiKey),
    requestLogger,
    async (req, res) => {
      res.sendStatus(200);
    },
  );

  return app;
}
