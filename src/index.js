import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

import "./global.css";
import BadgeNew from "./pages/BadgeNew.js";
import Badges from "./pages/Badges.js"
import App from './components/App';

const container = document.getElementById("app");

// ReactDOM.render(__qué__, __donde__);
ReactDOM.render(<App />, container);
