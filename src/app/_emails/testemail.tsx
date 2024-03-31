/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

export function EEmail(props: { url: any }) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
