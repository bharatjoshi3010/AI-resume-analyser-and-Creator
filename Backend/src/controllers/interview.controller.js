const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res){

    // const resumeFile = req.file    //for the files, we do not write req.body, we write req.file

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi      //destructuring whole interview report by AI

    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}


module.exports = {
    generateInterViewReportController
}