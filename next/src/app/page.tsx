import { query } from './lib/db';

// Define el tipo para los datos de la vista
interface CategorySale {
  category: string;
  total_items_sold: number;
  total_revenue: number;
  avg_ticket_value: number;
}

export default async function Home() {
  // 1. Hacemos la consulta a la base de datos
  // NOTA: Si tu función query no soporta genéricos, quita <CategorySale>
  const result = await query('SELECT * FROM view_category_sales');
  
  // Hacemos un type assertion para decirle a TypeScript el tipo de datos
  const ventas = result.rows as CategorySale[];

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📊 Dashboard de Reportes</h1>
      <p>Conexión segura establecida como: <strong>app_client</strong></p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Vista Previa: Ventas por Categoría</h2>
        <p>Si ves datos abajo, ¡la conexión funciona!</p>
        
        {/* Tabla simple para probar */}
        {ventas.length > 0 ? (
          <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%' }}>
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
          <p>No hay datos disponibles o hay un error en la consulta.</p>
        )}
      </div>
    </main>
  );
}