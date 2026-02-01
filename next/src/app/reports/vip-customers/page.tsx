import { query } from '../../lib/db';
import Link from 'next/link';

interface VipCustomer {
  id: number;
  name: string;
  email: string;
  total_orders: number;
  total_spent: number;
  membership_level: string;
}

export default async function VipCustomersPage() {
  const result = await query('SELECT * FROM view_vip_customers');
  const clientes = result.rows as VipCustomer[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Link href="/">← Volver al Dashboard</Link>
      <h1>💎 Clientes VIP</h1>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Cliente</th>
            <th>Email</th>
            <th>Órdenes</th>
            <th>Total Gastado ($)</th>
            <th>Membresía</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((fila) => (
            <tr key={fila.id}>
              <td>{fila.name}</td>
              <td>{fila.email}</td>
              <td>{fila.total_orders}</td>
              <td>${Number(fila.total_spent).toFixed(2)}</td>
              <td>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '15px',
                  backgroundColor: fila.membership_level === 'Gold Member' ? '#ffd700' : '#c0c0c0',
                  color: 'black',
                  fontSize: '0.8rem'
                }}>
                  {fila.membership_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}