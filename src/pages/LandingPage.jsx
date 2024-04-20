import React, { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [message, setMessage] = useState("");

  const getRequest = async () => {
    const response = await axios.get(`http://localhost:8000/hello/Vincent`);
    setMessage(response.data["message"]);
    console.log(response.data);
  };

  useEffect(() => {
    getRequest();
  }, []);

  return <div>{message}</div>;
};

export default LandingPage;
