import { ReportTable, KPIHighlight, Pagination } from "@/lib/ui-components";
import Link from "next/link";

interface VIPCustomersViewProps {
    data: Record<string, unknown>[];
    page: number;
    hasNext: boolean;
    currentLevel?: string;
}

export function VIPCustomersView({ data, page, hasNext, currentLevel }: VIPCustomersViewProps) {
    return (
        <div>
            <Link href="/" style={{ color: 'blue', textDecoration: 'none' }}>← Volver al inicio</Link>
            <h1 style={{ marginTop: '20px' }}>Clientes VIP</h1>

            <form style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
                <label style={{ marginRight: '10px' }}>Nivel de Membresía:</label>
                <select name="level" defaultValue={currentLevel || ""} style={{ marginRight: '10px' }}>
                    <option value="">Todos</option>
                    <option value="Gold Member">Gold Member</option>
                    <option value="Silver Member">Silver Member</option>
                    <option value="Bronze Member">Bronze Member</option>
                </select>
                <button type="submit" className="btn">Filtrar</button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <KPIHighlight label="Clientes en lista" value={data.length.toString()} />
            </div>

            <h3 style={{ marginTop: '30px' }}>Tabla de Clientes</h3>
            <ReportTable
                columns={[
                    { header: "Nombre", key: "name" },
                    { header: "Email", key: "email" },
                    { header: "Nivel", key: "membership_level" },
                    { header: "Total Comprado", key: "total_spent", format: (v) => `$${Number(v ?? 0).toLocaleString()}` },
                ]}
                data={data}
            />

            <Pagination currentPage={page} hasNext={hasNext} />
        </div>
    );
}
