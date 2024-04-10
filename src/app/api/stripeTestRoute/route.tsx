import Stripe from "stripe";
import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { type StripeMetadata } from "project-types";

const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
});

const webhookSecret: string = process.env.NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // const body = await req.json();
  const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY!);
  console.log(req);
  // console.log(body);
  const sig = req.headers.get("stripe-signature")!;
  console.log(sig);
  const buf = await req.text();
  console.log(buf);
  try {
    console.log("zeroth try");
    // const buf = await req.text();
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
    console.log("event.type=" + event.type);
    switch (event.type) {
      case "checkout.session.completed":
        // const eventString = event.object.toString();
        console.log(event);
        const eventID: string = event.id;
        const Stripe_Metadata: StripeMetadata = event.data.object
          .metadata! as unknown as StripeMetadata;
        console.log(Stripe_Metadata.description);
        console.log(Stripe_Metadata.email);
        console.log(Stripe_Metadata.method);
        console.log(Stripe_Metadata.packageName);
        console.log(Stripe_Metadata.price);
        console.log(Stripe_Metadata.priceID);

        const customerID = subscription.customer;
        const subscriptionID = event.data.object.subscription;

        const subscription_in_stripe_db = await stripe.subscriptions.retrieve(
          subscriptionID as string,
        );

        const createdAtDate = new Date(subscription_in_stripe_db.created);

        const currentPeriod_startDate = new Date(
          subscription_in_stripe_db.current_period_start,
        );
        const currentPeriod_endDate = new Date(
          subscription_in_stripe_db.current_period_end,
        );
        // const ended_atDate = new Date(subscription_in_stripe_db.ended_at!);
        // const cancel_atDate = new Date(subscription_in_stripe_db.created);
        // const cancelled_atDate = new Date(subscription_in_stripe_db.created);

        await db.subscription.updateMany({
          where: {
            SessionID: event.data.object.id,
          },
          data: {
            subscriptionStatus: true,
            // might delete this in future version,
            //since metadata seems to be giving errors here
            // metadata: Stripe_Metadata,
            user_id: customerID as string,
            customerID: customerID as string,
            subscriptionID: subscriptionID as string,
            created_at: createdAtDate,
            currentPeriod_end: currentPeriod_endDate,
            currentPeriod_start: currentPeriod_startDate,
          },
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

        const customerId: string = event.data.object.customer as string;

        await db.subscription.updateMany({
          where: {
            user_id: customerId,
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
  } catch (errorX) {
    console.log("7th try");
    console.log(errorX);

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
