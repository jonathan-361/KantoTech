import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type PokemonCardData } from "@/modules/core/services/pokemon.service";

interface Props {
  pokemon: PokemonCardData;
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const formatId = (id: number) => `#${id.toString().padStart(3, "0")}`;

const typeColors: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-400",
  fighting: "bg-orange-600",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-sky-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-indigo-500",
  dragon: "bg-violet-600",
  dark: "bg-neutral-700",
  steel: "bg-gray-400",
  fairy: "bg-rose-400",
};

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <Card className="hover:scale-105 transition-transform">
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          loading="lazy"
          className="w-32 h-32 object-contain"
        />

        <span className="text-sm text-muted-foreground">
          {formatId(pokemon.id)}
        </span>

        <h3 className="text-lg font-bold">{capitalize(pokemon.name)}</h3>

        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <Badge key={type} className={`${typeColors[type]} text-white`}>
              {capitalize(type)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
