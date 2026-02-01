import { query } from '@/lib/db';
import Link from 'next/link';
import { monthlyFiltersSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

interface MonthlySaleRow {
  sale_month: string;
  monthly_total: string;
  estimated_tax: string;
}

interface CountResult {
  total: string;
}

export default async function MonthlySalesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawParams = {
    year: Array.isArray(searchParams.year)
      ? searchParams.year[0]
      : searchParams.year,
    month: Array.isArray(searchParams.month)
      ? searchParams.month[0]
      : searchParams.month,
    page: Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page,
    limit: Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit,
  };

  const filters = monthlyFiltersSchema.parse(rawParams);
  const offset = (filters.page - 1) * filters.limit;

  const queryParams: (string | number)[] = [];
  let whereClause = '';
  const conditions: string[] = [];

  if (filters.year !== undefined) {
    queryParams.push(filters.year.toString());
    conditions.push(`sale_month LIKE $${queryParams.length} || '%'`);
  }

  if (conditions.length > 0) {
    whereClause = 'WHERE ' + conditions.join(' AND ');
  }

  const result = await query<MonthlySaleRow>(
    `SELECT * FROM view_monthly_sales ${whereClause} 
     ORDER BY sale_month DESC 
     LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
    [...queryParams, filters.limit, offset]
  );

  const salesData = result.rows;

  const countResult = await query<CountResult>(
    `SELECT COUNT(*) as total FROM view_monthly_sales ${whereClause}`,
    queryParams
  );

  const totalItems = parseInt(countResult.rows[0]?.total || '0');
  const totalPages = Math.ceil(totalItems / filters.limit);

  const totalSales = salesData.reduce(
    (sum, item) => sum + parseFloat(item.monthly_total),
    0
  );

  const totalTaxes = salesData.reduce(
    (sum, item) => sum + parseFloat(item.estimated_tax),
    0
  );

  const avgSales = salesData.length > 0 ? totalSales / salesData.length : 0;

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#006EE9] hover:text-[#000181] transition-colors duration-200 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden mb-8">
          <div className="bg-[#000181] px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Ventas Mensuales</h1>
            <p className="text-[#83E7FF] mt-2">Resumen de ingresos y tendencias por mes</p>

            <div className="mt-6">
              <form className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Año</label>
                  <select
                    name="year"
                    defaultValue={filters.year || ''}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-[#83E7FF]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#83E7FF] focus:border-transparent"
                  >
                    <option value="" className="text-[#1A1D29]">Todos los años</option>
                    <option value="2023" className="text-[#1A1D29]">2023</option>
                    <option value="2024" className="text-[#1A1D29]">2024</option>
                    <option value="2025" className="text-[#1A1D29]">2025</option>
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
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Acumulado Total</p>
                <p className="text-3xl font-bold text-[#006EE9]">${totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Promedio Mensual</p>
                <p className="text-3xl font-bold text-[#E8A0FF]">${avgSales.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Impuestos (16%)</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">${totalTaxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F7FA]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Mes</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Ventas</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Impuestos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {salesData.map((item, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-[#006EE9] flex items-center justify-center text-white font-bold text-sm mr-3">
                            {item.sale_month.substring(5, 7)}
                          </div>
                          <span className="font-semibold text-[#1A1D29]">{item.sale_month}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#1A1D29]">
                        ${parseFloat(item.monthly_total).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-[#6B7280]">
                        ${parseFloat(item.estimated_tax).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F5F7FA] font-bold">
                    <td className="px-6 py-4 text-[#1A1D29]">TOTAL</td>
                    <td className="px-6 py-4 text-right text-[#006EE9]">${totalSales.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-[#D0FFA4]">${totalTaxes.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                {filters.page > 1 && (
                  <Link
                    href={`?year=${filters.year || ''}&page=${filters.page - 1}&limit=${filters.limit}`}
                    className="px-4 py-2 rounded border hover:bg-[#F5F7FA]"
                  >
                    Anterior
                  </Link>
                )}
                <span className="py-2">
                  Pagina {filters.page} de {totalPages}
                </span>
                {filters.page < totalPages && (
                  <Link
                    href={`?year=${filters.year || ''}&page=${filters.page + 1}&limit=${filters.limit}`}
                    className="px-4 py-2 rounded border hover:bg-[#F5F7FA]"
                  >
                    Siguiente
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