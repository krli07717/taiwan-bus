import "./RouteList.css";
import { Link } from "react-router-dom";

export function RouteItem({ routeInfo, city }) {
  const { RouteUID, DepartureStopNameZh, DestinationStopNameZh, RouteName } =
    routeInfo;
  const fromTo =
    DepartureStopNameZh && DestinationStopNameZh ? (
      <p className="route_fromTo">
        {DepartureStopNameZh}
        <span>&nbsp;&nbsp;往&nbsp;&nbsp;</span>
        {DestinationStopNameZh}
      </p>
    ) : null;
  // router onsubmit?
  return (
    <Link to={`${city[0]}/${RouteUID}`} className="route">
      <span className="route_name">{RouteName}</span>
      {fromTo}
    </Link>
  );
}

export default function RouteList({ city, routes }) {
  const routesList = routes.map((routeInfo) => (
    <RouteItem routeInfo={routeInfo} key={routeInfo.RouteUID} city={city} />
  ));
  const noRoutes = <span className="no_routes">沒有符合路線</span>;
  return (
    <div className="routes">
      <h2 className="routes_city">{city[1]}</h2>
      <div className="routes_list">
        {routesList.length ? routesList : noRoutes}
      </div>
    </div>
  );
}
