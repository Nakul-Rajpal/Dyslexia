/**
 * Used for connecting to OpenAI.
 * Provides connection and a function wrapper for sending messages.
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided API key
const openai = new OpenAI({
    apiKey: ""
});

/**
 * Sends a message history to the GPT model and gets a response.
 * @param messages The conversation history to send to the GPT model.
 * @returns GPT response object containing the model's reply.
 */
const getGptResonse = async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Specifies the model to use
    messages: messages, // Includes message history
});

/**
 * Encodes a file into a base64 string.
 * Useful for sending file data as text.
 * @param file The file path to encode.
 * @returns Base64 encoded string of the file contents.
 */
function base64_encode(file) {
    // Read binary data from the file
    var bitmap = fs.readFileSync(file);
    // Convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

export { getGptResonse }; // Export the GPT response function
