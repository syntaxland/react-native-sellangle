// useAuth.js
import { useEffect, useState } from "react";

const useAuth = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenParts = accessToken.split(".");
      const decodedToken = JSON.parse(atob(tokenParts[1])); 
      setUserEmail(decodedToken.email);
    }
  }, []);

  return userEmail;
};

export default useAuth;
