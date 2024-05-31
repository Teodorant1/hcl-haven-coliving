// "use client";
import * as React from "react";
// import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Component() {
  // const router = useRouter();
  const session = await getServerAuthSession();

  if (session) {
    redirect("/Dashboard");
  }

  // const session = useSession();

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/Dashboard");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/Dashboard");
  //   }
  // }, [session]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-24 items-center px-4 lg:px-6"></header>
      <main className="flex-1">
        <section className=" h-1/2 w-full py-12  md:py-24 lg:py-32">
          <div className=" bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center ">
            <h1 className="m-5 text-4xl font-bold text-black">
              Welcome to the Tailwind Club
            </h1>

            <h3 className="text-gray-500">
              Experience the epitome of luxury with our exclusive amenities,{" "}
            </h3>
            <h3 className="mb-6 text-gray-500">
              personalized service, and unique experiences.{" "}
            </h3>

            <Image
              alt="room image"
              title="room image"
              className="mx-auto aspect-[2/1] overflow-hidden rounded-t-xl object-cover"
              src={
                "https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/6f96c813-68f8-4654-b344-8d847f9b6e00/public"
              }
              width={1000}
              height={1000}
            />
            <p className="mt-4 text-xl text-gray-300">Aviators Welcome</p>
            <div className="mt-8 flex gap-4 pt-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/registration"
                rel="ugc"
              >
                Join Now
              </Link>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="/api/auth/signin"
                rel="ugc"
              >
                Login
              </a>
            </div>
          </div>
        </section>
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Comfort
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Experience the ultimate comfort and elegance of our rooms
                    and suites.
                  </p>
                </div>
                <Image
                  alt="Dining"
                  title="Dining"
                  className="mx-auto aspect-auto overflow-hidden rounded-t-xl object-cover"
                  src={
                    "https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/961ceadb-e90f-45e1-7261-d70130d34900/public"
                  }
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Dining
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enjoy a variety of dining options, from casual to elegant.
                  </p>
                </div>

                <Image
                  alt="Dining"
                  title="Dining"
                  className="mx-auto aspect-auto overflow-hidden rounded-t-xl object-cover"
                  src={
                    "https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/433a3a36-a003-4b5d-c4b6-1f4ee4cd2700/public"
                  }
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                    Spa
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Relax and rejuvenate with our spa services.
                  </p>
                </div>
                <Image
                  alt="Spa"
                  title="Spa"
                  className="mx-auto aspect-auto overflow-hidden rounded-t-xl object-cover"
                  src={
                    "https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/0ceaf862-10eb-4789-2aa0-736acfd45e00/public"
                  }
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-white py-12 dark:bg-gray-900 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter dark:text-white md:text-4xl/tight">
                Join Us Now
              </h2>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Become a part of the Hotel Luxe community and enjoy exclusive
                benefits and offers.
              </p>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
                rel="ugc"
              >
                Join Now
              </a>
            </div>
          </div>
        </section>
        <section className="w-full bg-black py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                Contact Us
              </h2>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                For inquiries or reservations, please contact us at (310)
                340-1099 or email us at hello@tailwindclub.org.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 The Tailwind Club. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <a
            className="text-xs underline-offset-4 hover:underline"
            href="#"
            rel="ugc"
          >
            Terms of Service
          </a>
          <a
            className="text-xs underline-offset-4 hover:underline"
            href="#"
            rel="ugc"
          >
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
