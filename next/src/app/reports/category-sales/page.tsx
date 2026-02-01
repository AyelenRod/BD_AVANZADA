import { query } from '@/lib/db';
import Link from 'next/link';
import { CategoryFilters } from '@/lib/types';
import { categoryFiltersSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

interface CategorySaleRow {
  category: string;
  total_items_sold: string;
  total_revenue: string;
  avg_ticket_value: string;
}

interface CountResult {
  total: string;
}

export default async function CategorySalesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parsear parámetros
  const rawParams = {
    minRevenue: Array.isArray(searchParams.minRevenue)
      ? searchParams.minRevenue[0]
      : searchParams.minRevenue,
    category: Array.isArray(searchParams.category)
      ? searchParams.category[0]
      : searchParams.category,
    page: Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page,
    limit: Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit,
  };

  const filters: CategoryFilters = categoryFiltersSchema.parse(rawParams);
  const offset = (filters.page - 1) * filters.limit;

  // Construir query
  const queryParams: (string | number)[] = [];
  let whereClause = '';

  if (filters.minRevenue !== undefined) {
    whereClause = 'WHERE total_revenue >= $1';
    queryParams.push(filters.minRevenue);
  }

  // Obtener datos
  const result = await query<CategorySaleRow>(
    `SELECT * FROM view_category_sales ${whereClause} 
     ORDER BY total_revenue DESC 
     LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
    [...queryParams, filters.limit, offset]
  );

  const salesData = result.rows;

  // Contar total
  const countResult = await query<CountResult>(
    `SELECT COUNT(*) as total FROM view_category_sales ${whereClause}`,
    filters.minRevenue !== undefined ? [filters.minRevenue] : []
  );

  const totalItems = parseInt(countResult.rows[0]?.total || '0');
  const totalPages = Math.ceil(totalItems / filters.limit);

  // Calcular totales
  const totalItemsSold = salesData.reduce(
    (sum, item) => sum + parseInt(item.total_items_sold),
    0
  );

  const totalRevenue = salesData.reduce(
    (sum, item) => sum + parseFloat(item.total_revenue),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#006EE9] hover:text-[#000181] transition-colors duration-200 font-medium group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden mb-8">
          <div className="bg-[#000181] px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Ventas por Categoría</h1>
            <p className="text-[#83E7FF] mt-2">Análisis de rendimiento por categoría de producto</p>

            <div className="mt-6">
              <form className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Ingreso minimo</label>
                  <input
                    type="number"
                    name="minRevenue"
                    defaultValue={filters.minRevenue || ''}
                    placeholder="$0.00"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-[#83E7FF]/30 text-white placeholder-[#83E7FF]/50 focus:outline-none focus:ring-2 focus:ring-[#83E7FF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Categoria</label>
                  <select
                    name="category"
                    defaultValue={filters.category || ''}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-[#83E7FF]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#83E7FF] focus:border-transparent"
                  >
                    <option value="" className="text-[#1A1D29]">Todas</option>
                    <option value="Electronica" className="text-[#1A1D29]">Electronica</option>
                    <option value="Muebles" className="text-[#1A1D29]">Muebles</option>
                    <option value="Alimentos" className="text-[#1A1D29]">Alimentos</option>
                  </select>
                </div>
                <button type="submit" className="bg-[#D0FFA4] text-[#000181] px-6 py-2 rounded-lg font-semibold hover:bg-[#83E7FF] transition-colors duration-200">
                  Filtrar
                </button>
              </form>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Categorías</p>
                <p className="text-3xl font-bold text-[#006EE9]">{salesData.length}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Items Vendidos</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">{totalItemsSold.toLocaleString()}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Ingresos Totales</p>
                <p className="text-3xl font-bold text-[#E8A0FF]">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F7FA]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase">Categoría</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase">Items</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase">Ingresos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase">Ticket Promedio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {salesData.map((item, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA]">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-[#006EE9] flex items-center justify-center text-white font-bold text-sm mr-3">
                            {item.category.charAt(0)}
                          </div>
                          <span className="font-semibold text-[#1A1D29]">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#83E7FF] text-[#000181]">
                          {parseInt(item.total_items_sold).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-[#1A1D29]">
                        ${parseFloat(item.total_revenue).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-[#1A1D29]">
                        ${parseFloat(item.avg_ticket_value).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                {filters.page > 1 && (
                  <Link
                    href={`?minRevenue=${filters.minRevenue || ''}&category=${filters.category || ''}&page=${filters.page - 1}&limit=${filters.limit}`}
                    className="px-4 py-2 rounded border"
                  >
                    ← Anterior
                  </Link>
                )}
                <span className="py-2">
                  Página {filters.page} de {totalPages}
                </span>
                {filters.page < totalPages && (
                  <Link
                    href={`?minRevenue=${filters.minRevenue || ''}&category=${filters.category || ''}&page=${filters.page + 1}&limit=${filters.limit}`}
                    className="px-4 py-2 rounded border"
                  >
                    Siguiente →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}