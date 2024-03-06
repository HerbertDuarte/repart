import { Dispatch, SetStateAction } from "react";

interface Props {
  players: string[];
  setPlayers: Dispatch<SetStateAction<string[]>>;
}

export function PlayerTable({ players, setPlayers }: Props) {
  function removeItem(index: number) {
    setPlayers((prev) => prev.filter((_, indexOf) => indexOf !== index));
  }
  return (
    <div className="border mb-4  rounded-lg overflow-hidden">
      <div className="flex justify-between items-center border-b py-1 px-3">
        <p className="text-zinc-400 text-sm">Jogador</p>
        <p className="text-zinc-400 text-sm">Ação</p>
      </div>
      {players.map((player, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-1.5 px-3"
        >
          <p className="text-sm font-medium">{player}</p>

          <button
            onClick={() => removeItem(index)}
            className="text-orange-600 font-medium hover:underline text-sm"
          >
            remover
          </button>
        </div>
      ))}
    </div>
  );
}
