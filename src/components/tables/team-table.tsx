import { Dispatch, SetStateAction } from "react";

interface Props {
  teams: string[] | [];
  setTeams: Dispatch<SetStateAction<string[]>>;
}

export function TeamTable({ teams, setTeams }: Props) {

 
 function removeItem(index: number) {
  setTeams((prev) => prev.filter((_, indexOf) => indexOf !== index));
}
  return (
    <div className="border mt-4 rounded">
      <div className="flex justify-between items-center border-b py-1 px-3">
        <p className="text-zinc-400 text-sm">Time</p>
        <p className="text-zinc-400 text-sm">Ação</p>
      </div>
      {teams.map((team, index) => (
        <div
          key={index}
          className="flex justify-between items-center  border-b py-1.5 px-3"
        >
          <p className="text-sm font-medium">{team}</p>

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
