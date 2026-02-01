# Next.js Reports Dashboard

## Descripcion
Dashboard de reportes empresariales conectado a PostgreSQL con Docker Compose.
Implementa 5 vistas SQL con funciones agregadas, filtros Zod y paginacion server-side.

## Requisitos
- Docker y Docker Compose
- Node.js 18+ (solo para desarrollo)

## Ejecucion

### Con Docker (Produccion)
```bash
docker-compose up --build
```
La aplicacion estara disponible en http://localhost:3000

### Desarrollo Local
```bash
cd next
npm install
npm run dev
```

## Estructura de la Base de Datos

### Tablas
- customers: Clientes (id, name, email, country)
- products: Productos (id, name, category, price, stock)
- orders: Ordenes (id, customer_id, status, order_date)
- order_items: Detalle de ordenes (order_id, product_id, quantity, unit_price)

### Vistas de Reportes
1. view_category_sales: Ventas por categoria con SUM, COUNT, GROUP BY, HAVING
2. view_inventory_status: Estado de inventario con CASE, COALESCE
3. view_vip_customers: Clientes VIP con HAVING, CASE, MAX, SUM
4. view_monthly_sales: Ventas mensuales con CTE (WITH)
5. view_product_ranking: Ranking de productos con DENSE_RANK (Window Function)

## Justificacion de Indices

### idx_orders_customer_id
Las vistas view_vip_customers y view_monthly_sales hacen JOIN constante entre orders y customers.
Indexar la FK acelera drasticamente estos cruces.

### idx_order_items_product_id
Casi todas las vistas (1, 3, 4, 5) hacen JOIN con order_items para calcular totales.
Este indice es vital para evitar table scans masivos.

### idx_products_category
La view_category_sales agrupa por categoria y view_product_ranking particiona por categoria.
Este indice optimiza el agrupamiento.

## Seguridad
El rol app_client tiene permisos minimos:
- Solo puede hacer SELECT en las 5 vistas
- No tiene acceso a las tablas base
- Las futuras tablas no son accesibles automaticamente

## Tecnologias
- PostgreSQL 16
- Next.js 15 con App Router
- TypeScript
- Zod para validacion de filtros
- Tailwind CSS