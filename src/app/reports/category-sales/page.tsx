import { getCategorySalesReport } from "@/lib/reports";
import { CategorySalesView } from "@/views/reports/CategorySalesView";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
});

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategorySalesPage({ searchParams }: PageProps) {
    const unresolvedParams = await searchParams;
    const { page } = paramsSchema.parse(unresolvedParams);

    const limit = 5;
    const offset = (page - 1) * limit;

    const rows = await getCategorySalesReport(limit, offset);

    const hasNext = rows.length === limit;

    return <CategorySalesView data={rows} page={page} hasNext={hasNext} />;
}
