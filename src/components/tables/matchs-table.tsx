import { Dispatch, SetStateAction } from "react";

type PlayerWithTeam = {
 player: string;
 team: string;
};

type Match = {
 player1: PlayerWithTeam;
 player2: PlayerWithTeam;
};

interface Props {
  matchs: Match[];
  setMatchs: Dispatch<SetStateAction<Match[]>>;
}
export function MatchsTable({ matchs, setMatchs }: Props) {
  function removeItem(index: number) {
    setMatchs((prev) => prev.filter((_, indexOf) => indexOf !== index));
  }
  return (
    <>
      <div className="border rounded-lg w-full overflow-hidden">
        <div className="flex justify-between items-center border-b px-3 py-1 text-zinc-400 text-sm">
          <p className="w-1/3">jogador 1</p>
          <p className="w-1/3 text-center">jogador 2</p>
          <p className="w-1/3 text-right">Ação</p>
        </div>

        {matchs?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-1.5 px-3 text-sm border-b font-medium"
          >
            <p className="w-1/3 ">{`${item.player1.player} (${item.player1.team})`}</p>
            <p className="w-1/3 text-center">{item.player2 ?`${item.player2.player} (${item.player2.team})` : <span className="text-green-500">biônico</span>}</p>
            <button
              onClick={() => removeItem(index)}
              className="w-1/3 text-right text-orange-500 text-sm hover:underline"
            >
              remover
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
