import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface ApplicationNotificationUserEmailProps {
  username?: string;
  userImage?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
  inviteFromIp?: string;
  inviteFromLocation?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";

export const ApplicationNotificationUserEmail = ({
  invitedByUsername,
  invitedByEmail,
  inviteLink,
}: ApplicationNotificationUserEmailProps) => {
  //   const previewText = `Join ${invitedByUsername} on Vercel`;

  return (
    <Html>
      <Head />
      {/* <Preview>{previewText}</Preview> */}
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://rcprbmdrrmrvjubkxifr.supabase.co/storage/v1/object/public/images/tailwind-club-logo-last.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            {/* <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>{teamName}</strong> on <strong>Vercel</strong>
            </Heading> */}
            <Text className="text-[14px] leading-[24px] text-black">
              Hello Admin,
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              {/* <strong>{invitedByUsername}</strong> */}(
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has applied to your program at{" "}
              <strong className="ml-5">TailwindClub.org </strong>.
            </Text>
            <Section>
              {/* <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={userImage}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Img
                    src={`${baseUrl}/static/vercel-arrow.png`}
                    width="12"
                    height="9"
                    alt="invited you to"
                  />
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full"
                    src={teamImage}
                    width="64"
                    height="64"
                  />
                </Column>
              </Row> */}
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={"tailwindclub.org/Admin/ApplicationApprover"}
              >
                Check out recent applications
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={"tailwindclub.org/Admin/ApplicationApprover"}
                className="text-blue-600 no-underline"
              >
                {"https://www.tailwindclub.org/Admin/ApplicationApprover"}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            {/* <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{inviteFromIp}</span>{" "}
              located in{" "}
              <span className="text-black">{inviteFromLocation}</span>. If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account{"'"}s safety, please reply to
              this email to get in touch with us.
            </Text> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ApplicationNotificationUserEmail.PreviewProps = {
  username: "alanturing",
  userImage: `${baseUrl}/static/vercel-user.png`,
  invitedByUsername: "Alan",
  invitedByEmail: "alan.turing@example.com",
  teamName: "Enigma",
  teamImage: `${baseUrl}/static/vercel-team.png`,
  inviteLink: "https://vercel.com/teams/invite/foo",
  inviteFromIp: "204.13.186.218",
  inviteFromLocation: "São Paulo, Brazil",
} as ApplicationNotificationUserEmailProps;

export default ApplicationNotificationUserEmail;
