/* eslint-disable @typescript-eslint/no-empty-interface */
"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { UserAuthForm } from "../_components/user-auth-form";
import * as React from "react";
import { useEffect } from "react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import ConfirmationPopup from "@/components/component/ConfirmationPopup";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const session = useSession();

  //   useEffect(() => {
  //     if (session?.status === "authenticated") {
  //       router.push("/");
  //     }
  //   }, [session]);

  interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
  function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [loginSucceeded, setloginSucceeded] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    async function SignInAccount_with_Credentials(event: React.SyntheticEvent) {
      event.preventDefault();
      setIsLoading(true);

      const email = (document.getElementById("email") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;

      const data = {
        email: email,
        password: password,
      };
      await signIn("credentials", { ...data, redirect: false }).then(() => {
        // router.push("/");
        setloginSucceeded(true);
      });
    }

    function SuccessBox() {
      useEffect(() => {
        console.log("Component mounted");
        return () => {
          console.log("Component unmounted");
        };
      }, []);
      return (
        <Link href={"/"}>
          {" "}
          <div className="rounded-sm bg-black p-3  text-white">
            You have successfully logged in! You are being redirected
          </div>
        </Link>
      );
    }

    return (
      <div className={cn("grid gap-6", className)} {...props}>
        {loginSucceeded === true && <SuccessBox />}{" "}
        {loginSucceeded === false && (
          <div>
            {" "}
            <div className=" m-5 flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">LOG IN</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to log in to your account
              </p>
            </div>{" "}
            <form onSubmit={SignInAccount_with_Credentials}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  <Label className="sr-only" htmlFor="email">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    placeholder="password"
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login with Credentials
                </Button>
              </div>
            </form>{" "}
          </div>
        )}
        {loginSucceeded === false && (
          <>
            {" "}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={async () => {
                // router.push("/api/auth/signin");
                await signIn("google");
              }}
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FcGoogle className="m-5 h-6 w-6" />
              )}{" "}
              Google
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* <RegistrationForm /> */}
      <div className="hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative grid  h-[800px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4",
          )}
        >
          Login
        </Button>
        <div className="relative hidden h-screen  flex-col bg-muted p-10 text-white dark:border-r md:block lg:flex">
          <div className="absolute inset-0  bg-zinc-900 " />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
