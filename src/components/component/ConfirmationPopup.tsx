import Link from "next/link";
import React from "react";

const ConfirmationPopup = () => {
  return (
    <div className="mx-auto my-12 max-w-lg rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Confirmation Page</h1>
      <div className="text-center">
        <p className="mb-2 text-xl">
          <span className="font-semibold">
            Thanks for signing up with Tailwind!
          </span>
        </p>
        <p className="mb-6">We{"'"}re excited to have you on board.</p>
      </div>
      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800/50">
        <h2 className="mb-3 text-lg font-semibold">Next Steps</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Fill out your application form.</li>
          <li>Your application </li>
          <li>
            Once approved, you can proceed to choose a plan that suits your
            needs.
          </li>
        </ul>
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href={"ApplicationForm"}
          className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
