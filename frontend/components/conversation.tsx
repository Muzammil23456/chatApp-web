import React, { useEffect, useState } from "react";
import { IconSend2, IconCircleArrowDownFilled } from "@tabler/icons-react";
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
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

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
  const [emoji, setEmoji] = useState<boolean>(false);
  const [r, setR] = useState<EmojiClickData>();
  const [downArrow, setDownArrow] = useState<boolean>(false);

  const scrollCheck = () => {
    const scroll = document.getElementById("scroll-area");
    // check whether the user has scrolled up
    if (scroll) {
      if (scroll?.scrollTop <= -20) {
        setDownArrow(true);
      } else {
        setDownArrow(false);
      }
    }
  };
  const downArrowBtn = () => {
    const down = document.getElementById("down-arrow");
    down?.scrollIntoView({ behavior: "smooth" });
    const scroll = document.getElementById("scroll-area");
    scroll?.scrollTo(0, 0);
  };

  useEffect(() => {
    if (r) {
      setEmoji(false);
    }
  }, [r]);
  return (
    <>
      <div className="flex flex-col h-full gap-3">
        <div
          id="scroll-area"
          onScroll={scrollCheck}
          className=" overflow-y-auto h-full flex flex-col-reverse "
        >
          <div className=" flex flex-col p-2  gap-2 justify-end ">
            {messages.map((message, index) => (
              <Message
                key={index}
                msg={message.content}
                isOwnMessage={message.sender === "Alice"}
              />
            ))}
          </div>
          {downArrow && (
            <span
              onClick={downArrowBtn}
              id="down-arrow"
              className=" absolute right-8"
            >
              <IconCircleArrowDownFilled size={30} />
            </span>
          )}
        </div>
        <div>
          {emoji && (
            <div className="absolute right-16 bottom-16">
              <Picker
                data={data}
                onEmojiClick={(emoji: EmojiClickData) => setR(emoji)}
              />
            </div>
          )}
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
                  onClick={() => {
                    console.log("clicked");
                    setEmoji((pre) => !pre);
                  }}
                  className="absolute  my-auto  inset-y-0 right-16"
                >
                  <IconMoodSmile className="text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Emoji</p>
              </TooltipContent>
            </Tooltip>
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

export const Emoji = () => {
  return (
    <div className="absolute right-16 bottom-16">
      <EmojiPicker />
    </div>
  );
};
