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
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { IconPhoneFilled } from "@tabler/icons-react";
import { IconDots } from "@tabler/icons-react";
import Conversation from "./conversation";
import File from "./file";

function ChatRoom() {
  const [conversation, setConversation] = useState(true);
  const [file, setFile] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full gap-3">
        <div className="h-[17%] ">
          <Card className="shadow-sm border-none p-3 flex-col bg-[#F1F2F7] dark:bg-[#202c331a] flex justify-between m-0">
            <CardHeader className=" p-0">
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <CardTitle className="text-justify text-[.95rem] sm:text-base">
                      name
                    </CardTitle>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    variant="ghost"
                    className="rounded-full bg-[#E9EEF7] dark:bg-[#1E293B] hover:!bg-transparent  transition ease-in-out delay-150  "
                    size={"icon"}
                  >
                    <IconPhoneFilled className="text-brand_1" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="rounded-full bg-[#E9EEF7] dark:bg-[#1E293B] hover:!bg-transparent transition ease-in-out delay-150  "
                    size={"icon"}
                  >
                    <IconDots stroke={2} className="text-brand_1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator className="mt-2" />
            <CardFooter className="p-0">
              <div className="flex gap-3">
                <Button
                  className={`${
                    conversation && "text-brand_1 underline"
                  } py-0 disabled:opacity-100 hover:text-brand_1 hover:no-underline`}
                  variant={"link"}
                  disabled={conversation}
                  onClick={() => {
                    setFile(false);
                    setConversation(true);
                  }}
                  size={"sm"}
                >
                  Conversation
                </Button>
                <Button
                  variant={"link"}
                  className={`${
                    file && "text-brand_1 underline"
                  } py-0 disabled:opacity-100 hover:text-brand_1 hover:no-underline`}
                  disabled={file}
                  size={"sm"}
                  onClick={() => {
                    setConversation(false);
                    setFile(true);
                  }}
                >
                  File
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="h-[82%] bg-transparent">
          {conversation ? <Conversation /> : <File />}
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
