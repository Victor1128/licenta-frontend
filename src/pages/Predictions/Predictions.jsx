import React, { useEffect, useState } from "react";
import axios from "axios";

import config from "../../config.js";
import "./Predictions.css";

const LandingPage = () => {
  const apiURL = config.apiURL;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length + content.trim().length > 1000) {
      setError("Ați depășit limita de 1000 de caractere");
      console.log("eroare1");
      return;
    }
    if (title.trim().length + content.trim().length == 0) {
      setError("Cel puțin unul dintre câmpuri trebuie completat");
      console.log("eroare2");
      return;
    }
    let local_title = title.trim();
    if (local_title[local_title.length - 1] === ".")
      local_title = local_title.slice(0, local_title.length - 1);
    const requestBody = {
      title: local_title.trim(),
      content: content.trim(),
    };

    try {
      const response = await axios.post(apiURL + "/predict", requestBody);
      setResponse([
        Math.round(response.data.predictions[0][0] * 100),
        Math.round(response.data.predictions[0][1] * 100),
      ]);
      setShowPredictions(true);
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

  const handleKeyDown = (e) => {
    // Reset field height
    e.target.style.height = "inherit";

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    e.target.style.height = `${height}px`;
  };

  useEffect(() => {
    setError(null);
  }, [title, content]);

  //TODO: Textarea resize with text

  return (
    <>
      <main>
        <h2>Introduceți un articol</h2>
        {error && <p className="error">{error}</p>}
        <div className="inputs">
          <textarea
            // onKeyDown={handleKeyDown}
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Titlu"
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="content">
            <textarea
              // onKeyDown={handleKeyDown}
              type="text"
              id="content"
              name="content"
              value={content}
              placeholder="Conținut"
              onChange={(e) => setContent(e.target.value)}
            />
            <p
              style={{
                color:
                  title.trim().length + content.trim().length > 1000
                    ? "#bb2124"
                    : "black",
              }}
            >
              {title.trim().length + content.trim().length}/1000
            </p>
          </div>
          <button onClick={handleSubmit}>Calculează</button>
        </div>
      </main>
      {showPredictions && (
        <div className="predictions">
          <div className="predictions-window">
            <div
              onClick={() => setShowPredictions(false)}
              className="close-button"
            >
              X
            </div>
            <div className="statistics">
              <h3>Non-satiră</h3>
              <div className="percentage">
                <p className="percent-text">{response[0]}%</p>
                <div className="rectangle-container">
                  <div
                    style={{ width: `${response[0]}%` }}
                    className="rectangle"
                  ></div>
                </div>
              </div>
            </div>
            <div className="statistics">
              <h3>Satiră</h3>
              <div className="percentage">
                <p className="percent-text">{response[1]}%</p>
                <div className="rectangle-container">
                  <div
                    style={{ width: `${response[1]}%` }}
                    className="rectangle"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
