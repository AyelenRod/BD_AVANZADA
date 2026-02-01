import Link from 'next/link';

export default function VIPCustomersPage() {
  const customers = [
    { id: 'C001', name: 'María González', email: 'maria.g@email.com', orders: 45, spending: 15230, tier: 'gold' },
    { id: 'C002', name: 'Carlos Ramírez', email: 'carlos.r@email.com', orders: 38, spending: 12450, tier: 'gold' },
    { id: 'C003', name: 'Ana Martínez', email: 'ana.m@email.com', orders: 28, spending: 8920, tier: 'silver' },
    { id: 'C004', name: 'Luis Hernández', email: 'luis.h@email.com', orders: 52, spending: 18760, tier: 'gold' },
    { id: 'C005', name: 'Patricia López', email: 'patricia.l@email.com', orders: 22, spending: 7340, tier: 'silver' },
    { id: 'C006', name: 'Roberto Silva', email: 'roberto.s@email.com', orders: 41, spending: 13890, tier: 'gold' },
    { id: 'C007', name: 'Carmen Torres', email: 'carmen.t@email.com', orders: 19, spending: 6210, tier: 'silver' },
    { id: 'C008', name: 'Diego Vargas', email: 'diego.v@email.com', orders: 33, spending: 10540, tier: 'silver' }
  ];

  const goldCustomers = customers.filter(c => c.tier === 'gold').length;
  const silverCustomers = customers.filter(c => c.tier === 'silver').length;
  const totalSpending = customers.reduce((sum, c) => sum + c.spending, 0);
  const avgSpending = totalSpending / customers.length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getTierBadge = (tier: string) => {
    if (tier === 'gold') {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Gold
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-md">
        Silver
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-100/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-yellow-600 hover:text-orange-600 transition-colors duration-200 font-medium group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Clientes VIP</h1>
            <p className="text-yellow-100 mt-2">Gestión de clientes premium y análisis de compras</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-200">
                <p className="text-sm font-medium text-purple-900 mb-1">Total VIP</p>
                <p className="text-3xl font-bold text-purple-600">{customers.length}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-xl p-6 border border-yellow-300">
                <p className="text-sm font-medium text-yellow-900 mb-1">Clientes Gold</p>
                <p className="text-3xl font-bold text-yellow-600">{goldCustomers}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-300">
                <p className="text-sm font-medium text-gray-900 mb-1">Clientes Silver</p>
                <p className="text-3xl font-bold text-gray-600">{silverCustomers}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-6 border border-green-200">
                <p className="text-sm font-medium text-green-900 mb-1">Gasto Promedio</p>
                <p className="text-3xl font-bold text-green-600">${avgSpending.toFixed(0)}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contacto</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Pedidos</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Gasto Total</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Nivel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer, index) => (
                    <tr key={index} className="hover:bg-yellow-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg ${
                            customer.tier === 'gold' 
                              ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                              : 'bg-gradient-to-br from-gray-400 to-gray-600'
                          }`}>
                            {getInitials(customer.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {customer.orders}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        ${customer.spending.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getTierBadge(customer.tier)}
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