'use client'

import MesaSidebar from "../components/MesaSidebar";
import Comanda from "../components/Comanda";
import { useState } from "react";

interface Mesa {
  id: number;
  comanda: string[];
}

export default function Home() {
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);

  return (
    <div className="flex h-screen">
      <MesaSidebar mesas={[]} onSelectMesa={setMesaSelecionada} />
      <Comanda mesa={mesaSelecionada} />
    </div>
  );
}
