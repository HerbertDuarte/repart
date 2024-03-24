import { BookText, GitCompareArrows, PercentSquare } from "lucide-react";
import { Button } from "./components/ui/button";
import { TeamForm } from "./components/forms/teams-form";
import { PlayerForm } from "./components/forms/player-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PlayerTeamsTable } from "./components/tables/player-teams-table";
import { MatchsTable } from "./components/tables/matchs-table";
import { Footer } from "./components/layout/footer";
import { Header } from "./components/layout/header";
import { Title } from "./components/ui/title";
import { StyledSection } from "./components/ui/styled-section";
import { Separator } from "./components/ui/separator";

type PlayerWithTeam = {
  player: string;
  team: string;
};

type Match = {
  player1: PlayerWithTeam;
  player2: PlayerWithTeam;
};

export default function App() {
  const [players, setPlayers] = useState<string[]>(
    JSON.parse(String(localStorage.getItem("players"))) || []
  );
  const [teams, setTeams] = useState<string[]>(
    JSON.parse(String(localStorage.getItem("teams"))) || []
  );
  const [result, setResult] = useState<PlayerWithTeam[]>(
    JSON.parse(String(localStorage.getItem("result"))) || []
  );
  const [matchs, setMatchs] = useState<Match[]>(
    JSON.parse(String(localStorage.getItem("matchs"))) || []
  );

  function definePlayerTeams() {
    if (teams.length !== players.length) {
      toast.error("O número de jogadores é diferente do número de times");
      return;
    }
    const playersTeams: PlayerWithTeam[] = [];
    const handleTeams = teams.sort(() => Math.random() - 0.5);

    players.forEach((player, index) => {
      const teamIndex = index % handleTeams.length;
      const team = handleTeams[teamIndex];
      playersTeams.push({ player, team });
    });

    setResult(playersTeams);
    scrollToBottom();
  }

  function defineMatchPlayers() {
    if (result.length < 2) {
      toast.error("Numero de times insuficiente!");
    }

    const randomPlayers = result.sort(() => Math.random() - 0.5);
    const playersMatchs: Match[] = [];
    for (let i = 0; i < randomPlayers.length; i += 2) {
      playersMatchs.push({
        player1: randomPlayers[i],
        player2: randomPlayers[i + 1],
      });
    }
    setMatchs(playersMatchs);
    scrollToBottom();
  }

  function scrollToBottom() {
    const delay = setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // Isso fará com que a rolagem seja suave
      });
    }, 500);
    clearTimeout(delay);
  }
  useEffect(() => {
    localStorage.setItem("matchs", JSON.stringify(matchs));
  }, [matchs]);

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(result));
  }, [result]);

  return (
    <>
      <Header />
      <main className="w-full flex-1 flex justify-start items-center flex-col pt-20 sm:pt-14 overflow-x-hidden">
        <StyledSection>
          <Title>
            <BookText className="text-primary" />
            Formulário
          </Title>
          <PlayerForm players={players} setPlayers={setPlayers} />
          <TeamForm teams={teams} setTeams={setTeams} />
          <Button className="my-4" onClick={() => definePlayerTeams()}>
            Repartir
          </Button>
        </StyledSection>
        {result.length > 0 && (
          <>
            <Separator />

            <StyledSection>
              <Title>
                <PercentSquare className="text-primary" />
                Repartição
              </Title>
              <PlayerTeamsTable result={result} setResult={setResult} />
              <Button
                onClick={() => defineMatchPlayers()}
                className="my-4 mr-2"
              >
                mata-mata
              </Button>
            </StyledSection>
          </>
        )}

        {matchs.length > 0 && (
          <>
            <Separator />

            <StyledSection>
              <Title>
                <GitCompareArrows className="text-primary" />
                Confrontos
              </Title>
              <MatchsTable matchs={matchs} setMatchs={setMatchs} />
            </StyledSection>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
