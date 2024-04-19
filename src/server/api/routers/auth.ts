import { z } from "zod";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import ApplicationSubmitUserEmail from "@/app/_emails/SubmitApplication";
import ApplicationNotificationUserEmail from "@/app/_emails/AdminApplicationNotification";
import ApplicationResponseEmail from "@/app/_emails/ApplicationResponse";

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
      // const userImage = ctx.session.user.image
      //   ? ctx.session.user.image
      //   : "https://www.horizonhobby.com/dw/image/v2/BFBR_PRD/on/demandware.static/-/Sites-horizon-master/default/dw33814fc6/Images/HBZ/HBZ32500_A0_IEBDEEFI.jpg?sw=800&sh=800&sm=fit";

      await resend.emails.send({
        from: "Acme <onboarding@e.tailwindclub.org>",
        //  to: "robert@havencoliving.com",
        to: ctx.session.user.email,
        subject: "You have applied to Tailwind-Club!",
        react: ApplicationSubmitUserEmail({
          username: ctx.session.user.email,
          userImage: ctx.session.user.image
            ? ctx.session.user.image
            : "https://www.horizonhobby.com/dw/image/v2/BFBR_PRD/on/demandware.static/-/Sites-horizon-master/default/dw33814fc6/Images/HBZ/HBZ32500_A0_IEBDEEFI.jpg?sw=800&sh=800&sm=fit",
          invitedByUsername: "3",
          invitedByEmail: "paloki@gmail.com",
          teamName: "PalokiTeam",
          teamImage:
            "https://rcprbmdrrmrvjubkxifr.supabase.co/storage/v1/object/public/images/tailwind-club-logo-last.png",
          inviteLink: "/invitelink",
          inviteFromIp: "inviteFromIp",
          inviteFromLocation: "inviteFromLocation",
        }),
      });

      await resend.emails.send({
        from: "Acme <onboarding@e.tailwindclub.org>",
        //  to: "robert@havencoliving.com",
        to: process.env.NEXT_PRIVATE_ADMIN_EMAIL!,
        subject: "A new person applied to the TailwindClub program!",
        react: ApplicationNotificationUserEmail({
          invitedByUsername: ctx.session.user.email,
          invitedByEmail: ctx.session.user.email,
          inviteLink: "/ApplicationApprover",
        }),
      });
      // await resend.emails.send({
      //   from: "Acme <onboarding@e.tailwindclub.org>",
      //   to: "obama@gmail.com",
      //   //to: process.env.NEXT_PRIVATE_ADMIN_EMAIL!,
      //   subject: "A new person applied to the TailwindClub program!",
      //   react: ApplicationNotificationUserEmail({
      //     invitedByUsername: ctx.session.user.email,
      //     invitedByEmail: ctx.session.user.email,
      //     inviteLink: "/ApplicationApprover",
      //   }),
      // });

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

      const resend = new Resend(process.env.NEXT_PRIVATE_RESEND_API_KEY);

      await resend.emails.send({
        from: "Acme <onboarding@e.tailwindclub.org>",
        //  to: "robert@havencoliving.com",
        to: input.userEmail,
        subject: "You have applied to Tailwind-Club!",
        react: ApplicationResponseEmail({
          username: ctx.session.user.email,

          invitedByUsername: "3",
          invitedByEmail: "paloki@gmail.com",
          teamName: "PalokiTeam",
          teamImage:
            "https://rcprbmdrrmrvjubkxifr.supabase.co/storage/v1/object/public/images/tailwind-club-logo-last.png",
          inviteLink: "/invitelink",
          inviteFromIp: "inviteFromIp",
          inviteFromLocation: "inviteFromLocation",
        }),
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
});
