import "./Homepage.css";
import { Link } from "react-router-dom";
import locationSvg from "../assets/icon-location.svg";
import searchSvg from "../assets/icon-search.svg";
import { Logo } from "../components/Logo";

function Nav() {
  return (
    <nav>
      <Link to="/taiwan-bus/nearby-bus" className="button_heavy">
        <img src={locationSvg} alt="location icon" />
        附近公車站
      </Link>
      <Link to="/taiwan-bus/search-bus" className="button_heavy">
        <img src={searchSvg} alt="search icon" />
        查詢公車
      </Link>
      <Link to="/taiwan-bus/search-train" className="button_heavy">
        <img src={searchSvg} alt="search icon" />
        查詢客運
      </Link>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      Taiwan Bus &copy;{" "}
      <a
        href="https://github.com/krli07717/taiwan-bus"
        target="_blank"
        rel="noreferrer"
      >
        Code
      </a>{" "}
      / Design: KT
    </footer>
  );
}

export default function Homepage() {
  return (
    <div className="homepage">
      <Logo />
      <Nav />
      <Footer />
    </div>
  );
}
