/* eslint-disable @typescript-eslint/prefer-for-of */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import Stripe from "stripe";
import { type StripeMetadata } from "project-types";
import {
  GetGuestDetails,
  get_unassigned_rooms,
  getGendered_rooms,
  get_available_room_types,
  book_a_room,
  getReservations,
  GetStatusOfSubcsription,
} from "utilitiesBackend";
import { type recentReservations } from "project-types";

export const bookingRouter = createTRPCRouter({
  BuySubscription: protectedProcedure
    .input(
      z.object({
        method: z.string().min(1),
        number_of_days: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.isApproved !== true) {
        return null;
      }

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

        // Create a Date object for the current day
        const currentDate = new Date();

        // Create a Date object for 30 days ahead
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);

        console.log(currentDate.toDateString());
        console.log(futureDate.toDateString());

        await ctx.db.subscription.upsert({
          where: { userEmail: ctx.session.user.email },
          update: {
            userEmail: ctx.session.user.email,
            user_id: " ",
            // subscriptionStatus: false,
            metadata: " ",
            price_id: line_item.price,
            // number of days
            NumberOfBoughtDays: input.number_of_days,
            cancel_at_period_end: false,
            created_at: currentDate,
            currentPeriod_start: currentDate,
            currentPeriod_end: futureDate,
            SessionID: sesh.id,
            priceID: "price_1P3OGbJsSW6jGUhshqmG2tYP",
            packageName: input.number_of_days + " DAYS",
            description: input.number_of_days + " DAYS",
            price: input.number_of_days * 40,
          },
          create: {
            userEmail: ctx.session.user.email,
            user_id: " ",
            subscriptionStatus: false,
            metadata: " ",
            price_id: line_item.price,
            // number of days
            NumberOfBoughtDays: input.number_of_days,
            cancel_at_period_end: false,
            created_at: currentDate,
            currentPeriod_start: currentDate,
            currentPeriod_end: futureDate,
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
        packageName: z.string().min(1),
        method: z.string().min(1),
        number_of_days: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Buying subscription");

      if (ctx.session.user.isApproved !== true) {
        return null;
      }

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
          mode: "subscription",
          payment_method_types: ["card", "us_bank_account"],
          line_items: [line_item],
          success_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/SUCCESS",
          cancel_url: process.env.NEXT_PUBLIC_VERCEL_URL! + "/FAIL",
          metadata: stripeMetada,
        });
        await ctx.db.subscription.upsert({
          where: { userEmail: ctx.session.user.email },
          update: {
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
          create: {
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
  StripeAPI_TEST_Function: protectedProcedure.mutation(
    async ({ ctx, input }) => {
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
    },
  ),
  cloudbedsTest1: protectedProcedure.mutation(async ({ ctx, input }) => {
    console.log("commencingcbtest");
    console.log("ctx.session");
    console.log(ctx.session);
    const guestDetails = await GetGuestDetails(309910, 102139710);

    console.log("guestDetails is, as follows");
    console.log(guestDetails);

    console.log(guestDetails.data.email);
  }),
  GetSubscription: protectedProcedure.query(async ({ ctx, input }) => {
    const subscription = await GetStatusOfSubcsription(ctx.session.user.email);
    // const subscription = await GetStatusOfSubcsription(
    //   "ctx.session.user.email",
    // );
    return subscription;
  }),
  // in this method we need to add a user to a room, and
  // if the user doesn't exist, add them to cloudbeds table
  // ( ours and cloudbeds db)
  // 1. send reservation to CB , 1.5 check if webhook does something
  // 2. add or update CB tables on our side 3. mark room as used for that period
  Get_AvailableRooms_From_Cloudbeds: protectedProcedure.query(
    async ({ ctx, input }) => {
      console.log("fetching empty rooms");
      const unassigned_rooms = await get_unassigned_rooms([309910]);
      const gendered_rooms = await getGendered_rooms(unassigned_rooms);
      console.log("returning empty rooms");
      return gendered_rooms;
    },
  ),
  Get_Room_Types_From_Cloudbeds: protectedProcedure
    .input(
      z.object({
        propertyIDs: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log("fetching available room types");

      const availableRooms = await get_available_room_types(
        input.propertyIDs,
        input.startDate,
        input.endDate,
      );
      console.log("availableRooms are as follows");
      return availableRooms;
    }),

  getReservations_forAdmin: protectedProcedure.query(async ({ ctx, input }) => {
    if (ctx.session.user.isAdmin) {
      const reservations = await getReservations();

      return reservations;
    }
  }),
  getMyReservations: protectedProcedure.query(async ({ ctx, input }) => {
    if (ctx.session.user.isApproved) {
      const MyReservations = await ctx.db.cloudbeds_reservation.findMany({
        where: { email: ctx.session.user.email },
        orderBy: {
          check_in: "desc",
        },
      });

      const MyReservationsPackaged: recentReservations = {
        success: true,
        data: MyReservations,
      };

      return MyReservationsPackaged;
    }
  }),

  Update_all_reservations: protectedProcedure
    .input(
      z.object({
        propertyID: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.isApproved === false) {
        return null;
      }

      // const single_res = await get_singular_reservation("1491069549319");
      // console.log(single_res);
      // console.log(single_res.data.balance);
      // console.log(single_res.data.guestEmail);
      // console.log(single_res.data.dateCreated);
      // console.log(single_res.data.startDate);
      // console.log(single_res.data.endDate);

      const AllReservations = await ctx.db.cloudbeds_reservation.findMany({});

      for (let i = 0; i < AllReservations.length; i++) {
        AllReservations[i]!.TotalPrice = i + 1 * 10;
        AllReservations[i]!.email = ctx.session.user.email;
        AllReservations[i]!.reservation_id = i + "alkfjhsasdf" + i;
        AllReservations[i]!.id = i + "alkfjhsasdf" + i;
        console.log("updating " + i);
        await ctx.db.cloudbeds_reservation.create({
          data: AllReservations[i]!,
        });
      }

      return 0;
    }),

  Book_a_room: protectedProcedure
    .input(
      z.object({
        propertyID: z.number(),
        startDate: z.date(),
        endDate: z.date(),
        roomTypeID: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.isApproved === false) {
        return null;
      }
      const reservationResponse = await book_a_room(
        309910,
        input.startDate,
        input.endDate,
        ctx.session.user.email,
        input.roomTypeID,
        ctx.session.user.fullname,
      );

      return reservationResponse;
    }),
});
