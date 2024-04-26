// Timer.js
import React, { useEffect, useState } from "react";
import moment from "moment";

const Timer = ({ expirationDate }) => {
  const calculateTimeRemaining = () => {
    const now = moment();
    const expirationDateObj = moment(expirationDate);

    if (expirationDateObj > now) {
      const duration = moment.duration(expirationDateObj.diff(now));
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return "00:00:00";
    // return "Expired";
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining()); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expirationDate]);

  return <span>{timeRemaining}</span>;
};

export default Timer;
