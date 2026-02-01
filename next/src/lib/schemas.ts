import { z } from 'zod';

export const categoryFiltersSchema = z.object({
  minRevenue: z.coerce.number().min(0).optional(),
  category: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const monthlyFiltersSchema = z.object({
  year: z.coerce.number().min(2023).max(2025).optional(),
  month: z.coerce.number().min(1).max(12).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export const inventoryFiltersSchema = z.object({
  status: z.enum(['all', 'critical', 'low', 'optimal']).default('all'),
  category: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const rankingFiltersSchema = z.object({
  category: z.string().optional(),
  minUnits: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(20).default(10),
});

export const vipFiltersSchema = z.object({
  tier: z.enum(['all', 'gold', 'silver']).default('all'),
  minOrders: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});
