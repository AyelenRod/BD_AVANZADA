import Link from 'next/link';

export default function ProductRankingPage() {
  const products = [
    { rank: 1, name: 'iPhone 15 Pro Max', category: 'Electrónica', units: 342, revenue: 410400, medal: 'gold' },
    { rank: 2, name: 'Samsung Galaxy S24 Ultra', category: 'Electrónica', units: 298, revenue: 357600, medal: 'silver' },
    { rank: 3, name: 'MacBook Pro M3', category: 'Electrónica', units: 187, revenue: 448800, medal: 'bronze' },
    { rank: 4, name: 'Nike Air Max 2024', category: 'Deportes', units: 523, revenue: 78450, medal: null },
    { rank: 5, name: 'Sony WH-1000XM5', category: 'Electrónica', units: 412, revenue: 123600, medal: null },
    { rank: 6, name: 'iPad Air M2', category: 'Electrónica', units: 267, revenue: 160200, medal: null },
    { rank: 7, name: 'Adidas Ultraboost', category: 'Deportes', units: 489, revenue: 73350, medal: null },
    { rank: 8, name: 'Camiseta Nike Dri-FIT', category: 'Ropa', units: 1245, revenue: 37350, medal: null },
    { rank: 9, name: 'Samsung 65" QLED', category: 'Electrónica', units: 145, revenue: 217500, medal: null },
    { rank: 10, name: 'Apple Watch Series 9', category: 'Electrónica', units: 356, revenue: 142400, medal: null }
  ];

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

  const maxUnits = Math.max(...products.map(p => p.units));
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalUnits = products.reduce((sum, p) => sum + p.units, 0);

  const categoryChampions = [
    { category: 'Electrónica', product: 'iPhone 15 Pro Max', units: 342 },
    { category: 'Deportes', product: 'Nike Air Max 2024', units: 523 },
    { category: 'Ropa', product: 'Camiseta Nike Dri-FIT', units: 1245 }
  ];

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
            <p className="text-[#83E7FF] mt-2">Top 10 productos más vendidos por unidades</p>
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
                <p className="text-sm font-medium text-[#1A1D29] mb-1">Ingresos Totales</p>
                <p className="text-3xl font-bold text-[#D0FFA4]">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1A1D29] mb-4">Campeones por Categoría</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categoryChampions.map((champion, index) => (
                  <div 
                    key={index}
                    className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#1A1D29] uppercase">{champion.category}</span>
                      <span className="text-2xl text-[#006EE9]">🏆</span>
                    </div>
                    <p className="font-bold text-[#1A1D29] mb-1">{champion.product}</p>
                    <p className="text-sm text-[#6B7280]">{champion.units.toLocaleString()} unidades</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F7FA]">
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Unidades</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Rendimiento</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-[#1A1D29] uppercase tracking-wider">Ingresos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {products.map((product, index) => {
                    const percentage = (product.units / maxUnits) * 100;
                    
                    return (
                      <tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getMedalBadge(product.rank)}`}>
                              {product.rank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="font-semibold text-[#1A1D29]">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F5F7FA] text-[#1A1D29]">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-[#1A1D29]">{product.units.toLocaleString()}</span>
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
                        <td className="px-6 py-4 text-right font-bold text-[#1A1D29]">
                          ${product.revenue.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}