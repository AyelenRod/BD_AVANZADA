import { ReportTable, Pagination } from "@/lib/ui-components";
import Link from "next/link";

interface ProductRankingViewProps {
    data: Record<string, unknown>[];
}

export function ProductRankingView({ data }: ProductRankingViewProps) {
    const categories = Array.from(new Set(data.map(r => String(r.category ?? ''))));

    return (
        <div>
            <Link href="/" style={{ color: 'blue', textDecoration: 'none' }}>← Volver al inicio</Link>
            <h1 style={{ marginTop: '20px' }}>Ranking de Productos</h1>
            <p>Los productos más vendidos agrupados por su categoría.</p>

            {categories.map(category => (
                <div key={category} style={{ marginTop: '40px' }}>
                    <h2 style={{ borderBottom: '2px solid black' }}>{category}</h2>
                    <ReportTable
                        columns={[
                            { header: "Posición", key: "rank_in_category" },
                            { header: "Nombre Producto", key: "product_name" },
                            { header: "Unidades Vendidas", key: "units_sold" },
                        ]}
                        data={data.filter(r => String(r.category ?? '') === category)}
                    />
                </div>
            ))}
        </div>
    );
}
