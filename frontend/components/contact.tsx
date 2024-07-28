import React, {useContext, useEffect, useState} from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { User } from '@/modules/types';
import { users } from '@/modules/common';
import { UserContext } from '@/modules/authContext';
import { promise } from 'zod';
function Contact() {
    const [openSheet, setOpenSheet] = useState(false);
    const [contacts,setContacts]=useState<User[]>([])
const {user,aToken} = useContext(UserContext)
    useEffect(()=>{
      try{
        const result = users(aToken)
        result
      } catch(error: any){
      }
    },[aToken])
  return (
    <>
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button
            variant={"link"}
            className="text-brand_1 hover:text-brand_2 transition duration-75 !no-underline "
          >
            <MessageSquarePlus/>
            Add Chats
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Contact