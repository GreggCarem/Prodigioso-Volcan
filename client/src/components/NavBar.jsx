import React from "react";
import "../style/nav-bar.scss";
import volcanLogo from "../assets/logo-prodigioso-volcan-2.svg";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <h1 className="nav-bar-tittle">Prodigioso</h1>
      <img className="nav-bar-logo" src={volcanLogo} alt="Logo" />
      <h1 className="nav-bar-tittle">Volcan</h1>
    </div>
  );
}
