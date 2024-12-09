const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDb");
const cors = require("cors");
const colors = require("colors");
const auth = require("./routes/auth");
const propertyRouter = require("./routes/propertyRouter");

const app = express();

dotenv.config({ path: ".env" });

connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Beta Home Server" });
});
app.use("/api/v1/auth", auth);
app.use("/api/v1/property", propertyRouter);

const port = 5000;

const server = app.listen(
  port,
  console.log(`Server is running on ${port}`.yellow.bold)
);
