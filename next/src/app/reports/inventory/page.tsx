import Link from 'next/link';

export default function InventoryPage() {
  const inventory = [
    { id: 'P001', name: 'Laptop Dell XPS 15', category: 'Electrónica', stock: 5, minStock: 10, status: 'critical' },
    { id: 'P002', name: 'iPhone 15 Pro', category: 'Electrónica', stock: 15, minStock: 20, status: 'low' },
    { id: 'P003', name: 'Samsung Galaxy S24', category: 'Electrónica', stock: 45, minStock: 25, status: 'optimal' },
    { id: 'P004', name: 'Camiseta Nike Dri-FIT', category: 'Ropa', stock: 120, minStock: 50, status: 'optimal' },
    { id: 'P005', name: 'Zapatillas Adidas', category: 'Deportes', stock: 8, minStock: 15, status: 'critical' },
    { id: 'P006', name: 'Auriculares Sony WH-1000XM5', category: 'Electrónica', stock: 22, minStock: 20, status: 'optimal' },
    { id: 'P007', name: 'Tablet iPad Air', category: 'Electrónica', stock: 12, minStock: 18, status: 'low' },
    { id: 'P008', name: 'Smartwatch Apple Watch', category: 'Electrónica', stock: 3, minStock: 12, status: 'critical' }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border border-red-300';
      case 'low':
        return 'bg-orange-100 text-orange-800 border border-orange-300';
      case 'optimal':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'critical': return 'Crítico';
      case 'low': return 'Bajo';
      case 'optimal': return 'Óptimo';
      default: return 'Desconocido';
    }
  };

  const criticalItems = inventory.filter(item => item.status === 'critical').length;
  const lowItems = inventory.filter(item => item.status === 'low').length;
  const optimalItems = inventory.filter(item => item.status === 'optimal').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-200 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Estado de Inventario</h1>
            <p className="text-green-100 mt-2">Control de stock y alertas de productos</p>
          </div>

          <div className="p-8">
            {criticalItems > 0 && (
              <div className="mb-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">ALERTA DE STOCK CRÍTICO</h3>
                      <p className="text-red-100">{criticalItems} producto(s) requieren atención inmediata</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-blue-600">{inventory.length}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-6 border border-red-200">
                <p className="text-sm font-medium text-red-900 mb-1">Stock Crítico</p>
                <p className="text-3xl font-bold text-red-600">{criticalItems}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
                <p className="text-sm font-medium text-orange-900 mb-1">Stock Bajo</p>
                <p className="text-3xl font-bold text-orange-600">{lowItems}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-1">Stock Óptimo</p>
                <p className="text-3xl font-bold text-green-600">{optimalItems}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock Actual</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock Mínimo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nivel</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inventory.map((item, index) => {
                    const percentage = (item.stock / item.minStock) * 100;
                    const isUrgent = item.status === 'critical';
                    
                    return (
                      <tr 
                        key={index} 
                        className={`hover:bg-gray-50 transition-colors duration-150 ${isUrgent ? 'bg-red-50/50' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {isUrgent && (
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                            )}
                            <div>
                              <p className="font-semibold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`font-bold ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {item.minStock}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                item.status === 'critical' ? 'bg-red-500' :
                                item.status === 'low' ? 'bg-orange-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
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