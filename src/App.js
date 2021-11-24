import Homepage from "./components/Homepage";
import SearchBusPage from "./components/SearchBusPage";
import BusStatusPage from "./components/BusStatusPage";
import NearbyBusPage from "./components/NearbyBusPage";
import RoutesByStationPage from "./components/RoutesByStationPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nearby-bus" element={<NearbyBusPage />} />
        <Route path="/search-bus" element={<SearchBusPage />} />
        <Route path="/search-bus/:city/:RouteUID" element={<BusStatusPage />} />
        <Route
          path="/nearby-bus/:StationName"
          element={<RoutesByStationPage />}
        />
        <Route
          path="/nearby-bus/:station/:city/:RouteUID"
          element={<BusStatusPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
