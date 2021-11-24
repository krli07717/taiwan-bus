import Homepage from "./components/Homepage";
import SearchBusPage from "./components/SearchBusPage";
import BusStatusPage from "./components/BusStatusPage";
import NearbyBusPage from "./components/NearbyBusPage";
import RoutesByStationPage from "./components/RoutesByStationPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const [userLocation, setUserLocation] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/nearby-bus"
          element={
            <NearbyBusPage
              userLocation={userLocation}
              setUserLocation={setUserLocation}
            />
          }
        />
        <Route
          path="/nearby-bus/:StationName"
          element={<RoutesByStationPage />}
        />
        <Route
          path="/nearby-bus/:station/:city/:RouteUID"
          element={<BusStatusPage />}
        />
        <Route path="/search-bus" element={<SearchBusPage />} />
        <Route path="/search-bus/:city/:RouteUID" element={<BusStatusPage />} />
        <Route path="/search-train" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
