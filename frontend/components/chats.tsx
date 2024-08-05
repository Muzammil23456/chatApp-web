import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Search from "./search";
import Contact from "./contact";
import axios from "axios";
import { ChatRoom, User } from "@/modules/types";
import { UserContext } from "@/modules/authContext";
import { userWithId } from "@/modules/common";

function Chats() {
  const { user, aToken } = useContext(UserContext);
  const [chatRoom, setChatRoom] = useState<ChatRoom[]>();
  const [chats, setChats] = useState<User[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:4000/chatRoom/get-chat-rooms"
  //       );
  //       const { chatRooms }: { chatRooms: ChatRoom[] } = res.data;
  //       console.log(chatRooms);
  //       setChatRoom(chatRooms);
  //       const chat = chatRooms.map((item) =>
  //         item.users.filter((e) => e !== user?._id)
  //       );
  //       chat.forEach(async (item) => {
  //         const u = await userWithId(aToken, item[0]);
  //         console.log(u);
  //         setChats((prev) => [...prev, u]);
  //       });
  //       console.log(chats);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [aToken, user?._id]);
  return (
    <>
      <Card
        id="cc"
        className=" w-full border-none dark:bg-[#202c3330] h-full overflow-hidden rounded-3xl "
      >
        <CardHeader>
          <CardTitle>
            <Search />
          </CardTitle>
        </CardHeader>
        <CardContent className=" pr-2">
          {/*h-[87%]*/}
          <ScrollArea type="auto" className=" h-full ">
            <div className="flex flex-col gap-2">
              {/* {chats?.map((item, index) => (
                <div key={index} className="flex gap-3 pr-4  justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{item.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{item.username}</p>
                      <p className="text-sm text-muted-foreground ">
                        {item.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">12:00</p>
                  </div>
                </div>
              ))} */}
            </div>
          </ScrollArea>
        </CardContent>
        {chats?.length === 0 && (
          <CardFooter className="justify-center">
            <p className="text-center text-sm text-muted-foreground">
              No Chats Found!
            </p>
            <Contact btnWithIcon={false} />
          </CardFooter>
        )}
      </Card>
    </>
  );
}

export default Chats;
