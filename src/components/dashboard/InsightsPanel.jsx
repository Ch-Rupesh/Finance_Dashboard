import { useFinance } from '../../context/FinanceContext';
import { spendingBreakdownData, getPreviousMonthData } from '../../data/mockData';
import { TrendingUp, TrendingDown, PiggyBank, Zap, Award, BarChart2 } from 'lucide-react';

function formatCurrency(v) {
    return `$${Number(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function InsightsPanel() {
    const { totalIncome, totalExpenses, savingsRate } = useFinance();
    const prev = getPreviousMonthData();

    const topSpend = [...spendingBreakdownData].sort((a, b) => b.value - a.value)[0];
    const savings = totalIncome - totalExpenses;
    const expenseDelta = totalExpenses - prev.totalExpenses;
    const expenseChange = ((expenseDelta / prev.totalExpenses) * 100).toFixed(1);
    const savingsDelta = savings - prev.savings;
    const savingsChange = ((savingsDelta / prev.savings) * 100).toFixed(1);

    const foodEntry = spendingBreakdownData.find(s => s.name === 'Food');
    const foodChange = 18; // mock statistic insight

    const insights = [
        {
            icon: Award,
            iconBg: 'rgba(108,99,255,0.15)',
            iconColor: '#6c63ff',
            cardAccent: 'rgba(108,99,255,0.06)',
            borderColor: 'rgba(108,99,255,0.3)',
            label: 'Highest Spending Category',
            value: topSpend.name,
            note: <>You've spent <strong>{formatCurrency(topSpend.value)}</strong> on {topSpend.name} overall — your biggest expense category.</>,
        },
        {
            icon: expenseDelta >= 0 ? TrendingUp : TrendingDown,
            iconBg: expenseDelta >= 0 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
            iconColor: expenseDelta >= 0 ? '#ef4444' : '#10b981',
            cardAccent: expenseDelta >= 0 ? 'rgba(239,68,68,0.06)' : 'rgba(16,185,129,0.06)',
            borderColor: expenseDelta >= 0 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)',
            label: 'Expenses vs Last Month',
            value: `${expenseDelta >= 0 ? '+' : ''}${expenseChange}%`,
            note: <>Total expenses changed by <strong>{formatCurrency(Math.abs(expenseDelta))}</strong> compared to last month ({formatCurrency(prev.totalExpenses)}).</>,
        },
        {
            icon: PiggyBank,
            iconBg: 'rgba(16,185,129,0.15)',
            iconColor: '#10b981',
            cardAccent: 'rgba(16,185,129,0.06)',
            borderColor: 'rgba(16,185,129,0.3)',
            label: 'Total Savings (All-time)',
            value: formatCurrency(savings),
            note: <>Your savings rate is <strong>{savingsRate}%</strong>. {savingsDelta >= 0 ? `You've saved ${formatCurrency(savingsDelta)} more than last month.` : `Down ${formatCurrency(Math.abs(savingsDelta))} from last month.`}</>,
        },
        {
            icon: Zap,
            iconBg: 'rgba(245,158,11,0.15)',
            iconColor: '#f59e0b',
            cardAccent: 'rgba(245,158,11,0.06)',
            borderColor: 'rgba(245,158,11,0.3)',
            label: 'Smart Observation',
            value: `+${foodChange}% Food`,
            note: <>Spending on <strong>Food</strong> increased by {foodChange}% compared to last month. Consider setting a budget limit to stay on track.</>,
        },
    ];

    return (
        <div className="page-section">
            <div className="section-header">
                <div>
                    <div className="section-title">Insights</div>
                    <div className="section-subtitle">AI-powered financial observations</div>
                </div>
            </div>

            <div className="insights-grid">
                {insights.map((ins, i) => (
                    <div
                        key={i}
                        className="insight-card"
                        style={{
                            '--card-accent': ins.cardAccent,
                            '--card-border-color': ins.borderColor,
                        }}
                    >
                        <div className="insight-icon-wrap" style={{ background: ins.iconBg }}>
                            <ins.icon size={20} color={ins.iconColor} />
                        </div>
                        <div className="insight-label">{ins.label}</div>
                        <div className="insight-value">{ins.value}</div>
                        <div className="insight-note">{ins.note}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
