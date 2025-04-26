import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes"
import {metricsRouter} from "./metrics"
import {recordMetrics} from "./middlewares/metrics.middleware"

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use(recordMetrics);
app.use("/metrics", metricsRouter);
app.use("/api/todos", todoRoutes);


if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5500
  mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(`DB Connection error: ${error}`));
}

export default app;

app.get("/", (_req, res) => {
  res.send("API running!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));