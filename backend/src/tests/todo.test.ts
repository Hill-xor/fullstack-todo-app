import request from "supertest";
import mongoose from "mongoose";
import app from "../index";
import Todo from "../models/todo.model";

describe("Todo API", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log(`[TEST] MongoDB connected !!`);

    } catch (error) {
      console.error(`[TEST] Failed to connect to MongoDB: ${error}`);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log(`[TEST] MongoDB connection closed.`);
  });

  afterEach(async () => {
    await Todo.deleteMany({});
  });

  it("1) Should create a new todo task", async () => {
    const res = await request(app).post("/api/todos").send({title: "New Todo"});

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Todo");
    expect(res.body.completed).toBe(false);
  });

  it("2) Should fetch all todos from DB", async() => {
    await Todo.create({title: "Sample Todo"});

    const res = await request(app).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].title).toBe("Sample Todo");

  })

});
