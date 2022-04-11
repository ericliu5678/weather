import React from "react";
import "./style.css";

type Props = {
  loading: boolean;
  message?: string;
  icon?: string;
}

export const Loader: React.FC<Props> =({ loading, message, icon })=>{
  if (loading === true) {
    document.getElementsByTagName("body")[0].className = "stop-scrolling";
  }

  if (loading === false) {
    document.getElementsByTagName("body")[0].className = "";
  }

  return loading === true ? (
    <div className="loading-container">
      <h1>{message}</h1>
      <i className={icon}></i>
    </div>
  ) : (
    <></>
  );
}
