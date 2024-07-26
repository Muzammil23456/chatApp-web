import React, { useContext, useEffect, useState } from "react";
import Contact from "./contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatRoom from "./chatroom";
import { logout } from "@/modules/common";
import { UserContext } from "@/modules/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconLogout } from "@tabler/icons-react";
import { Button } from "./ui/button";

function Dashboard() {
  const { user, aToken, setAToken } = useContext(UserContext);

  return (
    <>
      <div className="min-w-[calc(768px+1rem)] max-w-[1700px] h-screen 2xl:h-[calc(100vh-1.5rem)] 2xl:mx-4 2xl:my-3 3xl:mx-auto dark:bg-[#111B21] bg-[#F5F6FA] p-2 rounded-xl">
        <div className="grid grid-cols-12 min-w-[640px] grid-rows-12 gap-3 h-full">
          <div className="col-span-6 row-span-12  md:col-span-5 lg:col-span-4 xl:col-span-3  ">
            {/* left side (Profile+Contacts)*/}
            <div className="flex flex-col h-full gap-2 ">
              <div className=" flex items-center  h-[13%]">
                {/* profile */}
                <div className="flex gap-3 w-full justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                      <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{user?.username}</p>
                      <p className="text-sm text-muted-foreground ">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="link"
                          className="rounded-full "
                          size={"icon"}
                        >
                          <IconDots stroke={2} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant={"ghost"}
                            onClick={() => logout(user, setAToken)}
                            className="  w-full gap-2 justify-start"
                          >
                            <IconLogout />
                            Logout
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <div className=" flex items-center h-[87%]">
                {/* contact */}
                <Contact />
              </div>
            </div>
          </div>
          <div className=" col-span-6 row-span-12 md:col-span-7 lg:col-span-8 xl:col-span-9 ">
            {/* right side (ChatRoom)*/}
            <ChatRoom />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
