import Link from 'next/link';

export default function MonthlySalesPage() {
  const salesData = [
    { month: 'Enero', sales: 28450, previousMonth: 26300, trend: 'up' },
    { month: 'Febrero', sales: 31200, previousMonth: 28450, trend: 'up' },
    { month: 'Marzo', sales: 29800, previousMonth: 31200, trend: 'down' },
    { month: 'Abril', sales: 34500, previousMonth: 29800, trend: 'up' },
    { month: 'Mayo', sales: 36700, previousMonth: 34500, trend: 'up' },
    { month: 'Junio', sales: 38900, previousMonth: 36700, trend: 'up' },
    { month: 'Julio', sales: 35600, previousMonth: 38900, trend: 'down' },
    { month: 'Agosto', sales: 41200, previousMonth: 35600, trend: 'up' },
    { month: 'Septiembre', sales: 39400, previousMonth: 41200, trend: 'down' },
    { month: 'Octubre', sales: 43800, previousMonth: 39400, trend: 'up' },
    { month: 'Noviembre', sales: 47200, previousMonth: 43800, trend: 'up' },
    { month: 'Diciembre', sales: 52300, previousMonth: 47200, trend: 'up' }
  ];

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const avgSales = totalSales / salesData.length;
  const taxRate = 0.16;
  const totalTaxes = totalSales * taxRate;

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
            <p className="text-[#83E7FF] mt-2">Análisis de ingresos y tendencias del año</p>
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
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Mes Anterior</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Cambio %</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Impuestos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {salesData.map((item, index) => {
                    const change = calculateChange(item.sales, item.previousMonth);
                    const taxes = item.sales * taxRate;
                    
                    return (
                      <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-[#006EE9] flex items-center justify-center text-white font-bold text-sm mr-3">
                              {index + 1}
                            </div>
                            <span className="font-semibold text-[#1A1D29]">{item.month}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-[#1A1D29]">
                          ${item.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right text-[#6B7280]">
                          ${item.previousMonth.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {item.trend === 'up' ? (
                              <svg className="w-5 h-5 text-[#D0FFA4]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-[#E8A0FF]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className={`font-semibold ${item.trend === 'up' ? 'text-[#D0FFA4]' : 'text-[#E8A0FF]'}`}>
                              {item.trend === 'up' ? '+' : ''}{change}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-[#6B7280]">
                          ${taxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F5F7FA] font-bold">
                    <td className="px-6 py-4 text-[#1A1D29]">TOTAL ANUAL</td>
                    <td className="px-6 py-4 text-right text-[#006EE9]">${totalSales.toLocaleString()}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-right text-[#D0FFA4]">${totalTaxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}