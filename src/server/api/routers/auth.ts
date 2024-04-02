import { z } from "zod";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { EEmail } from "@/app/_emails/testemail";

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
        DateOfBirth: z.date(),
        gender: z.string().min(2),
        phoneNumber: z.string().min(2),
        DriverLicenseNumber: z.string().min(2),
        state: z.string().min(2),
        airline: z.string().min(2),
        AirlineEmployeeID: z.string().min(2),
        JobTitle: z.string().min(2),
        Airline_ID_Image: z.string().min(2),
        Emergency_Contact_Name: z.string().min(2),
        Emergency_Contact_PhoneNumber: z.string().min(2),
        Emergency_Contact_Relationship: z.string().min(2),
        RefferedBy: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.hCL_Application.create({
        data: {
          name: input.name,
          email: ctx.session.user.email,
          DateOfBirth: input.DateOfBirth,
          gender: input.gender,
          phoneNumber: input.phoneNumber,
          DriverLicenseNumber: input.DriverLicenseNumber,
          state: input.state,
          airline: input.airline,
          AirlineEmployeeID: input.AirlineEmployeeID,
          JobTitle: input.JobTitle,
          Airline_ID_Image: input.Airline_ID_Image,
          Emergency_Contact_Name: input.Emergency_Contact_Name,
          Emergency_Contact_PhoneNumber: input.Emergency_Contact_PhoneNumber,
          Emergency_Contact_Relationship: input.Emergency_Contact_Relationship,
          RefferedBy: input.RefferedBy,
        },
      });

      const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);

      void resend.emails.send({
        from: "Acme <onboarding@e.tailwindclub.org>",
        //  to: "delivered@resend.dev",
        //  to: "robert@havencoliving.com",
        to: ctx.session.user.email,
        subject: "SUCCESFUL APPLICATION!",
        // react:  typeof <EEmail   /> ,
        html: "<p>You have <strong>successfully sent</str ong>  in your first application !</p>",
      });

      return "application submitted";
    }),

  Approve_Account: protectedProcedure
    .input(
      z.object({
        userEmail: z.string().min(1).email(),
        applicationID: z.string().min(1),
        isApproved: z.boolean(),
        //  isReviewed: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.hCL_Application.update({
        where: {
          id: input.applicationID,
        },
        data: {
          isApproved: input.isApproved,
          isReviewed: true,
        },
      });

      await ctx.db.hCL_user.update({
        where: {
          email: input.userEmail,
        },
        data: {
          isApproved: input.isApproved,
        },
      });

      return "approval done!";
    }),

  Get_applicants_for_approval: protectedProcedure.query(
    async ({ ctx, input }) => {
      // only the admin gets access to this procedure
      if (ctx.session.user.isAdmin === true) {
        const applications_to_review = await ctx.db.hCL_Application.findMany({
          where: {
            isApproved: false,
            isReviewed: false,
          },
        });

        return applications_to_review;
      }

      // adding this so that TRPC doesn't give me errors
      // const emptyarray: HCL_Application[] = [];
      // return emptyarray;
    },
  ),

  getImprovSession: protectedProcedure.query(async ({ ctx, input }) => {
    const adhocSession = await ctx.db.hCL_user.findFirst({
      where: {
        email: ctx.session.user.email,
      },
      select: {
        email: true,
        isAdmin: true,
        isApproved: true,
      },
    });

    if (adhocSession) {
      return adhocSession;
    } else {
      await ctx.db.hCL_user.create({
        data: {
          email: ctx.session.user.email,
          username: ctx.session.user.email,
        },
      });
      const newlyMadeSession = await ctx.db.hCL_user.findFirst({
        where: {
          email: ctx.session.user.email,
        },
        // select: {
        //   email:           true,
        //   isAdmin:            true,
        //   isApproved:                true,
        // },
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const hashedpassword = await bcrypt.hash(newlyMadeSession?.password!, 10);

      await ctx.db.hCL_user.update({
        where: {
          email: newlyMadeSession?.email,
        },
        data: {
          password: hashedpassword,
        },
      });

      const newlyMadeSessionRedux = {
        email: newlyMadeSession?.email,
        isAdmin: newlyMadeSession?.isAdmin,
        isApproved: newlyMadeSession?.isApproved,
      };

      return newlyMadeSessionRedux;
    }
  }),
});
