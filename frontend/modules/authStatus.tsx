import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { logout } from "./common";
import { AccessTokenName } from "./constants";

export function useUserdata() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aToken, setAToken] = useState<string>(""); // access token

  useEffect(() => {
    const newAToken = localStorage.getItem(AccessTokenName) || "";
    setAToken(newAToken);
  }, []);

  // Fetch user data
  useEffect(() => {
    (async () => {
      if (aToken.length > 0) {
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
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
      }
    })();
  }, [aToken]);

  return {
    user,
    loading,
    aToken,
    setAToken,
  };
}
