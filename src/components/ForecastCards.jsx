import React from "react";

export const ForecastCards = ({ day, img, temperature, condition }) => {
  return (
    <div className="flex flex-col  items-center  text-slate-100 bg-white/20 p-2 w-40 rounded-lg m-2">
      <div>{day}</div>
      <img src={img} alt="" />
      <p>{temperature} °C</p>
      <p>{condition}</p>
    </div>
  );
};
