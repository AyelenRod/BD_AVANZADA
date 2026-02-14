export interface CategorySale {
  category: string;
  total_items_sold: string;
  total_revenue: string;
  avg_ticket_value: string;
}

export interface InventoryStatus {
  product_id: number;
  product_name: string;
  current_stock: string;
  inventory_value: string;
  stock_status: 'OUT_OF_STOCK' | 'DANGER' | 'OK';
}

export interface VIPCustomer {
  id: number;
  name: string;
  email: string;
  total_orders: string;
  total_spent: string;
  membership_level: string;
  last_purchase_date: string;
}

export interface MonthlySale {
  sale_month: string;
  monthly_total: string;
  estimated_tax: string;
}

export interface ProductRanking {
  category: string;
  product_name: string;
  units_sold: string;
  rank_in_category: string;
}

export interface CategoryFilters {
  minRevenue?: number;
  category?: string;
  page: number;
  limit: number;
}