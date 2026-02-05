import { Button } from "@/components/ui/button";
import SadPokemon from "@/assets/sad_pokemon.png";

interface Props {
  onRetry: () => void;
}

export const ErrorState = ({ onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-6 text-center">
      <img src={SadPokemon} alt="Error" className="w-40 h-40 opacity-80" />

      <div className="space-y-2">
        <p className="text-lg font-semibold text-red-500">
          No pudimos cargar los Pokémon
        </p>
        <p className="text-sm text-muted-foreground">
          Revisa tu conexión e inténtalo de nuevo
        </p>
      </div>

      <Button onClick={onRetry}>Reintentar</Button>
    </div>
  );
};
