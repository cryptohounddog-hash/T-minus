import React, { createContext, useContext, useEffect, useState } from "react";

const NowContext = createContext(Date.now());

export function NowProvider({ children }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return <NowContext.Provider value={now}>{children}</NowContext.Provider>;
}

export function useNow() {
  return useContext(NowContext);
}
