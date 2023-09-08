import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("https://spicy-algorithm.onrender.com/api/isAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log(json);
      if (json.userData != null) {
        setIsLoading(false);
        setUser(json.userData);
        setAuthenticated(true);
      } else {
        setIsLoading(false);
      }
    };

    getUserData();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}  
    </AuthContext.Provider>
  );
};

export default AuthContext;
