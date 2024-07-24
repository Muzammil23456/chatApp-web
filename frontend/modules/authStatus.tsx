import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { logout } from "./common";

// Custom event to trigger localStorage changes
const triggerLocalStorageEvent = () => {
  const event = new Event("localStorageUpdate");
  window.dispatchEvent(event);
};

export function useUserdata() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [rToken, setRToken] = useState<string>("");

  // Handle token changes from localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newToken = localStorage.getItem("aT") || "";
  //     const newRToken = localStorage.getItem("rT") || "";
  //     setToken(newToken);
  //     setRToken(newRToken);
  //   };

  //   window.addEventListener("localStorage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("localStorage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    const newToken = localStorage.getItem("aT") || "";
    setToken(newToken);
  }, []);
  useEffect(() => {
    const newRToken = localStorage.getItem("rT") || "";
    setRToken(newRToken);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const res = await axios.get(
            "http://localhost:4000/user/currentUser",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUser(res.data.user);
        } catch (error: any) {
          if (error.response) {
            const { message } = error.response.data;
            if (message === "jwt expired") {
              try {
                const res = await axios.post(
                  "http://localhost:4000/user/refreshToken",
                  { refreshToken: rToken },
                  { headers: { "Content-Type": "application/json" } }
                );
                const newToken = res.data.accessToken;
                const newRToken = res.data.refreshToken;
                console.log(newToken, newRToken)
                localStorage.setItem("aT", newToken);
                localStorage.setItem("rT", newRToken)
                console.log(res);
                setToken(newToken);
                setRToken(newRToken);
              } catch (error: any) {
                console.log(error)
                // const { message } = error.response.data;
                // if (message === "jwt expired") {
                //   logout();
                // }
              }
            }
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [token, rToken]);

  return {
    user,
    loading,
    token,
    setToken,
  };
}
