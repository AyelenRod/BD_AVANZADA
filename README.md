# Sistema de Reportes - Base de Datos Avanzada

Este proyecto es un sistema de visualización de reportes basado en una base de datos PostgreSQL, construido con **Next.js** y **Docker**. El objetivo es mostrar diferentes métricas y análisis de datos de manera clara y segura.

## Características Principales

- **Dashboard Principal**: Resumen con indicadores clave (KPIs) y acceso directo a los reportes.
- **Reportes Detallados**:
  - Ventas por Categoría.
  - Estado de Inventario (con filtros).
  - Clientes VIP (con filtros).
  - Reporte Mensual (con gráfica de tendencia).
  - Ranking de Productos por Categoría.
- **Seguridad**:
  - Uso de **Zod** para validación de parámetros.
  - Consultas SQL parametrizadas para evitar SQL Injection.
  - Acceso restringido únicamente a **Vistas** de la base de datos.
- **Paginación**: Todos los reportes cuentan con paginación en el lado del servidor.

## Tecnologías Usadas

- **Frontend**: Next.js 15 (App Router), React, TypeScript.
- **Base de Datos**: PostgreSQL.
- **Estándar de Estilos**: CSS puro (Pink & Purple theme).
- **Contenerización**: Docker y Docker Compose.

## Instalación y Uso

1. **Clonar el repositorio.**
2. **Configurar variables de entorno**: 
   Crea un archivo `.env` en la raíz del proyecto basado en el ejemplo solicitado en clase (User, Password, DB, etc.).
3. **Levantar el proyecto con Docker**:
   ```bash
   docker compose up --build
   ```
4. **Acceder a la aplicación**:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `db/`: Scripts SQL para la creación de tablas, datos, vistas y roles.
- `src/app/`: Lógica de rutas y manejo de parámetros de navegación.
- `src/lib/`: Capa de conexión a base de datos y lógica de consultas (Backend).
- `src/views/`: Componentes visuales y maquetación de los reportes (Frontend).

---
**Ayelen Monserrath Rodriguez Flores** ≽^• ˕ • ྀི≼
