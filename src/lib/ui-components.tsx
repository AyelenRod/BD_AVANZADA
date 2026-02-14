import React from 'react';

interface ReportTableProps {
    columns: { header: string; key: string; format?: (val: unknown) => string }[];
    data: Record<string, unknown>[];
}

export function ReportTable({ columns, data }: ReportTableProps) {
    return (
        <table style={{ marginTop: '10px', marginBottom: '10px' }}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.format ? col.format(row[col.key]) : String(row[col.key] ?? '')}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} style={{ textAlign: 'center', color: 'gray' }}>No hay datos disponibles con estos filtros.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export function KPIHighlight({ label, value, description }: { label: string; value: string; description?: string }) {
    return (
        <div className="kpi-card">
            <div style={{ fontWeight: 'bold', color: '#c2185b' }}>{label}</div>
            <div style={{ fontSize: '24px', color: '#9c27b0', fontWeight: 'bold' }}>{value}</div>
            {description && <div style={{ fontSize: '12px', color: '#880e4f' }}>{description}</div>}
        </div>
    );
}

export function Pagination({ currentPage, hasNext }: { currentPage: number; hasNext: boolean }) {
    return (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <a
                href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
                className="btn"
                style={{ opacity: currentPage > 1 ? 1 : 0.5, pointerEvents: currentPage > 1 ? 'auto' : 'none' }}
            >
                Anterior
            </a>
            <span style={{ color: '#880e4f', fontWeight: 'bold' }}>Página {currentPage}</span>
            <a
                href={hasNext ? `?page=${currentPage + 1}` : '#'}
                className="btn"
                style={{ opacity: hasNext ? 1 : 0.5, pointerEvents: hasNext ? 'auto' : 'none' }}
            >
                Siguiente
            </a>
        </div>
    );
}
