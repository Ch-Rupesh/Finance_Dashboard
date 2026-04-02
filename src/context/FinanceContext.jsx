import { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const FinanceContext = createContext(null);

const STORAGE_KEY = 'finance_dashboard_transactions';

export function FinanceProvider({ children }) {
    const [role, setRole] = useState('Viewer');
    const [darkMode, setDarkMode] = useState(true);
    const [activeSection, setActiveSection] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [transactions, setTransactions] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : mockTransactions;
        } catch {
            return mockTransactions;
        }
    });

    const [filters, setFilters] = useState({
        search: '',
        category: 'All',
        type: 'All',
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: 'add', // 'add' | 'edit'
        transaction: null,
    });

    // Persist transactions to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }, [transactions]);

    // Apply dark mode class
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const addTransaction = (tx) => {
        const newTx = { ...tx, id: Date.now() };
        setTransactions((prev) => [newTx, ...prev]);
    };

    const updateTransaction = (updated) => {
        setTransactions((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const openAddModal = () => setModalState({ isOpen: true, mode: 'add', transaction: null });
    const openEditModal = (tx) => setModalState({ isOpen: true, mode: 'edit', transaction: tx });
    const closeModal = () => setModalState({ isOpen: false, mode: 'add', transaction: null });

    // Derived summary stats
    const totalIncome = transactions.reduce((s, t) => s + (t.type === 'income' ? t.amount : 0), 0);
    const totalExpenses = transactions.reduce((s, t) => s + (t.type === 'expense' ? t.amount : 0), 0);
    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;

    return (
        <FinanceContext.Provider value={{
            role, setRole,
            darkMode, setDarkMode,
            activeSection, setActiveSection,
            sidebarOpen, setSidebarOpen,
            transactions,
            addTransaction, updateTransaction, deleteTransaction,
            filters, setFilters,
            modalState, openAddModal, openEditModal, closeModal,
            totalIncome, totalExpenses, totalBalance, savingsRate,
        }}>
            {children}
        </FinanceContext.Provider>
    );
}

export const useFinance = () => {
    const ctx = useContext(FinanceContext);
    if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
    return ctx;
};
