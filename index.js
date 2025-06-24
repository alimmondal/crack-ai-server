const express = require("express");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleGenAI } = require("@google/genai");
// import {GoogleGenAI} from '@google/genai';

const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;


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
<form method="POST" action="/">
<textarea name="prompt" id="prompt"></textarea>
<button type="submit">Generate text</button>
</form>

`

app.get("/prompt", async (req, res) => {
  res.send(form)
})

app.post("/prompt", async (req, res) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  // console.log(response.text);
  const text = response.text;
  res.send({data: text, status:200})
})


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent("Write a story about a magic backpack.");
//   const response = await result.response;
//   const text = await response.text();
//   console.log(text);
// }
// run().catch(console.error);

app.get("/", (req, res) => {
  res.send({ data: "server running", status: 200 });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
