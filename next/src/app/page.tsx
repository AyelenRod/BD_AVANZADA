import Link from 'next/link';

export default function Home() {
  const reports = [
    {
      title: 'Ventas por Categoría',
      description: 'Análisis de ventas organizadas por categoría de producto',
      href: '/reports/category-sales',
      gradient: 'from-blue-500 to-blue-raspberry',
    },
    {
      title: 'Estado de Inventario',
      description: 'Monitoreo de stock y alertas de productos',
      href: '/reports/inventory',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Clientes VIP',
      description: 'Gestión de clientes premium y sus compras',
      href: '/reports/vip-customers',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Ventas Mensuales',
      description: 'Resumen de ingresos y tendencias por mes',
      href: '/reports/monthly-sales',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Ranking de Productos',
      description: 'Top productos más vendidos por categoría',
      href: '/reports/product-ranking',
      gradient: 'from-indigo-500 to-blue-600',
    }
  ];

  const quickStats = [
    { label: 'Ventas Totales', value: '$125,430', change: '+12.5%', positive: true },
    { label: 'Productos Activos', value: '1,234', change: '+8.2%', positive: true },
    { label: 'Clientes VIP', value: '89', change: '-2.3%', positive: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sunny-skies/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-night-skies mb-4 tracking-tight">
            Panel de Control
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Sistema de gestión empresarial - Reportes y análisis en tiempo real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-sm font-medium text-text-secondary mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
                <span className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report, index) => (
            <Link
              key={index}
              href={report.href}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${report.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${report.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                  </div>
                  <svg 
                    className="w-6 h-6 text-gray-400 group-hover:text-blue-raspberry group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-blue-raspberry transition-colors duration-300">
                  {report.title}
                </h2>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {report.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary">
            Sistema desarrollado con Next.js y Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}