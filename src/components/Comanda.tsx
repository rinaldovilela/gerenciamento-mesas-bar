import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

interface Mesa {
    id: number;
    comanda: string[];
  }
  
  interface ComandaProps {
    mesa: Mesa | null;
  }
  
  export default function Comanda({ mesa }: ComandaProps) {
    const [item, setItem] = useState<string>('');
  
    const adicionarItem = async () => {
      if (mesa && item) {
        await fetch(`http://localhost:5000/comandas/${mesa.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item }),
        });
        setItem('');
      }
    };
  
    const imprimirComanda = async () => {
      if (mesa) {
        await fetch('http://localhost:5000/impressao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mesaId: mesa.id }),
        });
      }
    };
  
    return (
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold">Comanda - Mesa {mesa ? mesa.id : ''}</h2>
        <ul>
          {mesa && mesa.comanda.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            className="border p-2 mr-2"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Adicionar item"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={adicionarItem}
          >
            Adicionar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={imprimirComanda}
          >
            Imprimir Comanda
          </button>
        </div>
      </div>
    );
  }