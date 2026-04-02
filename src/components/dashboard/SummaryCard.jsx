import { TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCard({ label, value, icon: Icon, gradient, iconBg, change, changeLabel }) {
    const isPositive = change >= 0;

    return (
        <div className="summary-card" style={{ '--card-gradient': gradient }}>
            <div className="summary-card-header">
                <div>
                    <div className="summary-card-label">{label}</div>
                </div>
                <div className="summary-card-icon" style={{ background: iconBg }}>
                    <Icon size={18} color="white" />
                </div>
            </div>

            <div className="summary-card-value">{value}</div>

            <div className="summary-card-footer">
                <span className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {Math.abs(change)}%
                </span>
                <span className="summary-card-sub">{changeLabel}</span>
            </div>
        </div>
    );
}
