import "./Logo.css";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";
import logoZhSvg from "../assets/logo-zh.svg";

export function LogoZh() {
  return (
    <h1 className="logo">
      <Link to="/taiwan-bus/">
        <img src={logoZhSvg} alt="Taiwan Bus Logo" />
      </Link>
    </h1>
  );
}
export function Logo() {
  return (
    <h1 className="logo">
      <Link to="/taiwan-bus/">
        <img src={logoSvg} alt="Taiwan Bus Logo" />
      </Link>
    </h1>
  );
}
