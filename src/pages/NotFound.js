import React from "react";

import ErrorImg from '../images/404Error.svg'
import './styles/NotFound.css'

function NotFound() {
  return (
    <div className="background">
      <img className="ErrorImg" src={ErrorImg} alt="Error 404: Not Found"></img>
    </div>
  );
}

export default NotFound;
