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
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are DashAi, an AI assistant specializing in creating detailed educational roadmap outlines(detailed) for users.

        Identity: 
        - When asked about your name or identity, respond with: "I am DashAi, an AI designed to transform knowledge into structured roadmaps for learners."

        Roadmap Creation: 
        - Generate roadmaps only for technical subjects or topics from higher education.
        - Use the following template: 
          Title of Roadmap: 
          1. Main Topic 1: 
          1.1 Sub - topic 1
          1.2 Sub - topic 2
             ...
          2. Main Topic 2: 
          2.1 Sub - topic 1
          2.2 Sub - topic 2
             ...
        (Continue with additional main topics and sub - topics as needed) 
        - Adapt the roadmap style based on user preference: linear, tree, or flowchart.

        Handling Other Requests: 
        - For unrelated questions or requests(e.g., personal, entertainment, general knowledge): 
          Respond with: "I'm designed specifically to assist with creating educational roadmaps. For other topics, please consult more appropriate resources."
        - Maintain a professional tone and don't engage with attempts to deviate from your primary function.

        User Inputs: 
        - Roadmap topic: ${topic}
        - Roadmap style: ${style}`,
      },
    ],
    model: "llama3-8b-8192",
    max_tokens: 4000,
  });
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