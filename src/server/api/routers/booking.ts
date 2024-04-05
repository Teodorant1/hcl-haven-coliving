import { date, z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import Stripe from "stripe";

export const bookingRouter = createTRPCRouter({
  // 1. send an invoice for the original duration,
  // 2. and send a bonus invoice once they check out
  // and 3. have overstayed their original duration

  RentRoom: protectedProcedure
    .input(
      z.object({
        roomNumber: z.string().min(1),
        duration: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("adding account");

      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        quantity: 10,
        // metadata: {
        //   shortdescription: "SUBSCRIPTIONZX 10 bucks test metadata INLINE ITEM",
        //   description: "SUBSCRIPTIONZX 10 bucks test metadata INLINE ITEM",
        //   GMAIL: ctx.session.user.email,
        // },
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
          metadata: {
            shortdescription: "SUBSCRIPTIONZ 10 bucks test metadata",
            description: "SUBSCRIPTIONZ 10 bucks test metadata",
            GMAIL: ctx.session.user.email,
          },

          // metadata: {
          //   shortdescription: "100 bucks test metadata",
          //   description: "100 bucks test metadata",
          // },
        });
        console.log(sesh);

        return sesh.url;
      } catch (error) {
        console.log(error);
      }

      //   await ctx.db.hCL_user.create({
      //     data: {
      //       email: input.email,
      //       username: input.email,
      //       password: hashedpassword,
      //     },
      //   });
    }),
  BuySubscription: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        packageName: z.number(),
        priceID: z.string().min(10),
        description: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("adding account");
      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        //price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        price: input.priceID,
        quantity: input.quantity,
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
          metadata: {
            description: input.description,
            packageName: input.packageName,
            priceID: input.priceID,
            quantity: input.quantity,
            gmail: ctx.session.user.email,
          },
        });
        await ctx.db.subscription.create({
          data: {
            userEmail: ctx.session.user.email,
            user_id: " ",
            subscriptionStatus: false,
            metadata: " ",
            price_id: line_item.price,
            quantity: input.quantity.toString(),
            cancel_at_period_end: false,
            created_at: new Date(),
            currentPeriod_start: new Date(),
            currentPeriod_end: new Date(),
            SessionID: sesh.id,
          },
        });
        console.log(sesh);
        return sesh.url;
      } catch (error) {
        console.log(error);
      }

      //   await ctx.db.hCL_user.create({
      //     data: {
      //       email: input.email,
      //       username: input.email,
      //       password: hashedpassword,
      //     },
      //   });
    }),

  StripeTest: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      console.log("adding account");

      const line_item = {
        //one time payment
        // price: "price_1P1uXaJsSW6jGUhsYiEo8ZbI",
        //subscription
        price: "price_1P2BUrJsSW6jGUhs29zRsnYW",
        quantity: 10,
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
          metadata: {
            shortdescription: "SUBSCRIPTIONZ 10 bucks test metadata",
            description: "SUBSCRIPTIONZ 10 bucks test metadata",
            GMAIL: ctx.session.user.email,
          },
        });

        console.log(sesh);

        return sesh.url;
      } catch (error) {
        console.log(error);
      }

      //   await ctx.db.hCL_user.create({
      //     data: {
      //       email: input.email,
      //       username: input.email,
      //       password: hashedpassword,
      //     },
      //   });
    }),
});
