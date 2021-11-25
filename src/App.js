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
        <Route path="/taiwan-bus" element={<Homepage />} />
        <Route
          path="/taiwan-bus/nearby-bus"
          element={
            <NearbyBusPage
              userLocation={userLocation}
              setUserLocation={setUserLocation}
            />
          }
        />
        <Route
          path="/taiwan-bus/nearby-bus/:StationName"
          element={<RoutesByStationPage />}
        />
        <Route
          path="/taiwan-bus/nearby-bus/:city/:RouteUID"
          element={<BusStatusPage />}
        />
        <Route path="/taiwan-bus/search-bus" element={<SearchBusPage />} />
        <Route
          path="/taiwan-bus/search-bus/:city/:RouteUID"
          element={<BusStatusPage />}
        />
        <Route path="/taiwan-bus/search-train" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
