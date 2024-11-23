/**
 * Express server which connects to OpenAI backend.
 * Defines REST api to interact with gpt model.
 * Provides for context injections, basic testing, and user feedback.
 * @author Christopher Curtis
 */
import express from'express';
import cors from "cors";
import { getGptResonse }from './openaiService.js';

// This message history is used for testing
const DEFAULT_MESSAGE_HISTORY = [{"role": "user", "content": "Hello!"}, {"role": "assistant", "content": "Howdy!"}, {"role": "assistant", "content": "The user will enter the context either Dyslexia or Dyscalculia, and an assignment Question. You will take this question and translate the question into a format that is easily understandable for those with dyslexia or dyscalculia depending on which one they state"}];

const app = express();  // Server is instantiated

// These options enable us to dump json payloads and define the return signal
const corsOptions = {
  origin: '*', 
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(express.json());
app.use(cors(corsOptions));

// Defines default route to demonstate server status
app.get('/', (req,res) => {
    res.send("The server is up!");
});

// Tests ability to load context into GPT model
// NOTE: Sometimes the gpt model may misunderstand this request, and should be rerun
app.get('/messageHitoryTest', async (req,res) => {
  console.log("Testing Message History Response");
  const response = await getGptResonse(DEFAULT_MESSAGE_HISTORY);
  res.send(response);
});

// Gets responses from GPT model with no additional context
app.post('/response', async (req,res) => {
  //console.log("REQUST:", req.body);
  const { messages } = req.body.params;
  console.log("MESSAGES", messages);
  const response = await getGptResonse(DEFAULT_MESSAGE_HISTORY);
  res.send(response.choices[0].message.content);
});



// TODO: CREATE YOUR OWN CUSTOM ROUTE - IT SHOULD HAVE IT'S OWN SYSTEM DESCRIPTION INJECTED

// Handles "like" interaction for user feedback (example feedback collection)
app.post('/like', async (req,res) => {
  console.log("This interaction was liked:", req.body.params.messages);
  res.send("This interaction was liked!");
});


// TODO: CREATE YOUR OWN CUSTOM ROUTE - HAVE IT TAKEN IN A NEW SAMPLE IMAGE AND RECIEVE A CUSTOM ROLE DESCRIPTION


// TODO: CREATE YOUR OWN CUSTOM ROUTE - IT SHOULD PERFORM A FEW-SHOT TRAINING WITH TEXT

// We define the port to listen on, and do so
const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
