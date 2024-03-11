import { ReactNode } from "react";

type TitleProps = {
 children : ReactNode
}

export function Title({children} : TitleProps) {
  return (
    <h1 className="pb-6 text-xl text-zinc-500 font-semibold flex items-center gap-2">
     {children}
    </h1>
  );
}
