import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { PlayerTable } from "../tables/player-table";

type Props = {
  players: string[];
  setPlayers: Dispatch<SetStateAction<[] | string[]>>;
};

export function PlayerForm({ players, setPlayers }: Props) {
  const form = useForm();
  const handleSubmit = form.handleSubmit((data) => {
    if (data.player === "") {
      toast.error("Preencha o campo <nome do jogador>");
      return;
    }
    setPlayers((prev) => [...prev, data.player]);
    form.setValue("player", "");
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <>
      <form className="pb-4" onSubmit={handleSubmit}>
        <div className="flex justify-center items-end gap-2 w-full">
          <Input
            {...form.register("player")}
            className="placeholder:text-zinc-300 placeholder:font-normal outline-none"
            placeholder="nome do jogador"
            type="text"
            id="player"
          />
          <Button>Add</Button>
        </div>
      </form>

      {players.length > 0 && (
        <PlayerTable players={players} setPlayers={setPlayers} />
      )}
    </>
  );
}
