import { ReactNode } from "react";

type StyledSectionProps = {
  children: ReactNode;
};

export function StyledSection({ children }: StyledSectionProps) {
  return <div className="p-4 sm:p-8 pb-6 w-full max-w-3xl">{children}</div>;
}
