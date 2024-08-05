import { useEffect, useContext, useState } from "react";
import { UserContext } from "./authContext";
import { User, ChatRoom } from "./types";
import axios from "axios";
import { userWithId } from "./common";
export const useChat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<User[]>([]);
  const { user, aToken } = useContext(UserContext);
  // Fetch contact data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:4000/chatRoom/get-chat-rooms"
        );
        const { chatRooms }: { chatRooms: ChatRoom[] } = res.data;
        const chats = chatRooms.flatMap((item) => item.users);
        console.log(chats.filter((e) => (e === user?._id)));
        // chats.forEach(async (item) => {
        //   item.forEach(async (i) => {
        //     const u = await userWithId(aToken, i);
        //     setChat((prev) => [...prev, u]);
        //   })
        // })
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?._id]);

  return {
    loading: false,
    chat,
  };
};
