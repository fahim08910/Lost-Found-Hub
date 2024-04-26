import { useState, useEffect } from "react";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(persistedIsLoggedIn || false);
  }, []);

  return isLoggedIn;
}
