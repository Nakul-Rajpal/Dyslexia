import "./App.css";

import QueryForm from "./components/QueryForm";
import useImage from "./hooks/useImage";
import useText from "./hooks/useText";
import { useEffect } from "react";

function App() {
  // Custom hooks to handle image and text data
  const { image, imgError, imgIsLoading } = useImage("");
  const { text, textError, textIsLoading } = useText("", "chatroom-image");

  // Effect hook to log text whenever it changes
  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Main title and description for the app */}
        <h1 className="app-title">Dyslexia/Dyscalculia Question Translator</h1>
        <p className="app-description">
          Enter either dyslexia or dyscalculia below.
          In the second box, enter your question.
        </p>
      </header>
      <main className="app-main">
        {/* Form component to take user input */}
        <QueryForm />
      </main>
    </div>
  );
}

export default App;
