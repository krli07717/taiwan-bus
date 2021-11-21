import jsSHA from "jssha/dist/sha1";

function getRequestHeader() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(APP_KEY, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  const HMAC = ShaObj.getHMAC("B64");
  const Authorization =
    'hmac username="' +
    APP_ID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';

  return {
    Authorization: Authorization,
    "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/,
  }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}

export default async function fetchTdxApi(url) {
  try {
    const response = await fetch(url, { headers: getRequestHeader() });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
