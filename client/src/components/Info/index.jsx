import React from "react";

const InfoCard = ({ color, icon, count, title }) => {
  var stylecolor = "";
  switch (color) {
    case "blue":
      stylecolor = "bg-blue-500";
      break;
    case "red":
      stylecolor = "bg-red-500";
      break;
    case "green":
      stylecolor = "bg-green-500";
      break;
    default:
      stylecolor = "bg-sky-500";
  }
  return (
    <div
      className={`${stylecolor} p-4 text-white text-xl flex justify-between items-center w-[100%] md:w-[300px] shadow-sm rounded-sm `}
    >
      <div>
        <div>{title}</div>
        <div className="font-bold">{count}</div>
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default InfoCard;
