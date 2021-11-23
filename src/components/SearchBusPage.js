import "./SearchBusPage.css";
import { LogoZh } from "./Logo";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CityKeyboard } from "./Keyboard";
import fetchTdxApi from "../utils/fetchTdxApi";

function SearchInput({ value, onChange, disabled }) {
  return (
    <input
      type="search"
      value={value}
      placeholder="輸入路線關鍵字"
      onChange={onChange}
      disabled={disabled}
    />
  );
}

function RouteItem({ routeInfo, city }) {
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

function RouteList({ city, routes }) {
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

export default function SearchBusPage() {
  const [city, setCity] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [fetchingRoutes, setFetchingRoutes] = useState(false);
  const [routes, setRoutes] = useState([]);
  const allRoutesRef = useRef([]);

  function handleChooseCity(e) {
    setCity([e.target.id, e.target.dataset.city_zh]);
  }

  function handleSubmitCity(e) {
    e.preventDefault();
    if (!city.length) return;
    setFetchingRoutes(true);
  }

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  //   fetch city routes
  useEffect(() => {
    if (allRoutesRef.current.length > 0) return;
    if (!city.length) return;
    const cityRouteUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city[0]}?$format=JSON`;
    function makeRoutes(data) {
      return data.map(
        ({
          RouteUID,
          DepartureStopNameZh,
          DestinationStopNameZh,
          RouteName,
        }) => {
          return {
            RouteUID,
            DepartureStopNameZh,
            DestinationStopNameZh,
            RouteName: RouteName.Zh_tw,
          };
        }
      );
    }
    async function fetchCityRoute(url) {
      try {
        const data = await fetchTdxApi(url);
        const routes = makeRoutes(data);
        allRoutesRef.current = routes;
        setRoutes(routes);
      } catch (error) {
        throw error;
      }
    }
    fetchCityRoute(cityRouteUrl);
  }, [fetchingRoutes]);

  //   filtered routes by search keyword
  useEffect(() => {
    const filteredRoutes = allRoutesRef.current.filter(({ RouteName }) =>
      RouteName.includes(keyword)
    );
    setRoutes(filteredRoutes);
  }, [keyword]);

  return (
    <div className="search_bus_page">
      <div className="top_nav">
        <LogoZh />
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          disabled={allRoutesRef.current.length === 0}
        />
      </div>
      {allRoutesRef.current.length === 0 ? (
        <CityKeyboard
          handleChooseCity={handleChooseCity}
          handleSubmitCity={handleSubmitCity}
        />
      ) : (
        <RouteList city={city} routes={routes} />
      )}
    </div>
  );
}
