import React from "react";
import cloud from "../../assets/Cloud-background.png";
import { CurrentDay } from "../../types";
import { toggleSlideMenu } from "../../api";
import "./side.css";

type Props = {
  currentDay: CurrentDay;
  submitRequest: (location: any) => void;
}

export const Side: React.FC<Props> = ({ currentDay, submitRequest }) => {
  // This function will receive the lat, long and query from the user
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        let lattlong =
          location.coords.latitude + "," + location.coords.longitude;

        submitRequest({ params: { lattlong: lattlong } });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="side-container">
      <div className="first-side-container">
        {/* This button open the search menu */}
        <button className="search-btn" onClick={toggleSlideMenu}>
          Search for places
        </button>

        <i
          className="fa-solid fa-location-crosshairs"
          onClick={handleLocation}
        ></i>
      </div>

      <div className="image-side-container">
        <img src={cloud} alt="weather" />

        {typeof currentDay.icon !== "undefined" ? (
          <img
            src={require(`../../assets/${currentDay.icon}.png`)}
            alt="weather"
          />
        ) : (
          <></>
        )}
      </div>

      <div className="second-side-container">
        <h1>
          {Math.round(currentDay.temperature)}{" "}
          <span>{currentDay.celciusOrfahrenheit}</span>
        </h1>

        <h2>{currentDay.stateName}</h2>

        <p>Today - {currentDay.todayDate}</p>

        <div className="location">
          <p>
            <i className="fa-solid fa-location-dot"></i>
            {currentDay.city}
          </p>
        </div>
      </div>
    </div>
  );
}