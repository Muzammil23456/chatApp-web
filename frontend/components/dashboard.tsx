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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconDots, IconLogout, IconUserEdit } from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: " Must be at least 3 characters" })
    .max(25, { message: "Must be 25 characters or less" }),
  about: z
    .string()
    .min(3, { message: " Must be at least 3 characters" })
    .max(100, { message: "Must be 100 characters or less" }),
});

export default function Dashboard() {
  const { user, aToken, setAToken } = useContext(UserContext);
  const [openDropdown, setOpenDropdown] = useState(false);
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
                    <DropdownMenu
                      onOpenChange={setOpenDropdown}
                      open={openDropdown}
                    >
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
                        <DropdownMenuItem
                          className="p-0"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Profile />
                        </DropdownMenuItem>
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

const Profile = () => {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="  w-full gap-2 justify-start">
          <IconUserEdit />
          Profile
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription asChild>
            <ProfileEditForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const ProfileEditForm = () => {
  const { user, aToken, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      about: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("about", user.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:4000/user/update-profile`,
        { username: data.username, description: data.about },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      console.log(res);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {user && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  gap-3 py-2">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-center">
                  <Avatar className="size-60">
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback className="text-8xl">
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm  font-medium leading-6"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-0 p-1.5 disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                      disabled={loading}
                      id="username"
                      type="text"
                      autoComplete="off"
                      {...register("username")}
                    />
                    {errors && (
                      <span className="text-red-500 text-xs">
                        {errors?.username?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm  font-medium leading-6"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      className="block resize-none w-full rounded-md border-0 p-1.5  disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                      disabled={loading}
                      id="about"
                      autoComplete="off"
                      {...register("about")}
                    />
                    {errors && (
                      <span className="text-red-500 text-xs">
                        {errors?.about?.message}
                      </span>
                    )}
                  </div>
                </div>
                <Button className="w-full bg-brand_1  text-white hover:bg-brand_2">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
