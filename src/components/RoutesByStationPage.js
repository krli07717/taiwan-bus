import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { LogoZh } from "./Logo";
import fetchTdxApi from "../utils/fetchTdxApi";
import backSvg from "../assets/icon-back.svg";

function PossibleRouteItem({ possibleRouteInfo }) {
  const { routeName, routeUID, destinationName, city } = possibleRouteInfo;
  return (
    <Link to={`${city}/${routeUID}`} className="route">
      <span className="route_name">{routeName}</span>
      <span className="route_fromTo">
        <span>往&nbsp;</span>
        {destinationName}
      </span>
    </Link>
  );
}

function PossibleRouteList({ possibleRoutes }) {
  const routesList = possibleRoutes.map((possibleRouteInfo) => (
    <PossibleRouteItem
      //   city={city}
      possibleRouteInfo={possibleRouteInfo}
      key={possibleRouteInfo.routeUID}
    />
  ));
  const noStations = <span className="no_routes">沒有符合路線</span>;
  return (
    <div className="routes">
      <div className="routes_list">{routesList.length ? routesList : null}</div>
    </div>
  );
}

export default function RoutesByStationPage(props) {
  const { StationName } = useParams();
  const { state = {} } = useLocation();

  //   const [userLocation, setUserLocation] = useState(state.userLocation);
  const [possibleRoutes, setPossibleRoutes] = useState([]);

  //   console.log(city, StationName);
  console.log(possibleRoutes);
  //   console.log(userLocation);

  useEffect(() => {
    // 查nearby Routes
    // match到的routeUID 列出迄站
    async function getRoutesDestinations() {
      //這邊有City可拿
      const nearbyRouteUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/NearBy?$spatialFilter=nearby(${state.userLocation[0]},${state.userLocation[1]},500)&$format=JSON`;
      const nearbyRouteRaw = await fetchTdxApi(nearbyRouteUrl);
      console.log(`nearbyRouteRaw\n`, nearbyRouteRaw);
      const nearbyRoutesWithDestinations = state.possibleRoutes
        .map((possibleRoute) => {
          const nearbyRoute = nearbyRouteRaw.find(
            (route) => route.RouteUID === possibleRoute.routeUID
          );
          const { DestinationStopNameZh = "", City = "" } = nearbyRoute;
          return {
            ...possibleRoute,
            destinationName: DestinationStopNameZh,
            city: City,
          };
        })
        .filter(
          (route, index, originalArray) =>
            index ===
            originalArray.findIndex(
              (routeDuplicate) => route.routeUID === routeDuplicate.routeUID
            )
        );
      setPossibleRoutes(nearbyRoutesWithDestinations);
    }
    getRoutesDestinations();
  }, []);

  useEffect(() => {
    console.log(possibleRoutes);
  }, [possibleRoutes]);

  return (
    <div className="nearby_bus_page">
      <div className="top_nav">
        <img
          src={backSvg}
          alt="back icon"
          className="back_page"
          onClick={() => {
            window.history.go(-1);
          }}
        />
        <LogoZh />
        <span className="nearby">{StationName}</span>
      </div>
      <PossibleRouteList possibleRoutes={possibleRoutes} />
    </div>
  );
}
