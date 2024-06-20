import React from "react";
import SummonStripeSubscriptionButton from "@/components/component/SummonStripeButton";

const Membership = () => {
  return (
    <main className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose Your Plan
          </h2>
          <div className="mt-8 grid items-end gap-6 md:grid-cols-2 lg:grid-cols-5">
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col  space-y-1.5 p-6">
                <h3 className="h-fit whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Basic
                </h3>
                <p className="text-sm text-muted-foreground">$55/month</p>
              </div>
              <div className=" bottom-5 flex flex-col justify-between p-6">
                <div>This includes:</div>
                <ul className="mb-4 list-inside list-disc">
                  <li>1 night per month</li>
                  <li>$55 per night for additional nights</li>
                  <li>Storage of your items while away </li>
                  <li>Bedding/ linens</li>

                  <li>Towels</li>
                </ul>
                <SummonStripeSubscriptionButton NumberOfDays={1} />
              </div>
            </div>
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col  space-y-1.5 p-6">
                <h3 className="h-fit whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Standard
                </h3>
                <p className="text-sm text-muted-foreground">$200/month</p>
              </div>
              <div className=" bottom-5 flex flex-col justify-between p-6">
                <div>This includes:</div>
                <ul className="mb-4 list-inside list-disc">
                  <li>5 nights per month</li>
                  <li>$55 per night for additional nights</li>
                  <li>Storage of your items while away </li>
                  <li>Bedding/ linens</li>
                  <li>Towels</li>
                </ul>
                <SummonStripeSubscriptionButton NumberOfDays={5} />
              </div>
            </div>
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col  space-y-1.5 p-6">
                <h3 className="h-fit whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Premium
                </h3>
                <p className="text-sm text-muted-foreground">$400/month</p>
              </div>
              <div className=" bottom-5 flex flex-col justify-between p-6">
                <div>This includes:</div>
                <ul className="mb-4 list-inside list-disc">
                  <li>10 nights per month</li>
                  <li>$55 per night for additional nights</li>
                  <li>Storage of your items while away </li>
                  <li>Bedding/ linens</li>
                  <li>Towels</li>
                </ul>
                <SummonStripeSubscriptionButton NumberOfDays={10} />
              </div>
            </div>
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col  space-y-1.5 p-6">
                <h3 className="h-fit whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Pro
                </h3>
                <p className="text-sm text-muted-foreground">$600/month</p>
              </div>
              <div className=" bottom-5 flex flex-col justify-between p-6">
                <div>This includes:</div>
                <ul className="mb-4 list-inside list-disc">
                  <li>15 nights per month</li>
                  <li>$55 per night for additional nights</li>
                  <li>Storage of your items while away </li>
                  <li>Bedding/ linens</li>

                  <li>Towels</li>
                </ul>
                <SummonStripeSubscriptionButton NumberOfDays={15} />
              </div>
            </div>
            <div
              className=" h-full rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col  space-y-1.5 p-6">
                <h3 className="h-fit whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Ultimate
                </h3>
                <p className="text-sm text-muted-foreground">$1095/month</p>
              </div>
              <div className=" bottom-5 flex flex-col justify-between p-6">
                <div>This includes:</div>
                <ul className="mb-4 list-inside list-disc">
                  <li>30 nights per month</li>
                  <li>
                    Stay all month, flex down to any lower tier or cancel the
                    next month.
                  </li>
                </ul>
                <SummonStripeSubscriptionButton NumberOfDays={30} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            <div data-state="closed">
              <button
                type="button"
                aria-controls="radix-:r6:"
                aria-expanded="false"
                data-state="closed"
                className="flex items-center justify-between rounded-md bg-white p-4 dark:bg-gray-900"
              >
                <span>What is the cancellation policy?</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <div
                data-state="closed"
                id="radix-:r6:"
                className="rounded-md bg-white p-4 dark:bg-gray-900"
              ></div>
            </div>
            <div data-state="closed">
              <button
                type="button"
                aria-controls="radix-:r7:"
                aria-expanded="false"
                data-state="closed"
                className="flex items-center justify-between rounded-md bg-white p-4 dark:bg-gray-900"
              >
                <span>Can I switch my plan later?</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <div
                data-state="closed"
                id="radix-:r7:"
                className="rounded-md bg-white p-4 dark:bg-gray-900"
              ></div>
            </div>
            <div data-state="closed">
              <button
                type="button"
                aria-controls="radix-:r8:"
                aria-expanded="false"
                data-state="closed"
                className="flex items-center justify-between rounded-md bg-white p-4 dark:bg-gray-900"
              >
                <span>Do you offer any discounts?</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <div
                data-state="closed"
                id="radix-:r8:"
                className="rounded-md bg-white p-4 dark:bg-gray-900"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Benefits of Membership
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col items-center p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mb-4 h-8 w-8"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h3 className="mb-2 text-lg font-semibold">
                  Access to All Features
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get full access to all our features.
                </p>
              </div>
            </div>
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col items-center p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mb-4 h-8 w-8"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h3 className="mb-2 text-lg font-semibold">Priority Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get priority support from our team.
                </p>
              </div>
            </div>
            <div
              className=" rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col items-center p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mb-4 h-8 w-8"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <h3 className="mb-2 text-lg font-semibold">
                  Exclusive Content
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access exclusive content and resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Membership;
