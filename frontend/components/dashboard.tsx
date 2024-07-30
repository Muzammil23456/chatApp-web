/* eslint-disable @next/next/no-img-element */
import React, {
  ChangeEvent,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Chats from "./chats";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IconDots,
  IconLoader2,
  IconLogout,
  IconPassword,
  IconUserEdit,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import Contact from "./contact";
import { IconSun } from "@tabler/icons-react";
import { IconMoonStars } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Toast } from "./toast";

export default function Dashboard() {
  const { user, aToken, setAToken } = useContext(UserContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const [toastTitle, setToastTitle] = useState("");
  const [toastDetail, setToastDetail] = useState("");

  return (
    <>
      <Toast
        title={toastTitle}
        detail={toastDetail}
        handleToast={setToastTitle}
      />
      <div className="min-w-[calc(768px+1rem)] max-w-[1700px] h-screen 2xl:h-[calc(100vh-1.5rem)] 2xl:mx-4 2xl:my-3 3xl:mx-auto dark:bg-[#111B21] bg-[#F5F6FA] p-2 rounded-xl">
        <div className="grid grid-cols-12 min-w-[640px] grid-rows-12 gap-3 h-full">
          <div className="col-span-6 row-span-12  md:col-span-5 lg:col-span-4 xl:col-span-3  ">
            {/* left side (Profile+Chats)*/}
            <div className="flex flex-col h-full gap-2 ">
              <div className=" flex items-center  h-[13%]">
                {/* profile */}
                <div className="flex gap-3 w-full justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>{user?.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{user?.username}</p>
                      <p className="text-sm text-muted-foreground ">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ">
                    {/* dark mode icon */}
                    <Button
                      size={"icon"}
                      variant="link"
                      className="rounded-full"
                      onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                      }
                    >
                      <IconSun className=" dark:hidden " />
                      <IconMoonStars className="hidden dark:block " />
                    </Button>
                    <Contact btnWithIcon={true} />
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
                        <DropdownMenuLabel>Manage</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="p-0"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Profile />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="p-0"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <UpdatePassword />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="p-0"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <ProfilePicture />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant={"ghost"}
                            onClick={() => logout(user, setAToken)}
                            className="  w-full gap-2  justify-start"
                          >
                            <IconLogout />
                            <span>Log Out</span>
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <div className=" flex items-center h-[87%]">
                {/* chats */}
                <Chats />
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

const UpdatePassword = () => {
  const formSchema = z.object({
    oldPassword: z.string().min(6, {
      message: "Password must be 6 characters long",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be 6 characters long",
    }),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, aToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/user/change-password",
        { oldPwd: data.oldPassword, newPwd: data.newPassword },
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );
      console.log(res);
      reset();
      setOpenDialog(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="  w-full gap-2 justify-start">
            <IconPassword />
            Password
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="gap-5">
            <DialogTitle>Update Password</DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex  gap-3 py-2">
                  <div className="flex w-full  flex-col gap-4">
                    <div>
                      <label
                        htmlFor="oldPwd"
                        className="block text-sm  font-medium leading-6"
                      >
                        Old Password
                      </label>
                      <div className="mt-1">
                        <input
                          className="block w-full rounded-md border-0 p-1.5 disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                          disabled={loading}
                          id="oldPwd"
                          type="text"
                          autoComplete="off"
                          {...register("oldPassword")}
                        />
                        {errors && (
                          <span className="text-red-500 text-xs">
                            {errors?.oldPassword?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="newPwd"
                        className="block text-sm  font-medium leading-6"
                      >
                        New Password
                      </label>
                      <div className="mt-1">
                        <input
                          className="block w-full rounded-md border-0 p-1.5  disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                          disabled={loading}
                          type="password"
                          id="newPwd"
                          autoComplete="off"
                          {...register("newPassword")}
                        />
                        {errors && (
                          <span className="text-red-500 text-xs">
                            {errors?.newPassword?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      className="w-full  bg-brand_1 disable:opacity-50 hover:bg-brand_2 transition ease-in-out delay-150"
                      type="submit"
                    >
                      {loading ? (
                        <IconLoader2 className="animate-spin" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
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
            <ProfileEditForm onOpenChange={setOpenSheet} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const ProfileEditForm = ({
  onOpenChange,
}: {
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(20, { message: "Username must be at most 20 characters" }),
    about: z
      .string()
      .min(3, { message: "About must be at least 3 characters" })
      .max(100, { message: "About must be at most 100 characters" }),
  });

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
  }, [setValue, user]);

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
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {user && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  gap-3 py-2">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6"
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
                      // onKeyDown={(e) => {
                      //   e.code === 'Space' ? e.stopPropagation() : null;
                      // }}
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


const ProfilePicture = () => {
  const [image, setImage] = useState<File | null>(null);
  const { aToken } = useContext(UserContext);

  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file); // 'avatar' should match the field name expected by Multer

      const res = await axios.patch(
        "http://localhost:4000/user/update-profile-picture",
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } } // Multer handles 'Content-Type' automatically
      );
      console.log(res.data); // Log the response data
    } catch (error: any) {
      console.error('Upload error:', error.response?.data || error.message);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      upload(file);
    }
  };

  return (
    <div>
      <input type="file" name="avatar" accept="image/*" onChange={handleImageChange} />
      {image && <p>File selected: {image.name}</p>}
    </div>
  );
};
