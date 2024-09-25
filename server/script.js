const express = require('express');
const cors = require('cors');
const path = require('path');
const Groq = require("groq-sdk");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY2 });

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { topic, style } = req.body;
    console.log(`Received request for topic: ${topic}, style: ${style}`);
    const chatCompletion = await getGroqChatCompletion(topic, style);
    const roadmap = chatCompletion.choices[0]?.message?.content || "No content returned";
    console.log("Generated roadmap:", roadmap);
    res.json({ roadmap });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

async function getGroqChatCompletion(topic, style) {
  // ... (keep the existing implementation)
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});