import { query } from "./db";

export async function getDashboardStats() {
    try {
        const categoryCount = await query("SELECT COUNT(*) as count FROM view_category_sales");
        const lowStockCount = await query("SELECT COUNT(*) as count FROM view_inventory_status WHERE stock_status != 'OK'");
        const vipCount = await query("SELECT COUNT(*) as count FROM view_vip_customers WHERE membership_level = 'Gold Member'");

        return {
            activeCategories: Number(categoryCount.rows[0]?.count || 0),
            lowStockAlerts: Number(lowStockCount.rows[0]?.count || 0),
            goldMembers: Number(vipCount.rows[0]?.count || 0)
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return { activeCategories: 0, lowStockAlerts: 0, goldMembers: 0 };
    }
}


export async function getCategorySalesReport(limit: number, offset: number) {
    const { rows } = await query(
        "SELECT * FROM view_category_sales ORDER BY total_revenue DESC LIMIT $1 OFFSET $2",
        [limit, offset]
    );
    return rows;
}

export async function getInventoryReport(limit: number, offset: number, status?: string) {
    let sql = "SELECT * FROM view_inventory_status";
    const params: (string | number)[] = [];

    if (status) {
        sql += " WHERE stock_status = $1 LIMIT $2 OFFSET $3";
        params.push(status, limit, offset);
    } else {
        sql += " LIMIT $1 OFFSET $2";
        params.push(limit, offset);
    }

    const { rows } = await query<Record<string, unknown>>(sql, params);
    return rows;
}

export async function getVIPCustomersReport(limit: number, offset: number, level?: string) {
    let sql = "SELECT * FROM view_vip_customers";
    const params: (string | number)[] = [];

    if (level) {
        sql += " WHERE membership_level = $1 ORDER BY total_spent DESC LIMIT $2 OFFSET $3";
        params.push(level, limit, offset);
    } else {
        sql += " ORDER BY total_spent DESC LIMIT $1 OFFSET $2";
        params.push(limit, offset);
    }

    const { rows } = await query<Record<string, unknown>>(sql, params);
    return rows;
}

export async function getMonthlySalesReport(limit: number, offset: number) {
    const { rows } = await query(
        "SELECT * FROM view_monthly_sales ORDER BY sale_month DESC LIMIT $1 OFFSET $2",
        [limit, offset]
    );
    return rows;
}

export async function getProductRankingReport() {
    const { rows } = await query("SELECT * FROM view_product_ranking ORDER BY category, rank_in_category");
    return rows;
}
