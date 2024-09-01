import { useEffect, useState } from 'react';

interface Mesa {
  id: number;
  comanda: string[];
}

interface MesaSidebarProps {
  mesas: Mesa[];
  onSelectMesa: (mesa: Mesa) => void;
}

const MesaSidebar: React.FC<MesaSidebarProps> = ({ mesas: propMesas, onSelectMesa }) => {
  const [mesas, setMesas] = useState<Mesa[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/mesas')
      .then(response => response.json())
      .then(data => setMesas(data));
  }, []);

  // Use propMesas to render the list if you want to use the prop instead of the fetched data
  const mesasToRender = propMesas.length > 0 ? propMesas : mesas;

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Mesas</h2>
      <ul>
        {mesasToRender.map(mesa => (
          <li
            key={mesa.id}
            className="cursor-pointer mb-2 p-2 bg-white rounded shadow"
            onClick={() => onSelectMesa(mesa)}
          >
            Mesa {mesa.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MesaSidebar;
