# Tarea 6 - Lab Reports Dashboard

Sistema de reportes empresariales con Next.js y PostgreSQL, desplegado con Docker Compose.

## Inicio Rapido

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tarea-6-reports.git
cd tarea-6-reports

# Iniciar todo con un solo comando
docker compose up --build
```

La aplicacion estara disponible en: **http://localhost:3000**

## Estructura del Proyecto

```
tarea-6-reports/
├── docker-compose.yml      # Orquestacion de servicios
├── db/                     # Scripts SQL (se ejecutan automaticamente)
│   ├── 01_schema.sql       # Esquema de tablas
│   ├── 02_seed.sql         # Datos de prueba
│   ├── 03_reports_vw.sql   # 5 Vistas de reportes
│   ├── 04_indexes.sql      # Indices optimizados
│   └── 05_roles.sql        # Rol app_client con permisos minimos
└── next/                   # Aplicacion Next.js
    ├── Dockerfile          # Build multi-stage para produccion
    └── src/
        ├── lib/            # Conexion DB, tipos, schemas Zod
        └── app/reports/    # 5 paginas de reportes
```

## Servicios Docker

| Servicio | Puerto | Descripcion |
|----------|--------|-------------|
| `db` | 5433 | PostgreSQL 16 |
| `app` | 3000 | Next.js Dashboard |

## Reportes Disponibles

| Reporte | Vista SQL | Caracteristicas |
|---------|-----------|-----------------|
| Ventas por Categoria | `view_category_sales` | Filtros Zod, Paginacion |
| Estado de Inventario | `view_inventory_status` | Alertas de stock |
| Clientes VIP | `view_vip_customers` | Filtros Zod, Paginacion |
| Ventas Mensuales | `view_monthly_sales` | Filtros Zod, Paginacion |
| Ranking de Productos | `view_product_ranking` | Filtros Zod, Paginacion |

## Requisitos SQL Cumplidos

### Funciones y Clausulas
- **Funciones Agregadas**: SUM, COUNT, AVG, MAX
- **GROUP BY**: Agrupacion por categoria, cliente, mes
- **HAVING**: Filtrado post-agregacion (2 vistas)
- **CASE**: Clasificacion condicional (2 vistas)
- **COALESCE**: Manejo de valores nulos
- **CTE (WITH)**: Common Table Expression en ventas mensuales
- **Window Functions**: DENSE_RANK para ranking de productos

### Indices con Justificacion

```sql
-- idx_orders_customer_id
-- Optimiza JOINs entre orders y customers en view_vip_customers y view_monthly_sales

-- idx_order_items_product_id  
-- Acelera calculos de totales en las 4 vistas que usan order_items

-- idx_products_category
-- Mejora agrupamiento y particionamiento por categoria
```

### Seguridad
El rol `app_client` tiene permisos minimos:
- Solo SELECT en las 5 vistas
- Sin acceso a tablas base
- Tablas futuras no accesibles automaticamente

## Desarrollo Local

```bash
cd next
npm install
npm run dev
```

Requiere PostgreSQL ejecutandose en el puerto 5433 o configurar `DATABASE_URL` en `.env.local`:

```env
DATABASE_URL=postgres://app_client:contra123@localhost:5433/bda
```

## Comandos Utiles

```bash
# Iniciar servicios
docker compose up --build

# Detener servicios
docker compose down

# Ver logs
docker compose logs -f

# Reiniciar solo la app
docker compose restart app

# Acceder a PostgreSQL
docker exec -it postgres_db psql -U ejemplo -d bda
```

## Autor

Ayelen Rodriguez - Bases de Datos Avanzadas - 5to Cuatrimestre
