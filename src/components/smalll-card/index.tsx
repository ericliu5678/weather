import React from "react";
import {UpcomingDays} from "../../types"
import "./style.css";

type Props = {
  upcomingDays: UpcomingDays[];
}

export const SmallCard: React.FC<Props> =({upcomingDays})=>{
  const isEmptyObject = (obj:any) => {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        return false;
      }
    }

    return true;
  };

  return isEmptyObject(upcomingDays) === false ? (
    <>
      {upcomingDays.map((item, index) => {
        return (
          <div className="smallcard-container" key={index}>
            <p>{item.dayName}</p>

            <img src={require(`../../assets/${item.icon}.png`)} alt="weather" />

            <p>
              {Math.round(item.minTemp)}
              {item.celciusOrfahrenheit} {Math.round(item.maxTemp)}
              {item.celciusOrfahrenheit}
            </p>
          </div>
        );
      })}
    </>
  ) : (
    <></>
  );
}
