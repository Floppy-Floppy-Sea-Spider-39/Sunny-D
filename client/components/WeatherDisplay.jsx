import React, { useEffect } from "react";

function WeatherDisplay(props) {

  
  return (
    <div id="weatherDisplay">
      <div className="dataCard">
        <div className="data-card-title">Temp: </div>
          <p style={{"fontSize": "26px"}}>{props.temp}°F</p>
      </div>
        <div className="dataCard">
          <div className="data-card-title">Condition: </div>
          <p
            style={{
              "backgroundImage": `url(${props.condition})`,
              "backgroundSize": "100% 100%",
              height: "60px",
              width: "60px",
            }}
          ></p>
        </div>
        <div className="dataCard">
          <div className="data-card-title">UV Index: </div>
          <p style={{"fontSize": "26px", position: "absolute"}}>{props.uv}</p>
          <p> {props.sunscreenAlert}</p>
        </div>
      </div>
  );
}

export default WeatherDisplay;
