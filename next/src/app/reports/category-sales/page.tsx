import Link from 'next/link';

export default function CategorySalesPage() {
  const salesData = [
    { category: 'Electrónica', items: 245, revenue: 45230, percentage: 35 },
    { category: 'Ropa', items: 189, revenue: 28450, percentage: 22 },
    { category: 'Alimentos', items: 312, revenue: 19870, percentage: 15 },
    { category: 'Hogar', items: 156, revenue: 22340, percentage: 17 },
    { category: 'Deportes', items: 98, revenue: 14120, percentage: 11 }
  ];

  const totalItems = salesData.reduce((sum, item) => sum + item.items, 0);
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-white">Ventas por Categoría</h1>
            <p className="text-[#83E7FF] mt-2">Análisis de rendimiento por categoría de producto</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Total Categorías</p>
                <p className="text-3xl font-bold text-[#006EE9]">{salesData.length}</p>
              </div>
              <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6">
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Total Items Vendidos</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">{totalItems.toLocaleString()}</p>
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Items Vendidos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Ingresos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">% del Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {salesData.map((item, index) => (
                    <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
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
                          {item.items.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-[#1A1D29]">
                        ${item.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="w-24 bg-[#E5E7EB] rounded-full h-2">
                            <div 
                              className="bg-[#006EE9] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[#1A1D29] w-12">{item.percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}