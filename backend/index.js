const rootRouter = require("./routes/index");
const express = require("express");
// const userRouter = require("/user")
const app = express();
const cors = require('cors')
const jwt = require("jsonwebtoken")
app.use(cors())
app.use(express.json());

app.use("/api/v1", rootRouter);



app.listen(3000);
