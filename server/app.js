const express = require("express");
const router = require("./routes");
require("dotenv").config();

const app = express();

app.use("/", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, "localhost", () => {
  console.log(`Server Running http://localhost:${PORT}`);
});
