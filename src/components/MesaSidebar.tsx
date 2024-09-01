// src/components/MesaSidebar.tsx

import React, { useEffect, useState } from 'react';

interface Mesa {
  id: number;
  comanda: any[];
}

interface MesaSidebarProps {
  onSelectMesa: (mesa: Mesa) => void;
}

const MesaSidebar: React.FC<MesaSidebarProps> = ({ onSelectMesa }) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/mesas')
      .then((response) => response.json())
      .then((data) => setMesas(data))
      .catch((error) => console.error('Erro ao carregar mesas:', error));
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Mesas</h2>
      <ul>
        {mesas.map((mesa) => (
          <li
            key={mesa.id}
            className="cursor-pointer mb-2 p-2 bg-white rounded shadow hover:bg-gray-200"
            onClick={() => onSelectMesa(mesa)}
          >
            Mesa {mesa.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MesaSidebar;
