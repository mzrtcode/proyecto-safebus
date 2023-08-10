import  { useEffect, useState } from "react";
import { format } from "date-fns"; // Importar la función de formateo

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

  const formattedDate = format(time, "EEEE, MMMM d, yyyy"); // Formatear la fecha

  return (
    <>
      <p style={{ display: "inline-block" }}>
        {type === "time" ? time.toLocaleTimeString() : formattedDate}
      </p>
    </>
  );
};

export default DateTimeComponent;
