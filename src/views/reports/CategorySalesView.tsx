import { ReportTable, KPIHighlight, Pagination } from "@/lib/ui-components";
import Link from "next/link";

interface CategorySalesViewProps {
    data: Record<string, unknown>[];
    page: number;
    hasNext: boolean;
}

export function CategorySalesView({ data, page, hasNext }: CategorySalesViewProps) {
    const totalRevenue = data.reduce((acc, row) => acc + Number(row.total_revenue ?? 0), 0);

    return (
        <div>
            <Link href="/" style={{ color: 'blue', textDecoration: 'none' }}>← Volver al inicio</Link>
            <h1 style={{ marginTop: '20px' }}>Ventas por Categoría</h1>
            <p>Reporte de ventas acumuladas (Paginado).</p>

            <div style={{ marginTop: '20px' }}>
                <KPIHighlight label="Ventas en esta página" value={`$${totalRevenue.toLocaleString()}`} />
            </div>

            <h3 style={{ marginTop: '30px' }}>Tabla de Datos (5 por página)</h3>
            <ReportTable
                columns={[
                    { header: "Nombre Categoría", key: "category" },
                    { header: "Items Vendidos", key: "total_items_sold" },
                    { header: "Ingresos", key: "total_revenue", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                    { header: "Promedio Ticket", key: "avg_ticket_value", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                ]}
                data={data}
            />

            <Pagination currentPage={page} hasNext={hasNext} />
        </div>
    );
}
