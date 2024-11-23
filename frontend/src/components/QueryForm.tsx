import React, { useState } from "react";

// Component for taking user input and sending it to the server
const QueryForm: React.FC = () => {
  // State variables for context, question, response, error, and loading status
  const [context, setContext] = useState<string>("Dyslexia"); // Context selector (Dyslexia or Dyscalculia)
  const [question, setQuestion] = useState<string>(""); // User's question
  const [response, setResponse] = useState<string | null>(null); // Response from the server
  const [error, setError] = useState<string | null>(null); // Error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  /**
   * Handles form submission to send the user input to the server.
   * Validates input, makes an API call, and updates response or error states.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submit

    // Check if question is empty
    if (!question.trim()) {
      setError("Please enter a question."); // Show error message
      return;
    }

    setError(null); // Clear any previous errors
    setIsLoading(true); // Show loading state

    try {
      // Send request to the backend server
      const res = await fetch("http://localhost:8080/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify({
          params: {
            context, // Include context (Dyslexia or Dyscalculia)
            userInput: question, // Include user's question
          },
        }),
      });

      // Check if server returned an error
      if (!res.ok) {
        throw new Error("Failed to fetch response from the server.");
      }

      // Get the server's response as plain text
      const data = await res.text();
      setResponse(data); // Update response state with server reply
    } catch (err) {
      console.error(err); // Log the error
      setError("An error occurred while processing your request."); // Show error message
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div>
      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        <label>
          {/* Dropdown for selecting context */}
          Select Context:
          <select
            value={context}
            onChange={(e) => setContext(e.target.value)} // Update context state
            className="form-control"
          >
            <option value="Dyslexia">Dyslexia</option>
            <option value="Dyscalculia">Dyscalculia</option>
          </select>
        </label>
        <br />
        <label>
          {/* Text area for entering a question */}
          Enter Question:
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // Update question state
            placeholder="Enter your question here"
            className="form-control"
            rows={5}
          />
        </label>
        <br />
        {/* Submit button with loading indicator */}
        <button type="submit" className="btn btn-primary">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Display the response from the server */}
      {response && (
        <div className="response-box">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
      {/* Display any error messages */}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default QueryForm;
