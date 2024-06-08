import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Predictions from "./pages/Predictions/Predictions";
import Concept from "./pages/Concept/Concept";
import News from "./pages/News/News";

import Nav from "./components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route index element={<News itemsPerPage={10} />} />
          <Route path="stiri" element={<News itemsPerPage={10} />} />
          <Route path="clasificare" element={<Predictions />} />
          <Route path="concept" element={<Concept />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
