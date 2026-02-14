import { ReportTable, KPIHighlight, Pagination } from "@/lib/ui-components";
import Link from "next/link";

interface MonthlySalesViewProps {
    data: Record<string, unknown>[];
    page: number;
    hasNext: boolean;
}

export function MonthlySalesView({ data, page, hasNext }: MonthlySalesViewProps) {
    const totalSales = data.reduce((acc, row) => acc + Number(row.monthly_total ?? 0), 0);

    return (
        <div>
            <Link href="/" style={{ color: 'blue', textDecoration: 'none' }}>← Volver al inicio</Link>
            <h1 style={{ marginTop: '20px' }}>Reporte Mensual</h1>
            <p>Vista histórica de ventas (Paginado).</p>

            <div style={{ marginTop: '20px' }}>
                <KPIHighlight label="Ventas en página" value={`$${totalSales.toLocaleString()}`} />
            </div>

            <h3 style={{ marginTop: '30px' }}>Gráfica de Tendencia (Ventas)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '100px', border: '1px solid #eee', padding: '10px', marginTop: '10px' }}>
                {data.slice().reverse().map((row, i) => {
                    const maxVal = Math.max(...data.map(r => Number(r.monthly_total ?? 0)), 1);
                    const height = (Number(row.monthly_total ?? 0) / maxVal) * 100;
                    return (
                        <div key={i} style={{ flex: 1, backgroundColor: 'blue', height: `${height}%` }} title={String(row.sale_month ?? '')}></div>
                    );
                })}
            </div>

            <h3 style={{ marginTop: '30px' }}>Detalle Mensual</h3>
            <ReportTable
                columns={[
                    { header: "Mes", key: "sale_month" },
                    { header: "Monto Total", key: "monthly_total", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                    { header: "IVA (16%)", key: "estimated_tax", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                ]}
                data={data}
            />

            <Pagination currentPage={page} hasNext={hasNext} />
        </div>
    );
}
