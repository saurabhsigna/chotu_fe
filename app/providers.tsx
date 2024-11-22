"use client";
import { ReactNode } from "react";
type Props = {
  children?: ReactNode;
};
export const Providers = ({ children }: Props) => {
  return <div>{children}</div>;
};
