import React, { useEffect, useState } from "react";

type DateOrTime = "date" | "time";

const DateTimeComponent: React.FC<{ type: DateOrTime }> = ({ type }): JSX.Element => {

  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <p>{type === "time" ? time.toLocaleTimeString() : time.toLocaleDateString()}</p>
    </>
  );
};

export default DateTimeComponent;
