const express = require('express');
const app = express();
global.fetch = require('node-fetch');
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;
const cors = require('cors');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI("AIzaSyCisunQmmiEz2E8JihFQDZ3cEDawohD7R4");

app.use(express.json());
app.use(cors());

app.post('/', async (req, res) => {

    const {code, language} = req.body;
    console.log("🚀 ~ app.post ~ code:", code)
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `
        You are an expert code reviewer.
        
        Analyze the following code written in ${language}. Your job is to:
        - Identify any **bugs**, **security vulnerabilities**
        - Suggest improvements for **readability**, **performance**, and **best practices**
        - Follow proper formatting using **bullet points** and **code blocks** where needed
        give the response in html format.
        Code:
        \`\`\`${language}
        ${code}
        \`\`\`
        `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.json({ text });
    } catch (error) {
        console.error('Error:', error);
    }
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
