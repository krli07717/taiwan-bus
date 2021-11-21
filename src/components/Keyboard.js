import "./Keyboard.css";

function CityKey({ city_zh, city_en, handleChooseCity }) {
  return (
    <label htmlFor={city_en}>
      <input
        type="radio"
        name="city"
        id={city_en}
        onChange={handleChooseCity}
        hidden
      />
      <span className="button_heavy">{city_zh}</span>
    </label>
  );
}

export function CityKeyboard({ handleChooseCity, handleSubmitCity }) {
  const cities = [
    {
      city_zh: "臺北市",
      city_en: "Taipei",
    },
    {
      city_zh: "新北市",
      city_en: "NewTaipei",
    },
    {
      city_zh: "桃園市",
      city_en: "Taoyuan",
    },
    {
      city_zh: "臺中市",
      city_en: "Taichung",
    },
    {
      city_zh: "臺南市",
      city_en: "Tainan",
    },
    {
      city_zh: "高雄市",
      city_en: "Kaohsiung",
    },
    {
      city_zh: "基隆市",
      city_en: "Keelung",
    },
    {
      city_zh: "新竹市",
      city_en: "Hsinchu",
    },
    {
      city_zh: "新竹縣",
      city_en: "HsinchuCounty",
    },
    {
      city_zh: "苗栗縣",
      city_en: "MiaoliCounty",
    },
    {
      city_zh: "彰化縣",
      city_en: "ChanghuaCounty",
    },
    {
      city_zh: "南投縣",
      city_en: "NantouCounty",
    },
    {
      city_zh: "雲林縣",
      city_en: "YunlinCounty",
    },
    {
      city_zh: "嘉義縣",
      city_en: "ChiayiCounty",
    },
    {
      city_zh: "嘉義市",
      city_en: "Chiayi",
    },
    {
      city_zh: "屏東縣",
      city_en: "PingtungCounty",
    },
    {
      city_zh: "宜蘭縣",
      city_en: "YilanCounty",
    },
    {
      city_zh: "花蓮縣",
      city_en: "HualienCounty",
    },
    {
      city_zh: "臺東縣",
      city_en: "TaitungCounty",
    },
    {
      city_zh: "金門縣",
      city_en: "KinmenCounty",
    },
    {
      city_zh: "澎湖縣",
      city_en: "PenghuCounty",
    },
    {
      city_zh: "連江縣",
      city_en: "LienchiangCounty",
    },
  ];

  const submitCity = (
    <label htmlFor="set_city">
      <input type="submit" id="set_city" hidden />
      <span className="button_heavy">設定</span>
    </label>
  );

  return (
    <form className="city_keyboard" onSubmit={handleSubmitCity}>
      {cities.map(({ city_zh, city_en }) => (
        <CityKey
          key={city_zh}
          city_zh={city_zh}
          city_en={city_en}
          handleChooseCity={handleChooseCity}
        />
      ))}
      {submitCity}
    </form>
  );
}
