/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ZindexContext = createContext();
export default ZindexContext;

export function ZindexProvider({ children }) {
  const [zIndex, setZIndex] = useState({
    card1: 1,
    card2: 3,
    card3: 0,
    card4: 2,
    cardProject1: 4,
    cardProject2: 5,
    cardProject3: 6,
  });

  return (
    <ZindexContext.Provider
      value={{
        zIndex,
        setZIndex,
      }}
    >
      {children}
    </ZindexContext.Provider>
  );
}
