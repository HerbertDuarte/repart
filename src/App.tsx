import { Trophy } from "lucide-react";
import { Button } from "./components/ui/button";
import { TeamForm } from "./components/forms/teams-form";
import { PlayerForm } from "./components/forms/player-form";
import { useState } from "react";
import { toast } from "sonner";
import { PlayerTeamsTable } from "./components/tables/player-teams-table";

type PlayerWithTeam = {
  player: string;
  team: string;
};

export default function App() {
  const [players, setPlayers] = useState<string[] | []>([]);
  const [teams, setTeams] = useState<string[] | []>([]);
  const [result, setResult] = useState<PlayerWithTeam[] | []>([]);

  function matchPlayerTeams() {
    if (teams.length !== players.length) {
      toast.error("O número de jogadores é diferente do número de times");
      return;
    }
    const playersWithoutTeams: PlayerWithTeam[] = [];
    const handleTeams = teams.sort(() => Math.random() - 0.5);

    players.forEach((player, index) => {
      const teamIndex = index % handleTeams.length;
      const team = handleTeams[teamIndex];
      playersWithoutTeams.push({ player, team });
    });

    setResult(playersWithoutTeams);
  }

  return (
    <div className="flex flex-col min-h-dvh w-full justify-start items-center">
      <header className="p-4 bg-white fixed flex justify-between items-center border-b border-zinc-100 w-full">
        <div className="flex gap-3 justify-center items-center">
          <Trophy className="text-orange-600" />
          <p className="text-2xl font-light text-zinc-500 pb-1">repart</p>
        </div>
      </header>
      <main className="w-full flex-1 flex justify-start items-center flex-col pt-20 sm:pt-14">
        <div className="p-4 sm:p-8 pb-6 w-full max-w-2xl">
          <h1 className="pb-6 text-xl text-zinc-500 font-semibold">
            Formulário
          </h1>
          <PlayerForm players={players} setPlayers={setPlayers} />
          <TeamForm teams={teams} setTeams={setTeams} />

          <Button className="my-4" onClick={() => matchPlayerTeams()}>
            Repartir
          </Button>
        </div>
        {result.length > 0 && <div className="h-px w-screen bg-zinc-100" />}
        {result.length > 0 && (
          <div className="w-full p-4 sm:p-8 max-w-2xl">
            <h1 className="pb-6 text-xl text-zinc-500 font-semibold">
              Repartição
            </h1>
            <PlayerTeamsTable result={result} setResult={setResult} />
          </div>
        )}
      </main>
      <footer className="text-sm w-full text-center border-t border-zinc-100 bg-white p-0.5 text-zinc-400">
        <p>
          Site desenvolvido por{" "}
          <a
            target="_blank"
            className="font-medium text-orange-500 hover:underline"
            href="https://herbertduarte.vercel.app"
          >
            Herbert Duarte
          </a>
        </p>
      </footer>
    </div>
  );
}
