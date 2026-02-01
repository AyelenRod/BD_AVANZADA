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

  const getMedalEmoji = (medal: string | null) => {
    switch(medal) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return null;
    }
  };

  const getMedalBadge = (rank: number) => {
    if (rank === 1) {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    } else if (rank === 2) {
      return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    } else if (rank === 3) {
      return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    }
    return 'bg-gray-100 text-gray-700';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-indigo-600 hover:text-blue-600 transition-colors duration-200 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Ranking de Productos</h1>
            <p className="text-indigo-100 mt-2">Top 10 productos más vendidos por unidades</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm font-medium text-purple-900 mb-1">Unidades Vendidas</p>
                <p className="text-3xl font-bold text-purple-600">{totalUnits.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-1">Ingresos Totales</p>
                <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Campeones por Categoría</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categoryChampions.map((champion, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-6 border-2 border-yellow-300 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-yellow-800 uppercase">{champion.category}</span>
                      <span className="text-2xl">🏆</span>
                    </div>
                    <p className="font-bold text-gray-900 mb-1">{champion.product}</p>
                    <p className="text-sm text-gray-600">{champion.units.toLocaleString()} unidades</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Ranking</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Unidades</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rendimiento</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Ingresos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, index) => {
                    const percentage = (product.units / maxUnits) * 100;
                    const medal = getMedalEmoji(product.medal);
                    
                    return (
                      <tr key={index} className="hover:bg-indigo-50/30 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ${getMedalBadge(product.rank)}`}>
                              {medal || product.rank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {product.rank === 1 && (
                              <span className="text-yellow-500 mr-2 text-lg animate-pulse">⭐</span>
                            )}
                            <span className="font-semibold text-gray-900">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-gray-900">{product.units.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600 w-12">{percentage.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">
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