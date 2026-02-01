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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-100/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-pink-600 transition-colors duration-200 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Ventas Mensuales</h1>
            <p className="text-purple-100 mt-2">Análisis de ingresos y tendencias del año</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">Acumulado Total</p>
                <p className="text-3xl font-bold text-blue-600">${totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm font-medium text-purple-900 mb-1">Promedio Mensual</p>
                <p className="text-3xl font-bold text-purple-600">${avgSales.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-1">Impuestos (16%)</p>
                <p className="text-3xl font-bold text-green-600">${totalTaxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Mes</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Ventas</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Mes Anterior</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Cambio %</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Impuestos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {salesData.map((item, index) => {
                    const change = calculateChange(item.sales, item.previousMonth);
                    const taxes = item.sales * taxRate;
                    
                    return (
                      <tr key={index} className="hover:bg-purple-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md">
                              {index + 1}
                            </div>
                            <span className="font-semibold text-gray-900">{item.month}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                          ${item.sales.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          ${item.previousMonth.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {item.trend === 'up' ? (
                              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className={`font-semibold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.trend === 'up' ? '+' : ''}{change}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">
                          ${taxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-purple-100 to-pink-100 font-bold">
                    <td className="px-6 py-4 text-gray-900">TOTAL ANUAL</td>
                    <td className="px-6 py-4 text-right text-purple-700">${totalSales.toLocaleString()}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-right text-green-700">${totalTaxes.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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