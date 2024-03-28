/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import Link from "next/link";
import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();

  const makeAccount = api.auth.Addaccount.useMutation({
    onSuccess: () => {
      // router.push("/api/auth/signin");
    },
  });
  function AddAccount() {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    makeAccount.mutate({
      email: email,
      password: password,
    });
  }

  function RegistrationBox() {
    return (
      <div className="relative h-full w-full items-center justify-center text-center">
        <h1 className=" m-3 text-3xl font-bold">Create an account</h1>
        <div className="m-3">
          Enter your email and password below to create your account
        </div>
        <div className=" w-full">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="m-5 w-full rounded-sm p-3 text-center outline outline-slate-300"
          />
        </div>
        <div className=" w-full">
          <input
            id="password"
            type="password"
            className="m-5 w-full rounded-sm p-3 text-center outline outline-slate-300"
          />
        </div>
        <div className=" w-full">
          <button
            className="m-5 w-full rounded-md bg-black p-3 text-white"
            onClick={async () => {
              console.log("trying to submit");
              AddAccount();
            }}
          >
            Register with Email
          </button>
        </div>
        <div className="w-full">Or you can continue with</div>
        <div className="flex w-full items-center justify-center text-center">
          {" "}
          <div className=" flex w-fit flex-wrap p-5 ">
            <Link className="flex w-fit" href={"/api/auth/signin"}>
              <FcGoogle className="m-5 h-10 w-10" />
              <ImFacebook2 className="m-5 h-10 w-10 text-blue-600" />
            </Link>
          </div>
        </div>

        <div className="ml-auto mr-auto flex w-[80%] flex-wrap items-center justify-center text-center">
          <div>By clicking continue, you agree to our </div>
          <div className=" ml-5 mr-5 underline">Terms of Service</div>
          <div> and</div>
          <div className=" ml-5 mr-5 underline">Privacy Policy</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-wrap ">
      <div className="relative h-full w-1/2 bg-black text-white">
        <div className="absolute left-10 top-10 text-4xl font-bold">
          Acme Inc
        </div>

        <div className="absolute bottom-5 left-5 p-5 text-4xl font-bold">
          {" '' "}This library has saved me countless hours of work and helped
          me deliver stunning designs to my clients faster than ever before.
          {" '' "}
        </div>
      </div>
      <div className=" flex h-full w-1/2 items-center justify-center bg-white text-black">
        <div className=" absolute right-20 top-20 text-3xl font-bold">
          <Link href={"/api/auth/signin"}>Login</Link>
        </div>

        <div>
          <RegistrationBox />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
