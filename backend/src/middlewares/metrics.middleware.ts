import {Request, Response, NextFunction} from "express";
import {httpRequestDurationMicroSeconds, httpRequestCounter} from "../metrics"

export const recordMetrics = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
  const duration = Date.now() - start;

  httpRequestDurationMicroSeconds
    .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
    .observe(duration);
  
  console.log('metrics logged')
  httpRequestCounter.labels(req.method, req.route?.path || req.path).inc();
});
  next();
}