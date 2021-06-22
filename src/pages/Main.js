import React from "react";
import { Link } from "react-router-dom";

import "./styles/Main.css";
import MainLogo from "../images/logoPrincipal.svg";
import LogoConf from "../images/logo-badge.svg";

function Main() {
  return (
    <div className="main">
      <div className="row" id="row">
        <div className="col-6">
          <img
            className="ConfLogo"
            src={LogoConf}
            alt="Logo de la Conferencia"
          ></img>
          <div className="LeftText">
            <h1>Print your Badges</h1>
            <h2>The easiest way to manag your conference</h2>
            <div className="Badges__buttons" id="Badges__buttons">
              <Link to="/badges" className="btn btn-primary">
                Start Now
              </Link>
            </div>
          </div>
        </div>
        <div className="col-6">
          <img className="MainLogo" src={MainLogo} alt="Main Logo"></img>
        </div>
      </div>
    </div>
  );
}

export default Main;
