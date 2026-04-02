import { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES } from '../../data/mockData';
import {
    Search, Filter, ChevronUp, ChevronDown, ChevronsUpDown,
    Edit2, Trash2, Plus, ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react';

const PAGE_SIZE = 8;

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TransactionTable() {
    const { transactions, filters, setFilters, role, openAddModal, openEditModal, deleteTransaction } = useFinance();
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
        setPage(1);
    };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="sort-icon" />;
        return sortDir === 'asc'
            ? <ChevronUp size={12} className="sort-icon" />
            : <ChevronDown size={12} className="sort-icon" />;
    };

    const filtered = useMemo(() => {
        let list = [...transactions];

        if (filters.search) {
            const q = filters.search.toLowerCase();
            list = list.filter(t =>
                t.description.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
            );
        }
        if (filters.category !== 'All') list = list.filter(t => t.category === filters.category);
        if (filters.type !== 'All') list = list.filter(t => t.type === filters.type);

        list.sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (sortKey === 'date') { av = new Date(av); bv = new Date(bv); }
            if (sortKey === 'amount') { av = Number(av); bv = Number(bv); }
            return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
        });

        return list;
    }, [transactions, filters, sortKey, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleFilterChange = (key, value) => {
        setFilters(f => ({ ...f, [key]: value }));
        setPage(1);
    };

    return (
        <div className="page-section">
            <div className="section-header">
                <div>
                    <div className="section-title">Transactions</div>
                    <div className="section-subtitle">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
                </div>
                {role === 'Admin' && (
                    <button className="btn btn-primary" onClick={openAddModal} id="add-transaction-btn">
                        <Plus size={15} /> Add Transaction
                    </button>
                )}
            </div>

            <div className="table-card">
                {/* Toolbar */}
                <div className="table-toolbar">
                    <div className="search-wrapper">
                        <Search size={14} className="search-icon" />
                        <input
                            className="search-input"
                            placeholder="Search transactions..."
                            value={filters.search}
                            onChange={e => handleFilterChange('search', e.target.value)}
                            id="search-transactions"
                        />
                    </div>

                    <select
                        className="filter-select"
                        value={filters.category}
                        onChange={e => handleFilterChange('category', e.target.value)}
                        id="filter-category"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                        className="filter-select"
                        value={filters.type}
                        onChange={e => handleFilterChange('type', e.target.value)}
                        id="filter-type"
                    >
                        <option value="All">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Table */}
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th className="sortable" onClick={() => handleSort('date')}>
                                    Date <SortIcon col="date" />
                                </th>
                                <th>Description</th>
                                <th className="sortable" onClick={() => handleSort('amount')}>
                                    Amount <SortIcon col="amount" />
                                </th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Status</th>
                                {role === 'Admin' && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={role === 'Admin' ? 7 : 6}>
                                        <div className="empty-state">
                                            <AlertCircle size={40} className="empty-icon" />
                                            <span className="empty-text">No transactions found</span>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                                Try adjusting your search or filters
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginated.map(tx => (
                                <tr key={tx.id}>
                                    <td>{formatDate(tx.date)}</td>
                                    <td className="transaction-desc">{tx.description}</td>
                                    <td className={`amount-cell ${tx.type}`}>
                                        {tx.type === 'expense' ? '-' : '+'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td><span className="category-pill">{tx.category}</span></td>
                                    <td>
                                        <span className={`type-badge ${tx.type}`}>
                                            {tx.type === 'income' ? '↑' : '↓'} {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${tx.status.toLowerCase()}`}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                                            {tx.status}
                                        </span>
                                    </td>
                                    {role === 'Admin' && (
                                        <td>
                                            <button
                                                className="action-btn"
                                                onClick={() => openEditModal(tx)}
                                                title="Edit"
                                            >
                                                <Edit2 size={13} />
                                            </button>
                                            <button
                                                className="action-btn delete"
                                                onClick={() => deleteTransaction(tx.id)}
                                                title="Delete"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="table-footer">
                    <span>
                        Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                    </span>
                    <div className="pagination">
                        <button className="page-btn" onClick={() => setPage(1)} disabled={page === 1} aria-label="First page">«</button>
                        <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => Math.abs(p - page) <= 2)
                            .map(p => (
                                <button
                                    key={p}
                                    className={`page-btn${p === page ? ' active' : ''}`}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            ))}
                        <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                            <ChevronRight size={14} />
                        </button>
                        <button className="page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages} aria-label="Last page">»</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
