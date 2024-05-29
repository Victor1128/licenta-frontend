import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../../config.js";
import "./Predictions.css";

const LandingPage = () => {
  const apiURL = config.apiURL;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length + content.length > 1000) {
      setError("Ați depășit limita de 1000 de caractere");
      console.log("eroare1");
      return;
    }
    if (title.length + content.length == 0) {
      setError("Cel puțin unul dintre câmpuri trebuie completat");
      console.log("eroare2");
      return;
    }
    const requestBody = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post(apiURL + "/predict", requestBody);
      setResponse(response.data.predictions[0]);
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.status === 403) {
          setError("Forbidden.");
        }
        setError("Server error.");
      } else {
        setError("Unknown error.");
      }
    }
  };

  useEffect(() => {
    setError(null);
  }, [title, content]);

  return (
    <main>
      <h2>Introduceți un articol</h2>
      {error && <p className="error">{error}</p>}
      <div className="inputs">
        <textarea
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Titlu"
          onChange={(e) => setTitle(e.target.value.trim())}
        />
        <div className="content">
          <textarea
            type="text"
            id="content"
            name="content"
            value={content}
            placeholder="Conținut"
            onChange={(e) => setContent(e.target.value.trim())}
          />
          <p
            style={{
              color: title.length + content.length > 1000 ? "#bb2124" : "black",
            }}
          >
            {title.length + content.length}/1000
          </p>
        </div>
        <button onClick={handleSubmit}>Calculează</button>
      </div>
      {response && (
        <div>
          <h3>Rezultat</h3>
          <p>Non-satira: {Math.round(response[0] * 100)}%</p>
          <p>Satira: {Math.round(response[1] * 100)}%</p>
        </div>
      )}
    </main>
  );
};

export default LandingPage;
