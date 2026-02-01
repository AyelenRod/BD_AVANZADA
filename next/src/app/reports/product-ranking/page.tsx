import { query } from '../../lib/db';
import Link from 'next/link';

interface ProductRanking {
  category: string;
  product_name: string;
  units_sold: number;
  revenue_generated: number;
  rank_in_category: number;
}

export default async function ProductRankingPage() {
  const result = await query('SELECT * FROM view_product_ranking');
  const ranking = result.rows as ProductRanking[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link href="/">← Volver al Dashboard</Link>
      <h1>🏆 Ranking de Productos</h1>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Categoría</th>
            <th>Ranking #</th>
            <th>Producto</th>
            <th>Unidades</th>
            <th>Ingresos ($)</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((fila, index) => (
            <tr key={index}>
              <td>{fila.category}</td>
              <td>#{fila.rank_in_category}</td>
              <td>{fila.product_name}</td>
              <td>{fila.units_sold}</td>
              <td>${Number(fila.revenue_generated).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}