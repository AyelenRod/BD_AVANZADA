import { ReportTable, KPIHighlight, Pagination } from "@/lib/ui-components";
import Link from "next/link";

interface InventoryViewProps {
    data: Record<string, unknown>[];
    page: number;
    hasNext: boolean;
    currentStatus?: string;
}

export function InventoryView({ data, page, hasNext, currentStatus }: InventoryViewProps) {
    return (
        <div>
            <Link href="/" style={{ color: 'blue', textDecoration: 'none' }}>← Volver al inicio</Link>
            <h1 style={{ marginTop: '20px' }}>Estado de Inventario</h1>

            <form style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
                <label style={{ marginRight: '10px' }}>Filtrar por estado:</label>
                <select name="status" defaultValue={currentStatus || ""} style={{ marginRight: '10px' }}>
                    <option value="">Todos</option>
                    <option value="OK">OK</option>
                    <option value="DANGER">Poco Stock</option>
                    <option value="OUT_OF_STOCK">Agotado</option>
                </select>
                <button type="submit" className="btn">Filtrar</button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <KPIHighlight label="Resultados en página" value={data.length.toString()} />
            </div>

            <h3 style={{ marginTop: '30px' }}>Lista de Productos</h3>
            <ReportTable
                columns={[
                    { header: "ID", key: "product_id" },
                    { header: "Producto", key: "product_name" },
                    { header: "Stock", key: "current_stock" },
                    { header: "Valor Total", key: "inventory_value", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                    { header: "Estado", key: "stock_status" },
                ]}
                data={data}
            />

            <Pagination currentPage={page} hasNext={hasNext} />
        </div>
    );
}
