import React, { useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquarePlus } from "lucide-react";
import { User } from "@/modules/types";
import { users } from "@/modules/common";
import { UserContext } from "@/modules/authContext";
import { promise } from "zod";
import axios from "axios";
function Contact({ btnWithIcon }: { btnWithIcon: boolean }) {
  const [openSheet, setOpenSheet] = useState(false);
  const [contacts, setContacts] = useState<User[]>([]);
  const { user, aToken } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const result: User[] = await users(aToken);
        setContacts(result.filter((contact) => contact._id !== user?._id));
      } catch (error: any) {}
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aToken]);

  const startConsversation = async (contactId: string) => {
    const senderId = user?._id;
    const receiverId = contactId;
    try {
      const res = await axios.post(
        "http://localhost:4000/chatRoom/start-conversation",
        {
          senderId,
          receiverId,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button
            size={btnWithIcon ? "icon" : "default"}
            variant={"link"}
            className={`${
              btnWithIcon
                ? ""
                : "text-brand_1 hover:text-brand_2 transition duration-75 p-2  "
            } !no-underline `}
          >
            {btnWithIcon ? <MessageSquarePlus /> : " Add Chats"}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="gap-4">
            <SheetTitle>Contacts:</SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-col gap-3  ">
                {contacts?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 pr-4  justify-between"
                    onClick={() => {
                      startConsversation(item._id);
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{item.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1 justify-between">
                        <p className="text-black">{item.username}</p>
                        <p className="text-sm text-muted-foreground ">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Contact;
