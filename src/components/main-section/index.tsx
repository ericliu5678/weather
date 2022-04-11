import * as React from "react";
import { LargeCard } from "../large-card";
import { MediumCard } from "../medium-card";
import { SmallCard } from "../smalll-card";
import { CurrentDay, UpcomingDays } from "../../types";
import "./main.css";

type Props = {
  currentDay: CurrentDay;
  upcomingDays: UpcomingDays[];
  convertTemp: (temp: string) => void;
}

export const Main: React.FC<Props> = ({ currentDay, upcomingDays, convertTemp }) => {
  return (
    <div className="main-container">
      <div className="first-section">
        {currentDay.celciusOrfahrenheit === "°C" ? (
          <div className="degree-container">
            <button
              className="ball on"
              onClick={() => convertTemp("°C")}
            >
              °C
            </button>
            <button className="ball off" onClick={() => convertTemp("°F")}>
              °F
            </button>
          </div>
        ) : (
          <div className="degree-container">
            <button className="ball off" onClick={() => convertTemp("°C")}>
              °C
            </button>
            <button className="ball on" onClick={() => convertTemp("°F")}>
              °F
            </button>
          </div>
        )}

        <SmallCard upcomingDays={upcomingDays} />
      </div>

      <div className="second-section">
        <h1 className="title">Today's highlights</h1>
        <LargeCard wind={currentDay.wind} />
        <LargeCard title="humidity" porcentagem={currentDay.humidity} />
        <MediumCard
          title="Visibility"
          value={currentDay.visibility}
          text="miles"
        />
        <MediumCard
          title="Air Pressure"
          value={currentDay.airPressure}
          text="mb"
        />
      </div>
    </div>
  );
}
