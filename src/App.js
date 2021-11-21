import Homepage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nearby-bus" element={<Homepage />} />
        <Route path="/search-bus" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
