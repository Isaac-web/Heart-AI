import express, { Request, Response } from "express";
import mongoose from "mongoose";
import debug from "debug";
import config from "config";

import users from "./routes/users.routes";
import medicalReports from "./routes/medical-reports.routes";
import chatSessions from "./routes/chat-session.routes";

const logDb = debug("db");

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Here we go!" });
});

app.use("/users/", users);
app.use("/medical-reports/", medicalReports);
app.use("/chat-sessions/", chatSessions);

const port = config.get("port");
mongoose
  .connect(config.get("db.url"))
  .then(() => {
    logDb(`Connected to ${config.get("db.url")}`);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error("Something went wrong while connecting to mongodb.", err);
  });
