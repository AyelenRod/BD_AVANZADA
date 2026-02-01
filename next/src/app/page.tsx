import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🚀 Dashboard Corporativo</h1>
      <p>Selecciona un reporte para visualizar los datos en tiempo real.</p>
      
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        <Link 
          href="/reports/category-sales"
          style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'block' }}
        >
          <strong>📊 1. Ventas por Categoría</strong><br/>
          <small>Ingresos y tickets promedio por familia de productos.</small>
        </Link>

        <Link 
          href="/reports/inventory"
          style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'block' }}
        >
          <strong>📦 2. Estado del Inventario</strong><br/>
          <small>Monitoreo de stock y alertas urgentes.</small>
        </Link>

        <Link 
          href="/reports/vip-customers"
          style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'block' }}
        >
          <strong>💎 3. Clientes VIP</strong><br/>
          <small>Mejores compradores y nivel de membresía (Gold/Silver).</small>
        </Link>

        <Link 
          href="/reports/monthly-sales"
          style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'block' }}
        >
          <strong>📅 4. Tendencias Mensuales</strong><br/>
          <small>Histórico de ventas e impuestos estimados.</small>
        </Link>

        <Link 
          href="/reports/product-ranking"
          style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: '#333', display: 'block' }}
        >
          <strong>🏆 5. Ranking de Productos</strong><br/>
          <small>Los productos más vendidos dentro de cada categoría.</small>
        </Link>
      </div>
    </main>
  );
}