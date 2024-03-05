import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { TeamTable } from "../tables/team-table";

type Props = {
  teams: string[];
  setTeams: Dispatch<SetStateAction<[] | string[]>>;
};

export function TeamForm({ teams, setTeams }: Props) {
  const form = useForm();
  const handleSubmit = form.handleSubmit((data) => {
    if (data.team === "") {
      toast.error("Preencha o campo <nome do time>");
      return;
    }
    setTeams((prev) => [...prev, data.team]);
    form.setValue("team", "");
  });

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex justify-center items-end gap-2 w-full">
          <Input
            {...form.register("team")}
            className="placeholder:text-zinc-300 placeholder:font-normal outline-none"
            placeholder="nome do time"
            type="text"
            id="Team"
          />

          <Button>Add</Button>
        </div>
      </form>

      {teams.length > 0 && <TeamTable setTeams={setTeams} teams={teams} />}
    </>
  );
}
