'use client'

import React, { useState } from 'react';
import MesaSidebar from '../components/MesaSidebar';
import Comanda from '../components/Comanda';

interface Mesa {
  id: number;
  comanda: any[];
}

const Home: React.FC = () => {
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);

  return (
    <div className="flex h-screen  shadow-lg">
      <MesaSidebar onSelectMesa={setMesaSelecionada} />
      <Comanda mesa={mesaSelecionada} />
    </div>
  );
};

export default Home;
