import React, { useState, useEffect } from "react";
import axios from "axios";

const Timer = ({ country }) => {
  const [isRunning, setIsRunning] = useState(false);

  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
    count: 0,
  });

  const fetchTime = () => {
    axios
      .get(`https://worldtimeapi.org/api/timezone/${country}`)
      .then((response) => {
        const startDate = new Date(response.data.datetime);

        setTime((prev) => {
          return {
            hour: startDate.getHours(),
            minute: startDate.getMinutes(),
            seconds: startDate.getSeconds(),
            count: 0,
          };
        });

        setIsRunning(true);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          const newCount = prev.count + 1;

          if (newCount === 100) {
            return {
              hour: prev.hour,
              minute: prev.minute,
              seconds: prev.seconds + 1,
              count: 0,
            };
          }

          if (prev.seconds === 60) {
            return {
              hour: prev.hour,
              minute: prev.minute + 1,
              seconds: 0,
              count: newCount,
            };
          }

          if (prev.minute === 60) {
            return {
              hour: prev.hour + 1,
              minute: 0,
              seconds: 0,
              count: newCount,
            };
          }

          return {
            ...prev,
            count: newCount,
          };
        });
      }, 10);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (country != null) {
      fetchTime();
    }
  }, [country]);

  const handletimer = () => {
    if (country != null) {
        setIsRunning(!isRunning);
    }
    
  };

  return (
    <div className="timer-wrapper">
      <div className="timer-box">
        <div className="timer">
          <p>
            {time.hour < 9 ? "0" + time.hour : time.hour} :{" "}
            {time.minute < 9 ? "0" + time.minute : time.minute} :{" "}
            {time.seconds < 9 ? "0" + time.seconds : time.seconds}
          </p>
        </div>
        <div className="timer-action">
          <button onClick={handletimer}>{isRunning ? "Pause" : "Start"}</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
