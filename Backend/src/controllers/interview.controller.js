const pdfParse = require("pdf-parse")
const {generateInterviewReport, generateResumePdf} = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description   Controller to generate interview report based on user self description, resume and job
 */
async function generateInterViewReportController(req, res){

    // const resumeFile = req.file    //for the files, we do not write req.body, we write req.file

    let resumeText = "";
    if (req.file) {
        const resumeContent = await pdfParse(req.file.buffer);
        resumeText = resumeContent.text;
    }
    const { selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi      //destructuring whole interview report by AI
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })

}

/**
 * @description Controller to get interview report by interview id
 */
async function getInterViewReportByIdController(req, res){
    const { interviewId } = req.params
    const interviewReport = await interviewReportModel.findOne({_id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })

}

/**
 * @description Controller to get all interview reports of logged in user
 */
async function getAllInterviewReportsController(req, res){
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -_v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

/**
 * @description generat a controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res){

    const {interviewReportId} = req.params

    const interviewReport =  await interviewReportModel.findById(interviewReportId)

    if(!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

}

module.exports = {
    generateInterViewReportController,
    getInterViewReportByIdController,
    getAllInterviewReportsController
}