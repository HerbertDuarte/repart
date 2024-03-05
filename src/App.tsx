import { Trophy } from "lucide-react";
import { Button } from "./components/ui/button";
import { TeamForm } from "./components/forms/teams-form";
import { PlayerForm } from "./components/forms/player-form";
import { useState } from "react";
import { toast } from "sonner";

type PlayerWithTeam = {
  player: string;
  team: string;
};

export default function App() {
  const [players, setPlayers] = useState<string[] | []>([]);
  const [teams, setTeams] = useState<string[] | []>([]);
  const [result, setResult] = useState<PlayerWithTeam[]>();

  function matchPlayerTeams() {
    if (teams.length !== players.length) {
      toast.error("O número de jogadores é diferente do número de times")
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
    <div className="flex flex-col h-dvh w-full justify-center items-center">
      <header className="p-4 flex justify-between items-center border-b w-full">
        <div className="flex gap-3 justify-center items-center">
          <Trophy className="text-orange-600" />
          <p className="text-2xl pb-1">repart</p>
        </div>
      </header>
      <main className="flex-1 p-10 w-full">
        <PlayerForm players={players} setPlayers={setPlayers} />
        <TeamForm teams={teams} setTeams={setTeams} />

        <Button onClick={() => matchPlayerTeams()}>Generate</Button>
      </main>
      <div>
        <pre>
        {JSON.stringify(result)}
        </pre>
      </div>
    </div>
  );
}
