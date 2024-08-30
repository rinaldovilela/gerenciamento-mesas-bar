import MesaSidebar from "../components/MesaSidebar";
import Comanda from "../components/Comanda";
import { useState } from "react";

export default function Home() {
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  return (
    <div className="flex h-screen">
      <MesaSidebar onSelectMesa={setMesaSelecionada} />
      <Comanda mesa={mesaSelecionada} />
    </div>
  );
}
