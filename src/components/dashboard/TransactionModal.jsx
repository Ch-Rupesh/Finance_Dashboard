import { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { CATEGORIES } from '../../data/mockData';
import { X } from 'lucide-react';

const EMPTY_FORM = {
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    status: 'Completed',
};

export default function TransactionModal() {
    const { modalState, closeModal, addTransaction, updateTransaction } = useFinance();
    const { isOpen, mode, transaction } = modalState;

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            setErrors({});
            setForm(mode === 'edit' && transaction
                ? { ...transaction, amount: String(transaction.amount) }
                : EMPTY_FORM
            );
        }
    }, [isOpen, mode, transaction]);

    if (!isOpen) return null;

    const validate = () => {
        const e = {};
        if (!form.description.trim()) e.description = 'Description is required';
        if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
            e.amount = 'Enter a valid positive amount';
        if (!form.date) e.date = 'Date is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const tx = { ...form, amount: parseFloat(form.amount) };
        if (mode === 'edit') {
            updateTransaction({ ...transaction, ...tx });
        } else {
            addTransaction(tx);
        }
        closeModal();
    };

    const handleChange = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }));
    };

    return (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className="modal-header">
                    <h2 className="modal-title" id="modal-title">
                        {mode === 'edit' ? 'Edit Transaction' : 'Add Transaction'}
                    </h2>
                    <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                        <X size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <input
                                className="form-input"
                                placeholder="e.g. Grocery Store"
                                value={form.description}
                                onChange={handleChange('description')}
                                id="form-description"
                            />
                            {errors.description && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.description}</span>
                            )}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Amount ($)</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={form.amount}
                                    onChange={handleChange('amount')}
                                    id="form-amount"
                                />
                                {errors.amount && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.amount}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange('date')}
                                    id="form-date"
                                />
                                {errors.date && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.date}</span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-input"
                                    value={form.category}
                                    onChange={handleChange('category')}
                                    id="form-category"
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select
                                    className="form-input"
                                    value={form.type}
                                    onChange={handleChange('type')}
                                    id="form-type"
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select
                                className="form-input"
                                value={form.status}
                                onChange={handleChange('status')}
                                id="form-status"
                            >
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-ghost" onClick={closeModal}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" id="modal-submit-btn">
                            {mode === 'edit' ? 'Save Changes' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
