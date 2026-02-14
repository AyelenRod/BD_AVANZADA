import { Pool, QueryResultRow } from 'pg';

export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
  rowCount: number;
  command: string;
  oid: number;
  fields: Array<{
    name: string;
    tableID: number;
    columnID: number;
    dataTypeID: number;
    dataTypeSize: number;
    dataTypeModifier: number;
    format: string;
  }>;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    const start = Date.now();
    const result = await client.query<T>(text, params);
    const duration = Date.now() - start;

    console.log('Query ejecutada:', {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      duration,
      rows: result.rowCount
    });

    return {
      rows: result.rows,
      rowCount: result.rowCount ?? 0,
      command: result.command,
      oid: result.oid ?? 0,
      fields: result.fields
    };
  } catch (error) {
    console.error('Error en la query:', error);
    throw new Error(`Error de base de datos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  } finally {
    client.release();
  }
}