require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
// const {resume, selfDescription, jobDescription} = require("./src/services/temp")
// const generateInterviewReport = require("./src/services/ai.services")
// const invokeGeminiAi = require("./src/services/ai.services")

connectToDB()
// invokeGeminiAi()

// generateInterviewReport({ resume, selfDescription, jobDescription})  we put it here just to check whether it is working properly or not

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})