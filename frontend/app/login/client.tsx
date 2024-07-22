/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserdata } from "@/modules/authStatus";
import { UserContext } from "@/modules/authContext";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email(),
  password: z.string().min(6, {
    message: "Password me be 6 characters minimum",
  }),
});

function LoginClient() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);

    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      console.log(res);
      router.push("/");
      // set  access-token in local storage
      localStorage.setItem("aT", res.data.accessToken);
      // set refresh-token in local storage
      localStorage.setItem("rT", res.data.refreshToken);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Card className="shadow-lg md:w-6/12 xl:w-[30%] ">
          <CardHeader>
            <CardTitle className="text-brand_1">
              <p>Login</p>
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex  gap-3 py-2">
                <div className="flex w-full  flex-col gap-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm  font-medium leading-6"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        className="block w-full rounded-md border-0 p-1.5 disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                        disabled={loading}
                        id="username"
                        type="text"
                        autoComplete="off"
                        {...register("email")}
                      />
                      {errors && (
                        <span className="text-red-500 text-xs">
                          {errors?.email?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm  font-medium leading-6"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        className="block w-full rounded-md border-0 p-1.5  disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                        disabled={loading}
                        type="password"
                        id="password"
                        autoComplete="off"
                        {...register("password")}
                      />
                      {errors && (
                        <span className="text-red-500 text-xs">
                          {errors?.password?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="sm:gap-7 gap-4 flex-col">
            <>
              <div className="flex flex-row gap-3 w-full items-center">
                <p className="w-full text-sm text-muted-foreground text-right">
                  Don't have an account?
                  <Link
                    href={loading ? "null" : "/register"}
                    className={` ${
                      loading
                        ? "cursor-not-allowed opacity-50"
                        : "hover:underline"
                    } text-brand_1  underline-offset-4 ml-1 `}
                  >
                    Register
                  </Link>
                </p>
                <Button
                  className="w-2/6 bg-brand_1 disable:opacity-50 hover:bg-brand_2 transition ease-in-out delay-150  "
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit(onSubmit)}
                >
                  {loading ? <IconLoader2 className="animate-spin" /> : "Login"}
                </Button>
              </div>
            </>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default LoginClient;
