import "./SearchBusPage.css";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { CityKeyboard } from "./Keyboard";

function SearchInput({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      placeholder="輸入路線關鍵字"
      onChange={onChange}
    />
  );
}

export default function SearchBusPage() {
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [fetchingRoutes, setFetchingRoutes] = useState(false);

  function handleChooseCity(e) {
    setCity(e.target.id);
  }

  function handleSubmitCity(e) {
    e.preventDefault();
    if (city) console.log(city);
  }

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  return (
    <div className="search_bus_page">
      <div className="top_nav">
        <Logo />
        <SearchInput value={keyword} onChange={handleKeywordChange} />
      </div>
      <CityKeyboard
        handleChooseCity={handleChooseCity}
        handleSubmitCity={handleSubmitCity}
      />
    </div>
  );
}
