import React from "react";
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

const contact = [
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
  {
    name: "Name",
    message: "Message",
  },
];
function Contact() {
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
        <CardContent className="h-[87%] pr-2">
          <ScrollArea type="auto" className=" h-full ">
            <div className="flex flex-col gap-2">
              {contact.map((item, index) => (
                <div key={index} className="flex gap-3 pr-4  justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground ">
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">12:00</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default Contact;
