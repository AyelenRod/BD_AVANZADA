import { getMonthlySalesReport } from "@/lib/reports";
import { MonthlySalesView } from "@/views/reports/MonthlySalesView";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
});

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MonthlySalesPage({ searchParams }: PageProps) {
    const unresolvedParams = await searchParams;
    const { page } = paramsSchema.parse(unresolvedParams);

    const limit = 4;
    const offset = (page - 1) * limit;

    const rows = await getMonthlySalesReport(limit, offset);

    const hasNext = rows.length === limit;

    return <MonthlySalesView data={rows} page={page} hasNext={hasNext} />;
}
