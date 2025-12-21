"use client";

import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { withBasePath } from "@/lib/linkBasePath";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function Link({ href, ...props }: Props) {
  const resolvedHref =
    typeof href === "string" ? withBasePath(href) : href;

  return <NextLink href={resolvedHref} {...props} />;
}
