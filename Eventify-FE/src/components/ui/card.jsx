import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4 transition-transform duration-300 hover:-translate-y-2 hover:scale-102">
    <div className="text-blue-600 text-3xl">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
  );
};

export default Card;
