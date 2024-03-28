import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  Addaccount: publicProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("adding account");

      const hashedpassword = await bcrypt.hash(input.password, 10);

      await ctx.db.hCL_user.create({
        data: {
          email: input.email,
          username: input.email,
          password: hashedpassword,
        },
      });

      return "ACCOUNT MADE";
    }),
  SendApplication: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1).email(),
        DateOfBirth: z.date(),
        gender: z.string().min(3),
        phoneNumber: z.string().min(3),
        DriverLicenseNumber: z.string().min(3),
        state: z.string().min(3),
        airline: z.string().min(3),
        AirlineEmployeeID: z.string().min(3),
        JobTitle: z.string().min(3),
        Airline_ID_Image: z.string().min(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("adding account");

      // const hashedpassword = await bcrypt.hash(input.password, 10);

      await ctx.db.hCL_user.create({
        data: {
          email: input.email,
          username: input.email,
          password: input.name,
        },
      });

      return "ACCOUNT MADE";
    }),
});
