import { useState } from "react";
import Header, { type Filters } from "./components/custom/Header";
import { PokemonGrid } from "@/components/custom/PokemonGrid";

function App() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    types: [],
    not: false,
  });

  return (
    <main className="min-h-screen bg-background">
      <Header onChange={setFilters} />
      <PokemonGrid filters={filters} />
    </main>
  );
}

export default App;
