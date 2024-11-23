/**
 * Express server which connects to OpenAI backend.
 * Defines REST API to interact with GPT model.
 * Provides context injection, testing, and user feedback.
 */
import express from 'express';
import cors from "cors";
import { getGptResonse } from './openaiService.js';

// Predefined message history for testing GPT responses
const DEFAULT_MESSAGE_HISTORY = [
  { "role": "user", "content": "Hello!" },
  { "role": "assistant", "content": "Howdy!" },
  { "role": "assistant", "content": "The user will enter the context either Dyslexia or Dyscalculia, and an assignment Question. You will take this question and translate the question into a format that is easily understandable for those with dyslexia or dyscalculia depending on which one they state" }
];

const app = express();  // Create an Express application

// CORS configuration to allow requests from any origin
const corsOptions = {
  origin: '*', 
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json()); // Middleware to parse JSON payloads
app.use(cors(corsOptions));

// Default route to check server status
app.get('/', (req, res) => {
    res.send("The server is up!");
});

// Route to test GPT response with default message history
app.get('/messageHitoryTest', async (req, res) => {
  console.log("Testing Message History Response");
  const response = await getGptResonse(DEFAULT_MESSAGE_HISTORY); // Call GPT service
  res.send(response);
});

// Route to handle translation requests from users
app.post('/response', async (req, res) => {
  const { userInput, context } = req.body.params; // Extract user input and context from request

  // Update message history with user inputs
  const updatedMessageHistory = [
    ...DEFAULT_MESSAGE_HISTORY,
    { role: "user", content: context },
    { role: "user", content: userInput },
  ];

  try {
    const response = await getGptResonse(updatedMessageHistory); // Call GPT service with updated history
    res.send(response.choices[0].message.content); // Send GPT response back to user
  } catch (error) {
    console.error("Error communicating with GPT:", error);
    res.status(500).send("Error processing your request."); // Handle errors gracefully
  }
});

// TODO: Add your own custom route for additional functionality

// Example feedback collection route for user interactions
app.post('/like', async (req, res) => {
  console.log("This interaction was liked:", req.body.params.messages); // Log liked interactions
  res.send("This interaction was liked!"); // Send confirmation response
});

// Start server and listen on the defined port
const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`); // Log the port the server is running on
});
