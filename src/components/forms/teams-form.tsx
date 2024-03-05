import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

type Props = {
  teams: string[];
  setTeams: Dispatch<SetStateAction<[] | string[]>>;
};

export function TeamForm({ teams, setTeams }: Props) {
  const form = useForm();
  const handleSubmit = form.handleSubmit((data) => {
    setTeams((prev) => [...prev, data.Team]);
    form.setValue("Team", "");
  });

  function removeItem(index: number) {
    setTeams((prev) => prev.filter((_, indexOf) => indexOf !== index));
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-end gap-2 w-full max-w-lg">
          <Label className="text-sm font-medium text-zinc-600 flex-1">
            Team 1
            <Input
              {...form.register("Team")}
              className="placeholder:text-zinc-300 placeholder:font-normal outline-none"
              placeholder="Team 1"
              type="text"
              id="Team"
            />
          </Label>
          <Button>Add</Button>
        </div>
      </form>

      <div className="py-3 space-y-3 max-w-lg">
        {teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center">
            <label
              htmlFor="terms"
              className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <p>{team}</p>
            </label>
            <button
              onClick={() => removeItem(index)}
              className="text-orange-600 font-medium hover:underline"
            >
              remover
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
