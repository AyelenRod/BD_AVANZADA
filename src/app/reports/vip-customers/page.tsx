import { getVIPCustomersReport } from "@/lib/reports";
import { VIPCustomersView } from "@/views/reports/VIPCustomersView";
import { z } from "zod";

export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
    level: z.enum(['Gold Member', 'Silver Member', 'Bronze Member']).optional(),
    page: z.coerce.number().int().positive().default(1),
});

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VIPCustomersPage({ searchParams }: PageProps) {
    const unresolvedParams = await searchParams;

    const result = paramsSchema.safeParse(unresolvedParams);
    const { level, page } = result.success ? result.data : { level: undefined, page: 1 };

    const limit = 8;
    const offset = (page - 1) * limit;

    const rows = await getVIPCustomersReport(limit, offset, level);
    const hasNext = rows.length === limit;

    return <VIPCustomersView data={rows} page={page} hasNext={hasNext} currentLevel={level} />;
}
