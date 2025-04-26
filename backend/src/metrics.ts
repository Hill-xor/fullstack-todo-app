import client from "prom-client";
import express from "express";

const collectDefMetrics = client.collectDefaultMetrics;
collectDefMetrics();

export const httpRequestDurationMicroSeconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP request in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 200, 300, 400, 500, 1000], //milli
});

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route"]
});

export const metricsRouter = express.Router();

metricsRouter.get("/", async (_req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.send(await client.register.metrics()); // Cannot GET /metrics
});

