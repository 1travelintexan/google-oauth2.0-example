import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5005/auth/verify", {
        withCredentials: true,
      });
      console.log("response from verify route", data);
      setUser(data.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("there was an error on the authenticate user", err);
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    authenticateUser();
  };
  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
