import React, { useState } from "react";
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


function Chats() {
  const [chats, setChats] = useState([]);
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
              {/* {chats.map((item, index) => (
                <div key={index} className="flex gap-3 pr-4  justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{item}</p>
                      <p className="text-sm text-muted-foreground ">{item}</p>
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
        {chats.length === 0 && (
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
