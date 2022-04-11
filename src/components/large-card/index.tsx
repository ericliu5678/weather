import * as React from "react";
import "./style.css";
type Props = {
  porcentagem?: any;
  wind?: number;
  title?: string;
}

export const LargeCard: React.FC<Props> = ({ porcentagem, wind, title }) => {
  return (porcentagem !== undefined) ? (
    <div className="largecard-container">
      <p>Humidity</p>

      <h1>
        {porcentagem} <span>%</span>
      </h1>

      <div className="porcentagem-container">
        <div className="porcentagem-numbers">
          <p>0</p>
          <p>50</p>
          <p>100</p>
        </div>

        <div className="porcentagem-line">
          <div
            className="porcentagem"
            style={{ width: `${porcentagem}%` }}
          ></div>
        </div>
        <p>%</p>
      </div>
    </div>
  ) : (
    <div className="largecard-container">
      <p>Wind status</p>

      <h1>
        {wind} <span>mph</span>
      </h1>

      <p>wsw</p>
    </div>
  );
};