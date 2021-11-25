import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { LogoZh } from "../components/Logo";
import BackButton from "../components/BackButton";
import fetchTdxApi from "../utils/fetchTdxApi";

function PossibleRouteItem({ possibleRouteInfo }) {
  const { routeName, routeUID, destinationName, city } = possibleRouteInfo;
  return (
    <Link to={`/taiwan-bus/${city}/${routeUID}`} className="route">
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
      possibleRouteInfo={possibleRouteInfo}
      key={possibleRouteInfo.routeUID}
    />
  ));
  return (
    <div className="routes">
      <div className="routes_list">{routesList.length ? routesList : null}</div>
    </div>
  );
}

export default function RoutesByStationPage(props) {
  const { StationName } = useParams();
  const { state = {} } = useLocation();
  const [possibleRoutes, setPossibleRoutes] = useState([]);

  useEffect(() => {
    async function getRoutesDestinations() {
      const nearbyRouteUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/NearBy?$spatialFilter=nearby(${state.userLocation[0]},${state.userLocation[1]},500)&$format=JSON`;
      const nearbyRouteRaw = await fetchTdxApi(nearbyRouteUrl);
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

  return (
    <div className="nearby_bus_page">
      <div className="top_nav">
        <BackButton />
        <LogoZh />
        <span className="nearby">{StationName}</span>
      </div>
      <PossibleRouteList possibleRoutes={possibleRoutes} />
    </div>
  );
}
