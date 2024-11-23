/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 * @author Christopher Curtis
 */
import OpenAI from 'openai';
import fs from 'fs';

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: "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"
});

/**
 * Function for getting a response from the gpt model.
 * Uses the provided message history
 * @param messages the message history to load in
 * @returns gpt response object
 */
const getGptResonse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}


export { getGptResonse };