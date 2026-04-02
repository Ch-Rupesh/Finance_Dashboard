import { useFinance } from '../context/FinanceContext';
import SummaryCard from '../components/dashboard/SummaryCard';
import ChartsSection from '../components/dashboard/ChartsSection';
import TransactionTable from '../components/dashboard/TransactionTable';
import InsightsPanel from '../components/dashboard/InsightsPanel';
import TransactionModal from '../components/dashboard/TransactionModal';
import { Wallet, TrendingUp, TrendingDown, Percent } from 'lucide-react';

function fmt(n) {
    return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
}

export default function Dashboard() {
    const { totalBalance, totalIncome, totalExpenses, savingsRate, activeSection } = useFinance();

    const cards = [
        {
            label: 'Total Balance',
            value: fmt(totalBalance),
            icon: Wallet,
            gradient: 'linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%)',
            iconBg: 'rgba(108,99,255,0.3)',
            change: 12.4,
            changeLabel: 'vs last month',
        },
        {
            label: 'Total Income',
            value: fmt(totalIncome),
            icon: TrendingUp,
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            iconBg: 'rgba(16,185,129,0.3)',
            change: 8.1,
            changeLabel: 'vs last month',
        },
        {
            label: 'Total Expenses',
            value: fmt(totalExpenses),
            icon: TrendingDown,
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            iconBg: 'rgba(239,68,68,0.3)',
            change: -3.2,
            changeLabel: 'vs last month',
        },
        {
            label: 'Savings Rate',
            value: `${savingsRate}%`,
            icon: Percent,
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            iconBg: 'rgba(245,158,11,0.3)',
            change: 5.7,
            changeLabel: 'vs last month',
        },
    ];

    return (
        <>
            {activeSection === 'Dashboard' && (
                <>
                    <div className="page-section">
                        <div className="section-header" style={{ marginBottom: 16 }}>
                            <div>
                                <div className="section-title">Overview</div>
                                <div className="section-subtitle">Your financial summary at a glance</div>
                            </div>
                        </div>
                        <div className="summary-grid">
                            {cards.map(card => <SummaryCard key={card.label} {...card} />)}
                        </div>
                    </div>

                    <ChartsSection />
                    <TransactionTable />
                </>
            )}

            {activeSection === 'Transactions' && <TransactionTable />}

            {activeSection === 'Insights' && <InsightsPanel />}

            {activeSection === 'Settings' && (
                <div className="page-section">
                    <div className="section-header">
                        <div>
                            <div className="section-title">Settings</div>
                            <div className="section-subtitle">Application preferences</div>
                        </div>
                    </div>
                    <div className="table-card" style={{ padding: '32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚙️</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Settings panel coming soon. Use the role switcher in the navbar to change your access level.
                        </div>
                    </div>
                </div>
            )}

            <TransactionModal />
        </>
    );
}
