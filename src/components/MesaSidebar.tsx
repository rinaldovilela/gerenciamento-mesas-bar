import { useEffect, useState } from 'react';

export default function MesaSidebar({ onSelectMesa }) {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/mesas')
      .then(response => response.json())
      .then(data => setMesas(data));
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Mesas</h2>
      <ul>
        {mesas.map(mesa => (
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
