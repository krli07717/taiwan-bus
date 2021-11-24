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
      nearbyStationInfo={nearbyStationInfo}
      userLocation={userLocation}
      key={nearbyStationInfo.nearbyStationName}
    />
  ));
  return (
    <div className="routes">
      <div className="routes_list">
        {stationList.length ? stationList : null}
      </div>
    </div>
  );
}

export default function NearbyBusPage({ userLocation, setUserLocation }) {
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    let unmounted = false;
    async function getUserLocation() {
      try {
        const [lat, lng] = await asyncGetGeolocation();
        if (!unmounted) setUserLocation([lat, lng]);
      } catch (error) {
        throw error;
      }
    }
    if (!userLocation.length) getUserLocation();
    return () => (unmounted = true);
  }, []);

  useEffect(() => {
    async function getNearbyStations() {
      try {
        const nearbyStationUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${userLocation[0]},${userLocation[1]},500)&$format=JSON`;
        const nearbyStationRaw = await fetchTdxApi(nearbyStationUrl);
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
    if (userLocation.length) getNearbyStations();
  }, [userLocation]);

  return (
    <div className="nearby_bus_page">
      <div className="top_nav">
        <LogoZh />
        <span className="nearby">我的附近</span>
      </div>
      {userLocation.length ? (
        <NearbyStationList
          nearbyStations={nearbyStations}
          userLocation={userLocation}
        />
      ) : (
        <div className="routes">
          <p className="no_routes">定位中...</p>
        </div>
      )}
    </div>
  );
}
