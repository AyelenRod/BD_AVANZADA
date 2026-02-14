import { getInventoryReport } from "@/lib/reports";
import { InventoryView } from "@/views/reports/InventoryView";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
    status: z.enum(['OK', 'DANGER', 'OUT_OF_STOCK']).optional(),
    page: z.coerce.number().int().positive().default(1),
});

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function InventoryPage({ searchParams }: PageProps) {
    const unresolvedParams = await searchParams;

    const result = paramsSchema.safeParse(unresolvedParams);
    const { status, page } = result.success ? result.data : { status: undefined, page: 1 };

    const limit = 10;
    const offset = (page - 1) * limit;
    
    const rows = await getInventoryReport(limit, offset, status);
    const hasNext = rows.length === limit;

    return <InventoryView data={rows} page={page} hasNext={hasNext} currentStatus={status} />;
}
