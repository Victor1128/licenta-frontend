import React, { useEffect, useState } from "react";
import axios from "axios";

import apiURL from "../config.js";

const LandingPage = () => {
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      title: title,
    };

    try {
      const response = await axios.post(
        apiURL + "/predict",
        requestBody
      );
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
  }, [error]);

  return (
    <main>
      <h2>Introduceți titlul unui articol</h2>
      <textarea
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Caută</button>
      {response && (
        <div>
          <h3>Rezultat</h3>
          <p>Non-satira: {Math.round(response[0] * 100)}%</p>
          <p>Satira: {Math.round(response[1] * 100)}%</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </main>
  );
};

export default LandingPage;