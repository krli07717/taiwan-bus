const asyncGetGeolocation = (
  options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
) => {
  return new Promise((resolve, reject) => {
    function onResolve(data) {
      resolve([data.coords.latitude, data.coords.longitude]);
    }
    function onReject(error) {
      reject(error);
    }
    navigator.geolocation.getCurrentPosition(onResolve, onReject, options);
  });
};

export default asyncGetGeolocation;
