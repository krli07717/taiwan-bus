import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

export default function Logo() {
  return (
    <h1 className="logo">
      <Link to="/">
        <img src={logoSvg} alt="Taiwan Bus Logo" />
      </Link>
    </h1>
  );
}
