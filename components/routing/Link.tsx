"use client";

import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function Link({ href, ...props }: Props) {
  return <NextLink href={href} {...props} />;
}
