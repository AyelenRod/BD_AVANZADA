import { query } from '@/lib/db';
import Link from 'next/link';
import { rankingFiltersSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

interface ProductRankingRow {
  category: string;
  product_name: string;
  units_sold: string;
  rank_in_category: string;
}

interface CountResult {
  total: string;
}

export default async function ProductRankingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawParams = {
    category: Array.isArray(searchParams.category)
      ? searchParams.category[0]
      : searchParams.category,
    minUnits: Array.isArray(searchParams.minUnits)
      ? searchParams.minUnits[0]
      : searchParams.minUnits,
    page: Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page,
    limit: Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit,
  };

  const filters = rankingFiltersSchema.parse(rawParams);
  const offset = (filters.page - 1) * filters.limit;

  const queryParams: (string | number)[] = [];
  const conditions: string[] = [];

  if (filters.category) {
    queryParams.push(filters.category);
    conditions.push(`category = $${queryParams.length}`);
  }

  if (filters.minUnits !== undefined) {
    queryParams.push(filters.minUnits);
    conditions.push(`units_sold >= $${queryParams.length}`);
  }

  const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

  const result = await query<ProductRankingRow>(
    `SELECT * FROM view_product_ranking ${whereClause} 
     ORDER BY units_sold DESC 
     LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
    [...queryParams, filters.limit, offset]
  );

  const products = result.rows;

  const countResult = await query<CountResult>(
    `SELECT COUNT(*) as total FROM view_product_ranking ${whereClause}`,
    queryParams
  );

  const totalItems = parseInt(countResult.rows[0]?.total || '0');
  const totalPages = Math.ceil(totalItems / filters.limit);

  const maxUnits = products.length > 0
    ? Math.max(...products.map(p => parseInt(p.units_sold)))
    : 1;

  const totalUnits = products.reduce(
    (sum, p) => sum + parseInt(p.units_sold),
    0
  );

  const getMedalBadge = (rank: number) => {
    if (rank === 1) {
      return 'bg-[#E8A0FF] text-[#1A1D29]';
    } else if (rank === 2) {
      return 'bg-[#D0FFA4] text-[#1A1D29]';
    } else if (rank === 3) {
      return 'bg-[#83E7FF] text-[#000181]';
    }
    return 'bg-[#F5F7FA] text-[#1A1D29]';
  };

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
            <h1 className="text-3xl font-bold text-white">Ranking de Productos</h1>
            <p className="text-[#83E7FF] mt-2">Top productos mas vendidos por categoria</p>

            <div className="mt-6">
              <form className="flex flex-wrap gap-4 items-end">
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
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Unidades minimas</label>
                  <input
                    type="number"
                    name="minUnits"
                    defaultValue={filters.minUnits || ''}
                    placeholder="0"
                    className="px-4 py-2 rounded-lg bg-white/10 border border-[#83E7FF]/30 text-white placeholder-[#83E7FF]/50 focus:outline-none focus:ring-2 focus:ring-[#83E7FF] focus:border-transparent"
                  />
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
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-[#006EE9]">{products.length}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Unidades Vendidas</p>
                <p className="text-3xl font-bold text-[#E8A0FF]">{totalUnits.toLocaleString()}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Total en Ranking</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">{totalItems}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F7FA]">
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Unidades</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Rendimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {products.map((product, index) => {
                    const units = parseInt(product.units_sold);
                    const rank = parseInt(product.rank_in_category);
                    const percentage = (units / maxUnits) * 100;

                    return (
                      <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getMedalBadge(rank)}`}>
                              {rank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-[#1A1D29]">{product.product_name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F5F7FA] text-[#1A1D29]">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-[#1A1D29]">{units.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-[#E5E7EB] rounded-full h-3">
                              <div
                                className="bg-[#006EE9] h-3 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-[#6B7280] w-12">{percentage.toFixed(0)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4">
                {filters.page > 1 && (
                  <Link
                    href={`?category=${filters.category || ''}&minUnits=${filters.minUnits || ''}&page=${filters.page - 1}&limit=${filters.limit}`}
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
                    href={`?category=${filters.category || ''}&minUnits=${filters.minUnits || ''}&page=${filters.page + 1}&limit=${filters.limit}`}
                    className="px-4 py-2 rounded border hover:bg-[#F5F7FA]"
                  >
                    Siguiente
                  </Link>
                )}
              </div>
            )}
          </div>
        </div >
      </div >
    </div >
  );
}