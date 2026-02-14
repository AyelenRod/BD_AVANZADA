import { getProductRankingReport } from "@/lib/reports";
import { ProductRankingView } from "@/views/reports/ProductRankingView";

export const dynamic = 'force-dynamic';

export default async function ProductRankingPage() {
    const rows = await getProductRankingReport();

    return <ProductRankingView data={rows} />;
}
