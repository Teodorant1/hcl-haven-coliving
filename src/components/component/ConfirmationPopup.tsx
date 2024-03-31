import Link from "next/link";
import React from "react";

const ConfirmationPopup = () => {
  return (
    <main className="flex w-fit flex-col items-center justify-center bg-gray-100  p-5 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Thanks for signing up with Tailwind!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            We{"'"}re excited to have you on board.
          </p>
        </div>
        <div className="rounded-lg bg-white px-6 py-4 shadow dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Next Steps
          </h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Fill out your application form.</li>
            <li>
              Your application will be reviewed and approved within 24-48 hours.
            </li>
            <li>
              Once approved, you can proceed to choose a plan that suits your
              needs.
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={"ApplicationForm"}
            className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConfirmationPopup;
