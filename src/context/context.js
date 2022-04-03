import React, { useState, useContext } from "react";

const PointsContext = React.createContext();

const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const updatePoints = (newPoint) => {
    setPoints(newPoint);
  };

  return (
    <PointsContext.Provider value={{ points, updatePoints }}>
      {children}
    </PointsContext.Provider>
  );
};

const usePointsContext = () => {
  return useContext(PointsContext);
};

export { PointsProvider, usePointsContext };
