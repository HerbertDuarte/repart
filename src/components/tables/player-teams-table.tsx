import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type PlayerWithTeam = {
  player: string;
  team: string;
};

interface Props {
  result: PlayerWithTeam[];
  setResult: Dispatch<SetStateAction<PlayerWithTeam[]>>;
}
export function PlayerTeamsTable({ result, setResult }: Props) {
  function removeItem(index: number) {
    setResult((prev) => prev.filter((_, indexOf) => indexOf !== index));
  }
  return (
    <>
      <div className="border rounded w-full ">
        <div className="flex justify-between items-center border-b px-3 py-1 text-zinc-400 text-sm">
          <p className="w-1/3">jogador</p>
          <p className="w-1/3 text-center">Time</p>
          <p className="w-1/3 text-right">Ação</p>
        </div>

        {result?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-1.5 px-3 text-sm border-b font-medium"
          >
            <p className="w-1/3 ">{item.player}</p>
            <p className="w-1/3 text-center">{item.team}</p>
            <button
              onClick={() => removeItem(index)}
              className="w-1/3 text-right text-orange-500 text-sm hover:underline"
            >
              remover
            </button>
          </div>
        ))}
      </div>
      <Button onClick={()=> toast.error("Fazer tu não quer né? Então espera!")} className="my-4 mr-2">mata-mata</Button>
      {/* <Button className="my-4">grupos</Button> */}
      
    </>
  );
}
