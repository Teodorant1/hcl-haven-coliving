import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className=" static flex w-full items-center justify-center p-5">
      <div className=" left-[10%] ml-5 mr-auto flex items-center justify-center ">
        <Image
          alt="The Tailwind Club Logo"
          src={`https://rcprbmdrrmrvjubkxifr.supabase.co/storage/v1/object/public/images/tailwind-club-logo-last.png`}
          className=""
          height="45"
          width="45"
        />
        <span className="sr-only">The Tailwind Club</span>
      </div>

      <nav className=" absolute right-5 top-5 mr-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="Gallery"
          rel="ugc"
        >
          Gallery
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
          rel="ugc"
        >
          Membership
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
          rel="ugc"
        >
          Pricing
        </Link>
        {session === null && (
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/api/auth/signin"
            rel="ugc"
          >
            Log In
          </Link>
        )}
        {session && (
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
            rel="ugc"
          >
            {session?.user.email}
          </Link>
        )}
        {session && (
          <Link
            href="/api/auth/signout"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Log Out
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
