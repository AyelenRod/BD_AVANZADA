import { query } from '../../lib/db';
import Link from 'next/link';

interface InventoryItem {
  product_name: string;
  stock_level: number;
  inventory_status: string;
  is_urgent: boolean;
}

export default async function InventoryPage() {
  const result = await query('SELECT * FROM view_inventory_status');
  const inventario = result.rows as InventoryItem[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link href="/">← Volver al Dashboard</Link>
      <h1>📦 Estado del Inventario</h1>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Producto</th>
            <th>Stock</th>
            <th>Estatus</th>
            <th>Urgencia</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((fila, index) => (
            <tr key={index}>
              <td>{fila.product_name}</td>
              <td>{fila.stock_level}</td>
              <td>{fila.inventory_status}</td>
              <td style={{ 
                color: fila.is_urgent ? 'white' : 'black',
                backgroundColor: fila.is_urgent ? '#d32f2f' : 'transparent',
                fontWeight: fila.is_urgent ? 'bold' : 'normal'
              }}>
                {fila.is_urgent ? 'URGENTE' : 'Normal'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}