import { get } from "@/modules/core/services/axios.service";

export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export const getPokemons = async (): Promise<PokemonCardData[]> => {
  try {
    const listResponse = await get<{
      results: { name: string; url: string }[];
    }>("/pokemon?limit=999");

    const pokemonPromises = listResponse.data.results.map(async (pokemon) => {
      const detailResponse = await get<any>(pokemon.url);

      return {
        id: detailResponse.data.id,
        name: detailResponse.data.name,
        image:
          detailResponse.data.sprites.other["official-artwork"].front_default,
        types: detailResponse.data.types.map((t: any) => t.type.name),
      };
    });

    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error("Oh, oh. No se ha podido al obtener los Pokémon:", error);
    throw new Error("No se pudieron cargar los Pokémon");
  }
};
