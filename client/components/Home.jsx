import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BigButton from "./BigButton.jsx";
import WeatherDisplay from "./WeatherDisplay.jsx";


function Home() {
  const location = useLocation();

  const [temp, updateTemp] = useState(0);
  const [uv, updateUv] = useState(0);
  const [condition, updateCondition] = useState("");
  const [city, updateCity] = useState("");
  const [region, updateRegion] = useState("");
  const [sunscreenAlert, setSunscreenAlert] = useState("");
  function showPosition(position){
    console.log("COORDINATES ----> ",position.coords.latitude, position.coords.longitude)
    fetch(`https://api.radar.io/v1/geocode/reverse?coordinates=${position.coords.latitude}%2C${position.coords.longitude}`, {
      headers: {
          'Authorization': 'prj_live_pk_058442fcb54e57751c139cdb5d5b1538755c7a39'
      }
  })
  
      .then(res => res.json())
      .then(res => {
        console.log("GEOLOCATION API RESPONSE --->", res.addresses[0].postalCode)
        fetch(
          `http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=${res.addresses[0].postalCode}`
        )
          .then((res) => res.json())
          .then((res) => {
            updateTemp(res.current.temp_f);
            updateUv(res.current.uv);
            updateCondition(res.current.condition.icon);
            updateCity(res.location.name);
            updateRegion(res.location.region);
            //
        if(res.current.uv > 5) {
          setSunscreenAlert("Put on sunscreen!");
        }
      })
          .catch((err) => {
            console.log("Error in weather api call: ", err);
          });
      })
      
      .catch(err => {
        console.log("error in Geolocation API call", err)
      })
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition)
    console.log(location)
    
    // fetch(
    //   `http://api.weatherapi.com/v1/current.json?key=3b98cf2d582f413d83c172329232503&q=${zipcode}`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     updateTemp(res.current.temp_f);
    //     updateUv(res.current.uv);
    //     updateCondition(res.current.condition.icon);
    //     updateCity(res.location.name);
    //     updateRegion(res.location.region);
    //   })
    //   .catch((err) => {
    //     console.log("Error in weather api call: ", err);
    //   });
  });

  





  return (
    <div id="home-page">
      <div id="content">
        <div>
          <h1>HELLO, {location.state.name}!</h1>
          <div id="city">
            {city}, {region}
          </div>

          <WeatherDisplay
            temp={temp}
            uv={uv}
            sunscreenAlert = {sunscreenAlert}
            condition={condition}
            city={city.toUpperCase()}
            region={region.toUpperCase()}
          />
        </div>

        <BigButton username={location.state.name} uv={uv} />
      </div>
      <div id="footer">
        <div id="developer">
          Developed by: 
        </div>
        <div className="armadillo-img"></div>
      </div>
    </div>
  );
}

export default Home;