import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const formattedTime = currentTime.toLocaleString("en-US", {
    weekday: "short",
    // weekday: "long",
    day: "numeric",
    month: "short",
    // month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  return (
      <div className="d-flex justify-content-center text-center py-2 digital-clock">
        <Button
          variant="outline-primary"
          size="sm"
          className="rounded"
          disabled
        >
          <i className="fas fa-clock"></i> {formattedTime}
        </Button>
      </div>
  );
};

export default Time;
