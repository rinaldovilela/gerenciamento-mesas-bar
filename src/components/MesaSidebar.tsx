// // src/components/MesaSidebar.tsx
// import React, { useEffect, useState } from 'react';

// interface Mesa {
//   id: number;
//   comanda: any[];
// }

// interface MesaSidebarProps {
//   onSelectMesa: (mesa: Mesa) => void;
// }

// const MesaSidebar: React.FC<MesaSidebarProps> = ({ onSelectMesa }) => {
//   const [mesas, setMesas] = useState<Mesa[]>([]);
//   const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/mesas')
//       .then(response => response.json())
//       .then(data => setMesas(data))
//       .catch(error => console.error('Erro ao carregar mesas:', error));
//   }, []);

//   const adicionarMesa = () => {
//     fetch('http://localhost:5000/mesas', {
//       method: 'POST',
//     })
//     .then(response => response.json())
//     .then(novaMesa => {
//       setMesas([...mesas, novaMesa]);
//     })
//     .catch(error => console.error('Erro ao adicionar mesa:', error));
//   };

//   const deletarMesa = (id: number) => {
//     fetch(`http://localhost:5000/mesas`, {
//       method: 'DELETE',
//     })
//     .then(response => {
//       if (response.ok) {
//         setMesas(mesas.filter(mesa => mesa.id !== id));
//         if (mesaSelecionada?.id === id) {
//           setMesaSelecionada(null);
//         }
//       } else {
//         console.error('Erro ao deletar mesa');
//       }
//     })
//     .catch(error => console.error('Erro ao deletar mesa:', error));
//   };

//   return (
//     <div className="w-1/4 bg-gray-200 p-4">
//       <h2 className="text-lg font-bold mb-4">Mesas</h2>
//       <ul>
//         {mesas.map(mesa => (
//           <li
//             key={mesa.id}
//             className="cursor-pointer p-2 hover:bg-gray-300"
//             onClick={() => setMesaSelecionada(mesa)}
//           >
//             Mesa {mesa.id}
//           </li>
//         ))}
//       </ul>
//       <button 
//         onClick={adicionarMesa} 
//         className="mt-4 p-2 bg-blue-500 text-white rounded"
//       >
//         Adicionar Mesa
//       </button>
//       {mesaSelecionada && (
//         <button 
//           onClick={() => deletarMesa(mesaSelecionada.id)} 
//           className="mt-4 p-2 bg-red-500 text-white rounded"
//         >
//           Deletar Mesa
//         </button>
//       )}
//     </div>
//   );
// };

// export default MesaSidebar;
// src/components/MesaSidebar.tsx
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
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/mesas')
      .then(response => response.json())
      .then(data => setMesas(data))
      .catch(error => console.error('Erro ao carregar mesas:', error));
  }, []);

  const adicionarMesa = () => {
    fetch('http://localhost:5000/mesas', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(novaMesa => {
      setMesas([...mesas, novaMesa]);
    })
    .catch(error => console.error('Erro ao adicionar mesa:', error));
  };

  const deletarMesa = (id: number) => {
    fetch(`http://localhost:5000/mesas/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setMesas(mesas.filter(mesa => mesa.id !== id));
        if (mesaSelecionada?.id === id) {
          setMesaSelecionada(null);
        }
      } else {
        console.error('Erro ao deletar mesa');
      }
    })
    .catch(error => console.error('Erro ao deletar mesa:', error));
  };

  const handleMesaClick = (mesa: Mesa) => {
    setMesaSelecionada(mesa);
    onSelectMesa(mesa);
  };

  return (
    <div className="w-1/4 bg-#3498db p-4">
      <h2 className="text-lg font-bold mb-4">Mesas</h2>
      <ul>
        {mesas.map(mesa => (
          <li
            key={mesa.id}
            className={`cursor-pointer p-2 ${mesaSelecionada?.id === mesa.id ? 'bg-gray-400' : 'hover:bg-gray-300'}`}
            onClick={() => handleMesaClick(mesa)}
          >
            Mesa {mesa.id}
          </li>
        ))}
      </ul>
      <button 
        onClick={adicionarMesa} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Adicionar Mesa
      </button>
      {mesaSelecionada && (
        <button 
          onClick={() => deletarMesa(mesaSelecionada.id)} 
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Deletar Mesa
        </button>
      )}
    </div>
  );
};

export default MesaSidebar;
