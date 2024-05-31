"use client";
import React from "react";
import { InnerApplication_form } from "@/components/component/InnerApplication_form";
import { useSession } from "next-auth/react";

const Application_Form = () => {
  const session = useSession();

  return <>{session.data?.isApproved === false && <InnerApplication_form />}</>;
};

export default Application_Form;
