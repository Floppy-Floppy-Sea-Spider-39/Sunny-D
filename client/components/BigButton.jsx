import React, { useState, useEffect } from "react";
import vitaminDQuotes from '../assets/Quotes.js';
import Notification from './Notification.jsx';


function getRandomQuote() {
  return vitaminDQuotes[Math.floor((Math.random() * vitaminDQuotes.length))];
}

function BigButton(props) {
  //Send to backend:
  // Make request to /api/submit
  // POST
  // BODY: {username: 'username', date: 'string', points: 'number'}
  // response.body: number

  const addSession = (username, date, points) => {
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, date: date, points: points }),
    })
      .then((response) => response.json())
      .then((response) => {
        updatePoints(response);
      });
  };

  const updatePercentagePoints = () => {
    if(isOutside) {
      console.log('isOutside: ', String(isOutside))
      const totalMinutes = (Date.now() - startTime) / 60000;
      const points = props.uv * totalMinutes + totalPoints;
      console.log('New points:', points);
      updatePoints(points);
    }
  }

  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [message, setMessage] = useState(getRandomQuote())
  const [isOutside, switchOutside] = useState(false);
  const [startTime, setStart] = useState(0);
  const [totalPoints, updatePoints] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    fetch(`/api/submit/${props.username}`)
      .then((response) => response.json())
      .then((response) => {
        if (!response) {
          updatePoints(0);
        } else {
          updatePoints(response.points);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    if(isOutside) {
      setIntervalId(setInterval(updatePercentagePoints, 100));
    } else {
      clearTimeout(intervalId);
    }
  }, [isOutside]);

  const handleClick = () => {
    if (isOutside === true) {
      const totalMinutes = (Date.now() - startTime) / 60000;
      setStart(0);
      const points = props.uv * totalMinutes;

      addSession(props.username, new Date().toDateString(), points);
      setMessage(getRandomQuote());
      setIsSnackOpen(true);
    } else {
      setStart(Date.now());
      setIsSnackOpen(false);
    }
    switchOutside(!isOutside);
  };

  return (
    <div id="d-meter">
      <div>D-Meter: {typeof totalPoints === 'number' ? totalPoints.toFixed(2): '0.00'}%</div>
      <div id="progress-container">
        <div id="loading" style={{ width: `${totalPoints}%` }}></div>
      </div>
      <br />
      <button id="big-button" onClick={handleClick}>
        {isOutside
          ? "YOU'RE OUTSIDE! GO INSIDE?"
          : "YOU'RE INSIDE! GO OUTSIDE?"}
      </button>
      <Notification isSnackOpen={isSnackOpen} message={message} />
    </div>
  );
}

export default BigButton;
