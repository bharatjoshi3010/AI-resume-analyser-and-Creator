const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true     //we say it because we are handling data through cookies
}))
app.use(express.json())
app.use(cookieParser())


/* Require all the routes here */
const authRouter = require("./routes/auth.routes")


/* Using all the routes here */
app.use("/api/auth", authRouter)

module.exports = app