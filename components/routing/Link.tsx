"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { ReactNode } from "react";

type Props = NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
  };

export default function Link({ href, children, ...props }: Props) {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}
