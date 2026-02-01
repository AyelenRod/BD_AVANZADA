import { query } from '../../lib/db'; // Nota los dos puntos ../.. para salir de las carpetas
import Link from 'next/link';

interface CategorySale {
  category: string;
  total_items_sold: number;
  total_revenue: number;
  avg_ticket_value: number;
}

export default async function CategorySalesPage() {
  const result = await query('SELECT * FROM view_category_sales');
  const ventas = result.rows as CategorySale[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link href="/">← Volver al Dashboard</Link>
      <h1>📊 Ventas por Categoría</h1>
      
      {ventas.length > 0 ? (
        <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Categoría</th>
              <th>Items Vendidos</th>
              <th>Total ($)</th>
              <th>Ticket Promedio</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((fila) => (
              <tr key={fila.category}>
                <td>{fila.category}</td>
                <td>{fila.total_items_sold}</td>
                <td>${Number(fila.total_revenue).toFixed(2)}</td>
                <td>${Number(fila.avg_ticket_value).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </main>
  );
}