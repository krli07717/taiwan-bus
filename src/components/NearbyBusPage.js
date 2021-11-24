import { useState, useEffect } from "react";
import { LogoZh } from "./Logo";
import { Link } from "react-router-dom";
import "./NearbyBusPage.css";
import fetchTdxApi from "../utils/fetchTdxApi";
import asyncGetGeolocation from "../utils/getGeolocation";

function NearbyStationItem({ nearbyStationInfo, userLocation }) {
  const { nearbyStationName, possibleRoutes } = nearbyStationInfo;
  const possibleRouteNames = possibleRoutes
    .map(({ routeName }) => routeName)
    .join(", ");
  return (
    <Link
      to={encodeURIComponent(nearbyStationName)}
      className="route"
      state={{ possibleRoutes, userLocation }}
    >
      <span className="route_name">{nearbyStationName}</span>
      {possibleRouteNames}
    </Link>
  );
}

function NearbyStationList({ nearbyStations, userLocation }) {
  const stationList = nearbyStations.map((nearbyStationInfo) => (
    <NearbyStationItem
      //   city={city}
      nearbyStationInfo={nearbyStationInfo}
      userLocation={userLocation}
      key={nearbyStationInfo.nearbyStationName}
    />
  ));
  const noStations = <span className="no_routes">沒有符合路線</span>;
  return (
    <div className="routes">
      <div className="routes_list">
        {stationList.length ? stationList : noStations}
      </div>
    </div>
  );
}

export default function NearbyBusPage() {
  const [userLocation, setUserLocation] = useState([25.03746, 121.564558]); //Taipei
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    let unmounted = false;
    async function getUserLocation() {
      try {
        // get location
        // const [lat, lng] = [25.03746, 121.564558];
        const [lat, lng] = await asyncGetGeolocation();
        if (!unmounted) setUserLocation([lat, lng]);
      } catch (error) {
        throw error;
      }
    }
    getUserLocation();
    return () => (unmounted = true);
  }, []);

  useEffect(() => {
    async function getNearbyStations() {
      try {
        // 查nearby stationUID
        // 列出每個stationName、station stops中的RouteName
        const nearbyStationUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${userLocation[0]},${userLocation[1]},500)&$format=JSON`;
        const nearbyStationRaw = await fetchTdxApi(nearbyStationUrl);
        console.log(nearbyStationRaw);

        const nearbyStations = nearbyStationRaw
          .map((station) => {
            const possibleRoutes = station.Stops.map((stop) => {
              return {
                routeUID: stop.RouteUID,
                routeName: stop.RouteName.Zh_tw,
              };
            });
            return {
              nearbyStationName: station.StationName.Zh_tw,
              possibleRoutes: possibleRoutes,
            };
          })
          .filter(
            (station, index, originalArray) =>
              index ===
              originalArray.findIndex(
                (stationDuplicate) =>
                  station.nearbyStationName ===
                  stationDuplicate.nearbyStationName
              )
          );
        setNearbyStations(nearbyStations);
      } catch (error) {
        throw error;
      }
    }
    getNearbyStations();
  }, [userLocation]);

  return (
    <div className="nearby_bus_page">
      <div className="top_nav">
        <LogoZh />
        <span className="nearby">我的附近</span>
      </div>
      <NearbyStationList
        // city={city}
        nearbyStations={nearbyStations}
        userLocation={userLocation}
      />
    </div>
  );
}
