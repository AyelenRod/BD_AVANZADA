import Link from "next/link";
import { getDashboardStats } from "@/lib/reports";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const stats = await getDashboardStats();

  const reports = [
    { title: "Ventas por Categoría", desc: "Ver ingresos y ticket promedio por tipo de producto", url: "/reports/category-sales" },
    { title: "Estado de Inventario", desc: "Ver productos con poco stock o agotados", url: "/reports/inventory" },
    { title: "Clientes VIP", desc: "Ver clientes que más compran y su nivel", url: "/reports/vip-customers" },
    { title: "Reporte Mensual", desc: "Ventas por mes y estimación de impuestos", url: "/reports/monthly-sales" },
    { title: "Ranking de Productos", desc: "Los productos más vendidos por categoría", url: "/reports/product-ranking" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Principal</h1>
      <p style={{ color: 'gray', marginBottom: '30px' }}>Bienvenido al centro de reportes.</p>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1, borderRadius: '12px', backgroundColor: 'white' }}>
          <div style={{ color: 'gray', fontSize: '14px' }}>Categorías</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#c2185b' }}>{stats.activeCategories}</div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1, borderRadius: '12px', backgroundColor: 'white' }}>
          <div style={{ color: 'gray', fontSize: '14px' }}>Alertas Stock</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>{stats.lowStockAlerts}</div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', flex: 1, borderRadius: '12px', backgroundColor: 'white' }}>
          <div style={{ color: 'gray', fontSize: '14px' }}>Clientes VIP</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c27b0' }}>{stats.goldMembers}</div>
        </div>
      </div>

      <h2>Lista de Reportes Disponibles</h2>
      <div style={{ marginTop: '20px' }}>
        {reports.map((report) => (
          <div key={report.url} style={{ borderBottom: '1px solid #eee', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#880e4f' }}>{report.title}</div>
              <div style={{ fontSize: '14px', color: 'gray' }}>{report.desc}</div>
            </div>
            <Link href={report.url} className="btn">
              Abrir Reporte
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
