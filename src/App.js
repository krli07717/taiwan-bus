import Homepage from "./components/Homepage";
import SearchBusPage from "./components/SearchBusPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nearby-bus" element={<Homepage />} />
        <Route path="/search-bus" element={<SearchBusPage />} />
      </Routes>
    </div>
  );
}

export default App;
