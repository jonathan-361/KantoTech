import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface Filters {
  search: string;
  types: string[];
  not: boolean;
}

interface Props {
  onChange: (filters: Filters) => void;
}

const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function Header({ onChange }: Props) {
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [not, setNot] = useState(false);

  const emit = (
    next: Partial<{ search: string; types: string[]; not: boolean }>,
  ) => {
    onChange({
      search,
      types,
      not,
      ...next,
    });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-black text-white border-b border-neutral-800">
      <div className="flex items-center justify-between px-6 py-4 gap-6">
        <h1 className="text-xl font-bold tracking-wide">Kanto Tech</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Nombre o número (#25)"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              emit({ search: value });
            }}
            className="w-56 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400"
          />

          <Select
            value={types[0] ?? "all"}
            onValueChange={(value) => {
              const newTypes = value === "all" ? [] : [value];
              setTypes(newTypes);
              emit({ types: newTypes });
            }}
          >
            <SelectTrigger className="w-44 bg-neutral-900 border-neutral-700 text-white">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>

            <SelectContent className="bg-neutral-900 border-neutral-700 text-white">
              <SelectItem value="all" className="focus:bg-neutral-800">
                ALL
              </SelectItem>

              {ALL_TYPES.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="focus:bg-neutral-800"
                >
                  {type.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={not}
              onCheckedChange={(checked) => {
                const value = !!checked;
                setNot(value);
                emit({ not: value });
              }}
              className="border-neutral-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <span className="text-sm">NOT</span>
          </div>
        </div>
      </div>
    </header>
  );
}
