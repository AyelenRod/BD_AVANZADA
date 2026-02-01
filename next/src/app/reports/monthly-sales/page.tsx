import { query } from '../../lib/db';
import Link from 'next/link';

interface MonthlySale {
  sale_month: string;
  monthly_total: number;
  estimated_tax: number;
}

export default async function MonthlySalesPage() {
  const result = await query('SELECT * FROM view_monthly_sales');
  const ventas = result.rows as MonthlySale[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link href="/">← Volver al Dashboard</Link>
      <h1>📅 Tendencias Mensuales</h1>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Mes</th>
            <th>Venta Total ($)</th>
            <th>Impuesto Estimado (16%)</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((fila) => (
            <tr key={fila.sale_month}>
              <td>{fila.sale_month}</td>
              <td>${Number(fila.monthly_total).toFixed(2)}</td>
              <td>${Number(fila.estimated_tax).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}