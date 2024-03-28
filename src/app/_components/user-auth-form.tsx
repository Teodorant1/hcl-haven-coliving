/* eslint-disable @typescript-eslint/no-empty-interface */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [registrationSucceded, setregistrationSucceded] =
    React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();
  const makeAccount = api.auth.Addaccount.useMutation({
    onSuccess: () => {
      console.log("OP SUCCESS");
      setIsLoading(false);
      setregistrationSucceded(true);
      // router.push("/api/auth/signin");
    },
  });

  function AddAccount(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    makeAccount.mutate({
      email: email,
      password: password,
    });
  }

  function SuccessBox() {
    // useEffect(() => {
    //   router.push("/api/auth/signin");
    //   console.log("Component mounted");
    //   return () => {
    //     console.log("Component unmounted");
    //   };
    // }, []);
    return (
      <Link href={"/ApplicationForm"}>
        {" "}
        <div className="rounded-sm bg-black p-3  text-white">
          You have successfully made an Account! Click here to go to the
          Application form for our pilot program. Make sure to log in first.
        </div>
      </Link>
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {registrationSucceded === true && <SuccessBox />}{" "}
      {registrationSucceded === false && (
        <form onSubmit={AddAccount}>
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
              Register with Credentials
            </Button>
          </div>
        </form>
      )}
      {registrationSucceded === false && (
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
            onClick={() => {
              router.push("/api/auth/signin");
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
