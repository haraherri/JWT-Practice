const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
dotenv.config();

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

(async () => {
  try {
    await connection();

    app.listen(PORT, () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
})();
