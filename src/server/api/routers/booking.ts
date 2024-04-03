import { z } from "zod";
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

      const storeItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: "1 room",
          },
          unit_amount: input.duration * 1000,
          quantity: input.duration,
        },
      };

      const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
      try {
        const session = stripe.checkout.sessions.create({
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          success_url: "www.tailwindclub.org/succesfulpayment",
          cancel_url: "www.tailwindclub.org/cancelledpayment",
          line_items: [storeItem],
        });
        console.log(session);
        const sesh_url: string = (await session).url!;

        return { url: sesh_url };
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

      return { url: "sesh_url_failed" };
    }),
});
