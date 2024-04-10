import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import Stripe from "stripe";
import { type StripeMetadata } from "project-types";

export const bookingRouter = createTRPCRouter({
  BuySubscription: protectedProcedure
    .input(
      z.object({
        // quantity: z.number(),
        // priceID: z.string().min(10),
        // description: z.string().min(10),
        // packageName: z.string().min(1),
        method: z.string().min(1),
        number_of_days: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Buying subscription");
      const stripeMetada: StripeMetadata = {
        description: input.number_of_days + " DAYS",
        priceID: "price_1P3OGbJsSW6jGUhshqmG2tYP",
        price: input.number_of_days * 40,
        email: ctx.session.user.email,
        packageName: input.number_of_days + " DAYS",
        method: input.method,
      };
      const line_item = {
        price: "price_1P3OGbJsSW6jGUhshqmG2tYP",
        quantity: input.number_of_days,
      };
      const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
      try {
        const sesh = await stripe.checkout.sessions.create({
          //  mode: "payment",
          mode: "subscription",
          payment_method_types: ["card", "us_bank_account"],
          line_items: [line_item],
          success_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/SUCCESS",
          cancel_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/FAIL",
          metadata: stripeMetada,
        });
        await ctx.db.subscription.create({
          data: {
            userEmail: ctx.session.user.email,
            user_id: " ",
            subscriptionStatus: false,
            metadata: " ",
            price_id: line_item.price,
            // number of days
            NumberOfBoughtDays: input.number_of_days,
            cancel_at_period_end: false,
            created_at: new Date(),
            currentPeriod_start: new Date(),
            currentPeriod_end: new Date(),
            SessionID: sesh.id,
            priceID: "price_1P3OGbJsSW6jGUhshqmG2tYP",
            packageName: input.number_of_days + " DAYS",
            description: input.number_of_days + " DAYS",
            price: input.number_of_days * 40,
          },
        });
        console.log(sesh);
        return sesh.url;
      } catch (error) {
        console.log(error);
      }
    }),

  BuyExtraDay: protectedProcedure
    .input(
      z.object({
        // quantity: z.number(),
        // priceID: z.string().min(10),
        // description: z.string().min(10),
        packageName: z.string().min(1),
        method: z.string().min(1),
        number_of_days: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Buying subscription");
      // const PackageToBeBought = await ctx.db.subscriptionPlans.findFirstOrThrow(
      //   {
      //     where: {
      //       packageName: input.packageName,
      //     },
      //   },
      // );
      const stripeMetada: StripeMetadata = {
        description: input.number_of_days + " DAYS",
        priceID: "price_1P3OGbJsSW6jGUhshqmG2tYP",
        price: input.number_of_days * 40,
        email: ctx.session.user.email,
        packageName: input.packageName,
        method: input.method,
      };
      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        //price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        price: "price_1P3OGbJsSW6jGUhshqmG2tYP",
        quantity: input.number_of_days,
      };
      const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
      try {
        const sesh = await stripe.checkout.sessions.create({
          //  mode: "payment",
          mode: "subscription",
          payment_method_types: ["card", "us_bank_account"],
          line_items: [line_item],
          success_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/SUCCESS",
          cancel_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/FAIL",
          metadata: stripeMetada,
        });
        await ctx.db.subscription.create({
          data: {
            userEmail: ctx.session.user.email,
            user_id: " ",
            subscriptionStatus: false,
            metadata: " ",
            price_id: line_item.price,
            // number of days
            NumberOfBoughtDays: input.number_of_days,
            cancel_at_period_end: false,
            created_at: new Date(),
            currentPeriod_start: new Date(),
            currentPeriod_end: new Date(),
            SessionID: sesh.id,
            priceID: "price_1P3OGbJsSW6jGUhshqmG2tYP",
            packageName: input.number_of_days + " DAYS",
            description: input.number_of_days + " DAYS",
            price: input.number_of_days * 40,
          },
        });
        console.log(sesh);
        return sesh.url;
      } catch (error) {
        console.log(error);
      }
    }),
  StripeAPI_TEST_Function: protectedProcedure
    // .input(
    //   z.object({

    //   }),
    // )
    .mutation(async ({ ctx, input }) => {
      console.log("COMMENCING STRIPE API TEST FUNCTION");

      const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
      try {
        const subscriptionSchedules = await stripe.subscriptionSchedules.list({
          customer: "cus_PtClBu3AijjyBV",
        });

        const subscriptions = await stripe.subscriptions.list({
          customer: "cus_PtClBu3AijjyBV",
        });

        const invoice = await stripe.invoices.retrieve(
          "in_1P3QOsJsSW6jGUhssrViXFII",
        );

        console.log(subscriptionSchedules);
        console.log(
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        );
        console.log(subscriptions);
        console.log(
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        );
        console.log(invoice);
        return "sesh.url";
      } catch (error) {
        console.log(error);
      }
    }),
});
