import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { logout } from "./common";
import { AccessTokenName } from "./constants";
export function useUserdata() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aToken, setAToken] = useState<string>(typeof window !== "undefined" && localStorage.getItem(AccessTokenName) || ""); // access token

  // Fetch user data
  useEffect(() => {
    (async () => {
      if (aToken.length > 0) {
        try {
          const res = await axios.get(
            "http://localhost:4000/user/current-user",
            {
              headers: {
                Authorization: `Bearer ${aToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setUser(res.data.user);
          setLoading(true);
        } catch (error: any) {
          console.error(error);
        } finally {
          setLoading(true);
        }
      } else {
        setUser(null);
        setLoading(true)
      }
    })();
  }, [aToken]);

  const dt = () => {
    
  }
  return {
    user,
    loading,
    aToken,
    setAToken,
    setUser,
  };
}
