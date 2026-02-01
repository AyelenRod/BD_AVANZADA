import { query } from '@/lib/db';
import Link from 'next/link';
import { vipFiltersSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

interface VIPCustomerRow {
  id: number;
  name: string;
  email: string;
  total_orders: string;
  total_spent: string;
  membership_level: string;
  last_purchase_date: string;
}

interface CountResult {
  total: string;
}

export default async function VIPCustomersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawParams = {
    tier: Array.isArray(searchParams.tier)
      ? searchParams.tier[0]
      : searchParams.tier,
    minOrders: Array.isArray(searchParams.minOrders)
      ? searchParams.minOrders[0]
      : searchParams.minOrders,
    page: Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page,
    limit: Array.isArray(searchParams.limit)
      ? searchParams.limit[0]
      : searchParams.limit,
  };

  const filters = vipFiltersSchema.parse(rawParams);
  const offset = (filters.page - 1) * filters.limit;

  const queryParams: (string | number)[] = [];
  const conditions: string[] = [];

  if (filters.tier !== 'all') {
    if (filters.tier === 'gold') {
      conditions.push(`membership_level = 'Gold Member'`);
    } else if (filters.tier === 'silver') {
      conditions.push(`membership_level = 'Silver Member'`);
    }
  }

  if (filters.minOrders !== undefined) {
    queryParams.push(filters.minOrders);
    conditions.push(`total_orders >= $${queryParams.length}`);
  }

  const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

  const result = await query<VIPCustomerRow>(
    `SELECT * FROM view_vip_customers ${whereClause} 
     ORDER BY total_spent DESC 
     LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`,
    [...queryParams, filters.limit, offset]
  );

  const customers = result.rows;

  const countResult = await query<CountResult>(
    `SELECT COUNT(*) as total FROM view_vip_customers ${whereClause}`,
    queryParams
  );

  const totalItems = parseInt(countResult.rows[0]?.total || '0');
  const totalPages = Math.ceil(totalItems / filters.limit);

  const goldCustomers = customers.filter(c => c.membership_level === 'Gold Member').length;
  const silverCustomers = customers.filter(c => c.membership_level === 'Silver Member').length;
  const totalSpending = customers.reduce((sum, c) => sum + parseFloat(c.total_spent), 0);
  const avgSpending = customers.length > 0 ? totalSpending / customers.length : 0;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getTierBadge = (level: string) => {
    if (level === 'Gold Member') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E8A0FF] text-[#1A1D29]">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Gold
        </span>
      );
    }
    if (level === 'Silver Member') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#D0FFA4] text-[#1A1D29]">
          Silver
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#83E7FF] text-[#000181]">
        Bronze
      </span>
    );
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
            <h1 className="text-3xl font-bold text-white">Clientes VIP</h1>
            <p className="text-[#83E7FF] mt-2">Gestion de clientes premium y analisis de compras</p>

            <div className="mt-6">
              <form className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Nivel</label>
                  <select
                    name="tier"
                    defaultValue={filters.tier}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-[#83E7FF]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#83E7FF] focus:border-transparent"
                  >
                    <option value="all" className="text-[#1A1D29]">Todos</option>
                    <option value="gold" className="text-[#1A1D29]">Gold</option>
                    <option value="silver" className="text-[#1A1D29]">Silver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#83E7FF] text-sm font-medium mb-1">Ordenes minimas</label>
                  <input
                    type="number"
                    name="minOrders"
                    defaultValue={filters.minOrders || ''}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Total VIP</p>
                <p className="text-3xl font-bold text-[#E8A0FF]">{totalItems}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Clientes Gold</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">{goldCustomers}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Clientes Silver</p>
                <p className="text-3xl font-bold text-[#83E7FF]">{silverCustomers}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Gasto Promedio</p>
                <p className="text-3xl font-bold text-[#006EE9]">${avgSpending.toFixed(0)}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F7FA]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Pedidos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Gasto Total</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Nivel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {customers.map((customer, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${customer.membership_level === 'Gold Member'
                            ? 'bg-[#E8A0FF] text-[#1A1D29]'
                            : customer.membership_level === 'Silver Member'
                              ? 'bg-[#D0FFA4] text-[#1A1D29]'
                              : 'bg-[#83E7FF] text-[#000181]'
                            }`}>
                            {getInitials(customer.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1A1D29]">{customer.name}</p>
                            <p className="text-sm text-[#6B7280]">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#6B7280]">{customer.email}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#83E7FF] text-[#000181]">
                          {customer.total_orders}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#1A1D29]">
                        ${parseFloat(customer.total_spent).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getTierBadge(customer.membership_level)}
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
                    href={`?tier=${filters.tier}&minOrders=${filters.minOrders || ''}&page=${filters.page - 1}&limit=${filters.limit}`}
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
                    href={`?tier=${filters.tier}&minOrders=${filters.minOrders || ''}&page=${filters.page + 1}&limit=${filters.limit}`}
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