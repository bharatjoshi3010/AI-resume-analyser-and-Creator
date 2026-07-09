const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")

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
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("the title of the job for which the interview report is generated"),
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

async function generatePdfFromHtml(htmlContent){

    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: "networkidle0"})

    const pdfBuffer = await page.pdf({ format: "A4", margin:{
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm"
    }})

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({resume, selfDescription, jobDescription}){
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })
    const prompt = `You are a professional resume writer. Your task is to create a polished, ATS-friendly resume in HTML format.

CRITICAL RULES — YOU MUST FOLLOW THESE WITHOUT EXCEPTION:
1. PRESERVE ALL PERSONAL DETAILS EXACTLY AS THEY APPEAR IN THE ORIGINAL RESUME. This includes:
   - Full name (do NOT change, invent, or guess the name)
   - Email address (copy verbatim)
   - Phone number (copy verbatim)
   - LinkedIn URL/username (copy verbatim — do NOT invent a LinkedIn URL)
   - GitHub URL/username (copy verbatim — do NOT invent a GitHub URL)
   - Location / City (copy verbatim)
   - Any other contact or personal information
2. PRESERVE ALL WORK EXPERIENCE EXACTLY. Copy every company name, job title, dates of employment, and responsibilities verbatim. You may lightly rephrase bullet points to be more impactful but NEVER change the company, role, or dates.
3. PRESERVE ALL PROJECTS EXACTLY. Copy every project name, technology stack, and description verbatim. You may tighten the language but NEVER rename or omit projects.
4. PRESERVE ALL EDUCATION EXACTLY. Copy degree, institution name, and graduation year verbatim.
5. PRESERVE ALL SKILLS EXACTLY. Do not add skills the candidate has not listed.
6. DO NOT FABRICATE ANYTHING. If a piece of information (e.g. LinkedIn, GitHub) is not present in the original resume, simply omit that field — do not make one up.

WHAT YOU SHOULD DO:
- Reorganize and format the information professionally in clean HTML.
- Tailor the summary/objective section to align with the job description.
- Reorder or emphasize skills and experience bullets that are most relevant to the job description.
- Make the language concise and impactful (action verbs, quantified results where they already exist).
- Apply a clean, professional design with subtle color accents and good typography.
- Keep the resume to 1–2 pages when rendered as a PDF.

INPUTS:
--- ORIGINAL RESUME (source of truth for all personal details, experience, and projects) ---
${resume}

--- CANDIDATE SELF DESCRIPTION ---
${selfDescription}

--- JOB DESCRIPTION (use only for tailoring emphasis and summary) ---
${jobDescription}

OUTPUT:
Return a JSON object with a single field "html" containing the complete, self-contained HTML of the resume (inline CSS, no external dependencies). The HTML must be well-structured, ATS-parsable, and visually professional.`


    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema),
        }

    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = {generateInterviewReport, generateResumePdf }