import * as React from "react";
import "./style.css";

type Props = {
  title: string;
  value: any;
  text: string;
}

export const MediumCard: React.FC<Props> = ({ title, value, text }) => {
  return (
    <div className="mediumcard-container">
      <p>{title}</p>

      <h1>
        {value} <span>{text}</span>
      </h1>
    </div>
  );
}
