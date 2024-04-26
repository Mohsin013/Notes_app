const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connection = require("./config/db");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT} and db is also connected`);
  } catch (error) {
    console.log(error);
  }
});
