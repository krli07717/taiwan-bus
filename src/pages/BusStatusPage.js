import "./BusStatusPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchTdxApi from "../utils/fetchTdxApi";
import { LogoZh } from "../components/Logo";
import BackButton from "../components/BackButton";

function Stop({ stopInfo }) {
  const { stopName, plateNumb, estimatedSeconds, stopStatus } = stopInfo;

  function getMinute() {
    if (stopStatus === 4)
      return <span className="estimated_time off">未營運</span>;
    if (stopStatus === 3)
      return <span className="estimated_time off">末班已過</span>;
    if (stopStatus === 2)
      return <span className="estimated_time off">交管不停</span>;
    if (stopStatus === 1 || stopStatus === undefined)
      return <span className="estimated_time off">未發車</span>;
    if (estimatedSeconds < 120)
      return <span className="estimated_time approaching">進站中</span>;
    return (
      <span className="estimated_time">
        <span className="minute">{Math.floor(estimatedSeconds / 60)}</span>
        &nbsp;分
      </span>
    );
  }

  function statusStyle(estimatedSeconds) {
    if (estimatedSeconds === undefined) return "off";
    if (estimatedSeconds < 120) return "approaching";
    return "";
  }

  return (
    <div className={`stop ${statusStyle(estimatedSeconds)}`}>
      {getMinute()}
      <span className="stop_name">{stopName}</span>
      <span className="plate_numb">{plateNumb}</span>
      <span className="circle">
        <span className="inner"></span>
      </span>
    </div>
  );
}

function StopStatus({ stopStatus }) {
  return stopStatus.map((stopInfo) => (
    <Stop key={stopInfo.stopUID} stopInfo={stopInfo} />
  ));
}

export default function BusStatusPage() {
  const { city, RouteUID } = useParams();
  const [stopsToStatus, setStopsToStatus] = useState([]);
  const [stopsFromStatus, setStopsFromStatus] = useState([]);
  const [showFromStatus, setShowFromStatus] = useState(false);
  const [lastFetchSeconds, setLastFetchSeconds] = useState(0);

  function handleChooseDirection(e) {
    if (showFromStatus === false && e.target.id === "from")
      setShowFromStatus(true);
    if (showFromStatus === true && e.target.id === "to")
      setShowFromStatus(false);
  }

  useEffect(() => {
    async function fetchArrivalTime() {
      const estimatedTimeUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}?$filter=RouteUID%20eq%20'${RouteUID}'&$format=JSON`;
      const stopOfRouteUrl = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${city}?$filter=RouteUID%20eq%20'${RouteUID}'&$top=30&$format=JSON`;
      try {
        const [{ value: stops }, { value: estimatedTimes }] =
          await Promise.allSettled([
            fetchTdxApi(stopOfRouteUrl),
            fetchTdxApi(estimatedTimeUrl),
          ]);

        function getStopsStatus(direction) {
          return stops
            .find(({ Direction }) => Direction === direction)
            ?.Stops.map((stop) => {
              const { PlateNumb, EstimateTime, StopStatus } =
                estimatedTimes.find(
                  ({ Direction, StopUID }) =>
                    Direction === direction && StopUID === stop.StopUID
                ) ?? {};
              return {
                stopUID: stop.StopUID,
                stopName: stop.StopName.Zh_tw,
                stopStatus: StopStatus,
                plateNumb: PlateNumb,
                estimatedSeconds: EstimateTime,
              };
            })
            .filter(
              (stop, index, originalArray) =>
                index ===
                originalArray.findIndex(
                  (stopDuplicate) => stop.stopUID === stopDuplicate.stopUID
                )
            );
        }

        const stopsDirectionToStatus = getStopsStatus(0) ?? []; //沒有去程
        const stopsDirectionFromStatus = getStopsStatus(1) ?? []; //沒有返程
        setStopsToStatus(stopsDirectionToStatus);
        setStopsFromStatus(stopsDirectionFromStatus);
        setLastFetchSeconds(0);
      } catch (error) {
        throw error;
      }
    }

    const fetchBusInterval = setInterval(fetchArrivalTime, 60000);
    fetchArrivalTime();

    const countDownInterval = setInterval(() => {
      setLastFetchSeconds((second) => ++second);
    }, 1000);

    return () => {
      clearInterval(fetchBusInterval);
      clearInterval(countDownInterval);
    };
  }, []);

  const toDestinationName = stopsToStatus.length ? (
    <span className="direction">
      <span>往&nbsp;</span>
      {stopsToStatus[stopsToStatus.length - 1].stopName}
    </span>
  ) : (
    <span className="direction no_route">沒有去程</span>
  );
  const fromDestinationName = stopsFromStatus.length ? (
    <span className="direction">
      <span>往&nbsp;</span>
      {stopsFromStatus[stopsFromStatus.length - 1].stopName}
    </span>
  ) : (
    <span className="direction no_route">沒有返程</span>
  );

  return (
    <div className="bus_status_page">
      <div className="top_nav">
        <BackButton />
        <LogoZh />
      </div>
      <div className="choose_direction">
        <label htmlFor="to">
          <input
            type="radio"
            name="direction"
            id="to"
            checked={!showFromStatus}
            disabled={stopsToStatus.length === 0}
            onChange={handleChooseDirection}
            hidden
          />
          {toDestinationName}
        </label>
        <label htmlFor="from">
          <input
            type="radio"
            name="direction"
            id="from"
            checked={showFromStatus}
            disabled={stopsFromStatus.length === 0}
            onChange={handleChooseDirection}
            hidden
          />
          {fromDestinationName}
        </label>
      </div>
      <div className="status_list">
        <span className="update_time">*於{lastFetchSeconds}秒前更新</span>
        <div className="stops">
          <StopStatus
            stopStatus={showFromStatus ? stopsFromStatus : stopsToStatus}
          />
        </div>
      </div>
    </div>
  );
}
