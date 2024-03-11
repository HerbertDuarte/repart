import { Trophy } from "lucide-react";

export function Header() {
  return (
    <header className="py-3 px-4 bg-white fixed flex justify-between items-center border-b border-zinc-100 w-full">
      <div className="flex gap-3 justify-center items-center">
        <Trophy className="text-orange-600" />
        <p className="text-2xl font-light text-zinc-500 pb-1">repart</p>
      </div>
    </header>
  );
}
