import Link from 'next/link';

export default function Home() {
  const reports = [
    {
      title: 'Ventas por Categoría',
      description: 'Análisis de ventas organizadas por categoría de producto',
      href: '/reports/category-sales',
      color: 'bg-[#006EE9]',
      initials: 'VC',
    },
    {
      title: 'Estado de Inventario',
      description: 'Monitoreo de stock y alertas de productos',
      href: '/reports/inventory',
      color: 'bg-[#D0FFA4]',
      initials: 'EI',
    },
    {
      title: 'Clientes VIP',
      description: 'Gestión de clientes premium y sus compras',
      href: '/reports/vip-customers',
      color: 'bg-[#E8A0FF]',
      initials: 'CV',
    },
    {
      title: 'Ventas Mensuales',
      description: 'Resumen de ingresos y tendencias por mes',
      href: '/reports/monthly-sales',
      color: 'bg-[#83E7FF]',
      initials: 'VM',
    },
    {
      title: 'Ranking de Productos',
      description: 'Top productos más vendidos por categoría',
      href: '/reports/product-ranking',
      color: 'bg-[#000181]',
      initials: 'RP',
    }
  ];

  const quickStats = [
    { label: 'Ventas Totales', value: '$125,430', change: '+12.5%', positive: true },
    { label: 'Productos Activos', value: '1,234', change: '+8.2%', positive: true },
    { label: 'Clientes VIP', value: '89', change: '-2.3%', positive: false }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-[#000181] mb-4 tracking-tight">
            Panel de Control
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#006EE9] transition-colors duration-300"
            >
              <p className="text-sm font-medium text-[#6B7280] mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#1A1D29]">{stat.value}</p>
                <span className={`text-sm font-semibold ${stat.positive ? 'text-[#D0FFA4]' : 'text-[#E8A0FF]'}`}>
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
              className="group relative bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#006EE9] transition-all duration-300 overflow-hidden hover:shadow-lg"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl ${report.color} flex items-center justify-center text-2xl font-bold ${
                    report.color === 'bg-[#000181]' || report.color === 'bg-[#006EE9]' 
                      ? 'text-white' 
                      : 'text-[#1A1D29]'
                  }`}>
                    {report.initials}
                  </div>
                  <svg 
                    className="w-6 h-6 text-[#6B7280] group-hover:text-[#006EE9] group-hover:translate-x-1 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                <h2 className="text-xl font-bold text-[#1A1D29] mb-2 group-hover:text-[#006EE9] transition-colors duration-300">
                  {report.title}
                </h2>
                
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {report.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}