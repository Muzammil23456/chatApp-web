import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { logout } from "./common";
import { AccessTokenName, RefreshTokenName } from "./constants";

// Custom event to trigger localStorage changes
const triggerLocalStorageEvent = () => {
  const event = new Event("localStorageUpdate");
  window.dispatchEvent(event);
};

export function useUserdata() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aToken, setAToken] = useState<string>(""); // access token
  const [rToken, setRToken] = useState<string>(""); // refresh token

  const handleAccessTokenChange = () => {
    const newToken = localStorage.getItem(AccessTokenName) || "";
    setAToken(newToken);
  };

  const handleRefreshTokenChange = () => {
    const newRToken = localStorage.getItem(RefreshTokenName) || "";
    setRToken(newRToken);
  };

  const setupTokenChangeListeners = () => {
    window.addEventListener("storage", (event) => {
      if (event.key === AccessTokenName) {
        handleAccessTokenChange();
      } else if (event.key === RefreshTokenName) {
        handleRefreshTokenChange();
      }
    });
  };

  useEffect(() => {
    const newToken = localStorage.getItem(AccessTokenName) || "";
    setAToken(newToken);

    const newRToken = localStorage.getItem(RefreshTokenName) || "";
    setRToken(newRToken);

    // Setup listeners for localStorage changes
    setupTokenChangeListeners();

    // Cleanup function to remove listeners on component unmount
    return () => {
      window.removeEventListener("storage", handleAccessTokenChange);
      window.removeEventListener("storage", handleRefreshTokenChange);
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    (async () => {
      if (aToken !== "") {
        setLoading(true);
        try {
          const res = await axios.get(
            "http://localhost:4000/user/currentUser",
            {
              headers: {
                Authorization: `Bearer ${aToken}`,
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
                const newAToken = res.data.accessToken;
                const newRToken = res.data.refreshToken;
                console.log(newAToken, newRToken);
                localStorage.setItem(AccessTokenName, newAToken);
                localStorage.setItem(RefreshTokenName, newRToken);
                console.log(res);
                setAToken(newAToken);
                setRToken(newRToken);
              } catch (error: any) {
                console.log(error);
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
      } else {
        setUser(null);
      }
    })();
  }, [aToken, rToken]);

  return {
    user,
    loading,
    aToken,
    setAToken,
    setRToken,
    rToken,
  };
}
