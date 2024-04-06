import Stripe from "stripe";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { StripeMetadata } from "projtect-types";

const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
});

const webhookSecret: string = process.env.NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();
  console.log(req);
  console.log(body);
  const sig = req.headers.get("stripe-signature")!;
  console.log(sig);
  try {
    const buf = await req.text();
    // const sig = req.headers.get("stripe-signature")!;
    let event: Stripe.Event;
    console.log("first try");
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log("2nd try");
    } catch (err) {
      console.log("first catch");
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 },
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);
    console.log("3rd try");
    // getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    console.log(subscription.customer);

    switch (event.type) {
      case "checkout.session.completed":
        // const eventString = event.object.toString();
        console.log(event);
        const eventID: string = event.id;
        const Stripe_Metadata = event.data.object.metadata!;
        console.log(Stripe_Metadata);

        await db.subscription.updateMany({
          where: {
            SessionID: event.id,
          },
          data: { subscriptionStatus: true },
        });

        console.log("4th try");

        //   await db.user.update({
        //     // Find the customer in our database with the Stripe customer ID linked to this purchase
        //     where: {
        //       stripeCustomerId: subscription.customer as string,
        //     },
        //     // Update that customer so their status is now active
        //     data: {
        //       isActive: true,
        //     },
        //   });

        //   await db.subscription.update({
        //     where: {
        //       SessionID: event.id,
        //     },
        //  data: {
        //   customerID: event.customer! as string
        //  }
        //   });

        break;
      case "customer.subscription.created":
        console.log("5th try");
        //   await db.user.update({
        //     // Find the customer in our database with the Stripe customer ID linked to this purchase
        //     where: {
        //       stripeCustomerId: subscription.customer as string,
        //     },
        //     // Update that customer so their status is now active
        //     data: {
        //       isActive: true,
        //     },
        //   });
        break;
      case "customer.subscription.deleted":
        console.log("6th try");
        await db.subscription.updateMany({
          where: {
            SessionID: event.id,
          },
          data: { subscriptionStatus: false },
        });

        //  await db.user.update({
        //    // Find the customer in our database with the Stripe customer ID linked to this purchase
        //    where: {
        //      stripeCustomerId: subscription.customer as string,
        //    },
        //    // Update that customer so their status is now active
        //    data: {
        //      isActive: false,
        //    },
        //  });
        break;
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true, status: 200 });
  } catch {
    console.log("7th try");

    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 },
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
