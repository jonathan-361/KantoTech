import { useEffect, useRef, useState } from "react";
import {
  getPokemons,
  type PokemonCardData,
} from "@/modules/core/services/pokemon.service";
import { PokemonCard } from "./PokemonCard";
import { ErrorState } from "@/components/custom/ErrorState";

export const PokemonGrid = () => {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mounted = useRef(false);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(false);

      const data = await getPokemons();
      setPokemons(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    loadPokemons();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Cargando Pokémon...
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={loadPokemons} />;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
        gap-4
        p-4
      "
    >
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
