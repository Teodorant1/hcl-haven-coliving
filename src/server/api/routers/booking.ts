import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import Stripe from "stripe";
import { type StripeMetadata } from "projtect-types";

export const bookingRouter = createTRPCRouter({
  BuySubscription: protectedProcedure
    .input(
      z.object({
        // quantity: z.number(),
        // priceID: z.string().min(10),
        // description: z.string().min(10),
        packageName: z.string().min(1),
        method: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Buying subscription");
      const PackageToBeBought = await ctx.db.subscriptionPlans.findFirstOrThrow(
        {
          where: {
            packageName: input.packageName,
          },
        },
      );
      const stripeMetada: StripeMetadata = {
        description: PackageToBeBought.description,
        priceID: PackageToBeBought.priceID,
        price: PackageToBeBought.price,
        email: ctx.session.user.email,
        packageName: input.packageName,
        method: input.method,
      };
      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        //price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        price: PackageToBeBought.priceID,
        quantity: PackageToBeBought.price,
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
            quantity: PackageToBeBought.numberOfDays.toString(),
            cancel_at_period_end: false,
            created_at: new Date(),
            currentPeriod_start: new Date(),
            currentPeriod_end: new Date(),
            SessionID: sesh.id,
            priceID: PackageToBeBought.priceID,
            packageName: PackageToBeBought.packageName,
            description: PackageToBeBought.description,
            price: PackageToBeBought.price,
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Buying subscription");
      const PackageToBeBought = await ctx.db.subscriptionPlans.findFirstOrThrow(
        {
          where: {
            packageName: input.packageName,
          },
        },
      );
      const stripeMetada: StripeMetadata = {
        description: PackageToBeBought.description,
        priceID: PackageToBeBought.priceID,
        price: PackageToBeBought.price,
        email: ctx.session.user.email,
        packageName: input.packageName,
        method: input.method,
      };
      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        //price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        price: PackageToBeBought.priceID,
        quantity: PackageToBeBought.price,
      };
      const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
      try {
        const sesh = await stripe.checkout.sessions.create({
          mode: "payment",
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
            quantity: PackageToBeBought.numberOfDays.toString(),
            cancel_at_period_end: false,
            created_at: new Date(),
            currentPeriod_start: new Date(),
            currentPeriod_end: new Date(),
            SessionID: sesh.id,
            priceID: PackageToBeBought.priceID,
            packageName: PackageToBeBought.packageName,
            description: PackageToBeBought.description,
            price: PackageToBeBought.price,
          },
        });
        console.log(sesh);
        return sesh.url;
      } catch (error) {
        console.log(error);
      }
    }),
});
