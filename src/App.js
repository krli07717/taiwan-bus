import Homepage from "./pages/Homepage";
import SearchBusPage from "./pages/SearchBusPage";
import BusStatusPage from "./pages/BusStatusPage";
import NearbyBusPage from "./pages/NearbyBusPage";
import RoutesByStationPage from "./pages/RoutesByStationPage";
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
