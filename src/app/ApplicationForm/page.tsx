"use client";
import React from "react";
import { InnerApplication_form } from "@/components/component/InnerApplication_form";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
const Application_Form = () => {
  const session = useSession();
  const has_already_applied =
    api.auth.check_if_user_has_already_applied.useQuery();

  return (
    <>
      {session.data?.isApproved === false &&
        has_already_applied.data === false && <InnerApplication_form />}
    </>
  );
};

export default Application_Form;
