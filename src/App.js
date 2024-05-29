import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Predictions from "./pages/Predictions/Predictions";
import Concept from "./pages/Concept/Concept";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route index element={<Predictions />} />
          <Route path="concept" element={<Concept />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
