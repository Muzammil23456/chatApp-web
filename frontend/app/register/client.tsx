"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import ShowAlert from "@/components/alert";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(50, {
        message: "Name must be at most 50 characters.",
      }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email(),
    password: z.string().min(6, {
      message: "Password me be 6 characters minimum",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password me be 6 characters minimum",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
function RegisterClient() {
  const [loading, setLoading] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDetail, setAlertDetail] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      router.push("/");
      reset();
    } catch (error: any) {
      if (error.response) {
        setAlertTitle("Error");
        setAlertDetail(error.response?.data.message);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ShowAlert
        title={alertTitle}
        handleAlert={setAlertTitle}
        detail={alertDetail}
      />
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Card className="shadow-lg sm:p-3">
          <CardHeader>
            <CardTitle className="text-brand_1">
              <p>Register</p>
            </CardTitle>
            <CardDescription>
              Create an account to expand your contacts
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
                      htmlFor="email"
                      className="block text-sm  font-medium leading-6"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        className="block w-full rounded-md border-0 p-1.5  disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                        disabled={loading}
                        type="email"
                        id="email"
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
                  <div className="flex sm:flex-row flex-col gap-4">
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
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm  font-medium leading-6"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          className="block w-full rounded-md border-0 p-1.5  disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset focus-visible:outline-none  focus:!ring-brand_1 ring-gray-300 placeholder:text-gray-400 "
                          disabled={loading}
                          id="confirmPassword"
                          type="password"
                          autoComplete="off"
                          {...register("confirmPassword")}
                        />
                        {errors && (
                          <span className="text-red-500 text-xs">
                            {errors?.confirmPassword?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="sm:gap-7 gap-4 flex-col">
            <>
              <div className="flex items-center space-x-2 w-full">
                <Switch
                  disabled={loading}
                  className=" data-[state=checked]:bg-brand_1"
                  required
                  checked={termsAndConditions}
                  onCheckedChange={setTermsAndConditions}
                  id="terms-and-conditions"
                />
                <Label htmlFor="terms-and-conditions">
                  I agree to the
                  <Link
                    href={loading ? "null" : "/login"}
                    target="_blank"
                    className={`${
                      loading
                        ? "cursor-not-allowed  opacity-50"
                        : "hover:text-brand_1"
                    } underline ml-1 `}
                  >
                    terms and conditions
                  </Link>
                </Label>
              </div>
              <div className="flex flex-row gap-3 w-full items-center">
                <p className="w-full text-sm text-muted-foreground text-right">
                  Already have an account?
                  <Link
                    href={loading ? "null" : "/login"}
                    className={`${
                      loading
                        ? "cursor-not-allowed  opacity-50"
                        : "hover:underline"
                    } text-brand_1  underline-offset-4 ml-1 `}
                  >
                    Login
                  </Link>
                </p>
                <Button
                  className="w-2/6 bg-brand_1 disable:opacity-50 hover:bg-brand_2 transition ease-in-out delay-150  "
                  type="submit"
                  disabled={loading || !termsAndConditions}
                  onClick={handleSubmit(onSubmit)}
                >
                  {loading ? (
                    <IconLoader2 className="animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default RegisterClient;
