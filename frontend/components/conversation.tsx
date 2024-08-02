import React, { useEffect } from "react";
import { IconSend2 } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { IconPaperclip } from "@tabler/icons-react";
import { IconMoodSmile } from "@tabler/icons-react";
import { Message } from "./common";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker from 'emoji-picker-react';

const messages = [
  { sender: "Alice", content: "Hello, how are you?" },
  { sender: "Alice", content: "I'm good too." },
  { sender: "Bob", content: "What about you?" },
  { sender: "Alice", content: "I'm good too." },
  { sender: "Bob", content: "What about you?" },
  { sender: "Alice", content: "I'm good too." },
  { sender: "Alice", content: "What's your plan for today?" },
  { sender: "Alice", content: "I'm going to the park." },
  { sender: "Bob", content: "Sounds good!" },
];

function Conversation() {
  useEffect(() => {
    const element = document.getElementById("messages");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  })
  return (
    <>
      <div className="flex flex-col h-full gap-3">
        <div id="messages"  className=" overflow-y-auto h-full">
          <div className=" flex flex-col p-2  gap-2 justify-end h-full ">
            {messages.map((message, index) => (
              <Message
                key={index}
                msg={message.content}
                isOwnMessage={message.sender === "Alice"}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="relative block">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  className="absolute my-auto rounded-full  inset-y-0 right-[10px] bg-brand_1 hover:bg-brand_1 flex items-center"
                >
                  <IconSend2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"link"}
                  className="absolute  my-auto  inset-y-0 left-[5px]"
                >
                  <IconPaperclip className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attachment</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"link"}
                  className="absolute  my-auto  inset-y-0 right-16"
                >
                  <IconMoodSmile className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Emoji</p>
              </TooltipContent>
            </Tooltip>
            {/* <EmojiPicker/> */}
            <input
              type="text"
              id="message"
              placeholder="Type a message."
              className="focus-visible:outline-none w-full font-medium rounded-full p-4 pl-12 text-sm dark:bg-[#202c3330] text-muted-foreground   "
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default Conversation;
