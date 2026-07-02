const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

//it is just to check wheather AI model is working or not
// async function invokeGeminiAi(){

//     const response = await ai.models.generateContent({
//         model:"gemini-2.5-flash",
//         contents:"Hello gemini! explain what is interview ?"
//     })

//     console.log(response.text)
// }

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's profile matches the job description"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intetion and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behaviroal questions that can be asked in the interview along with their intetion and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("the severity of skill gap i.e low, medium, high ")
    })).describe("list of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting form 1"),
        focus: z.string().describe("the main focus of this day in the preparation plan, e.g. dataset"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively")
})

async function generateInterviewReport({resume, selfDescription, jobDescription}){

    const prompt = `Generate an interview report for a candidate with the following details: 
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    })

    return JSON.parse(response.text)

}

module.exports = generateInterviewReport