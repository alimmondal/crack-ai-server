const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleGenAI } = require("@google/genai");
// import {GoogleGenAI} from '@google/genai';

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}))


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.0-flash-001',
//     contents: 'Why is the sky blue?',
//   });
//   console.log(response.text);
// }

// main();

const form = `
<form method="POST" action="/prompt">
<textarea name="prompt" id="prompt"></textarea>
<button type="submit">Generate text</button>
</form>

`

app.get("/prompt", async (req, res) => {
  res.send(form)
})
app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
// console.log(result)
    const text = await result.candidates[0]?.content.parts[0]?.text || "No response found";
    const resp= text.split("json\n")

    res.send(`
      <h2>Prompt:</h2><p>${prompt}</p>
      <h2>Gemini Response:</h2><p>${resp}</p>
      <button><a href="/prompt">Try again</a></button>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});



app.get("/", (req, res) => {
  res.send({ data: "server running", status: 200 });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
