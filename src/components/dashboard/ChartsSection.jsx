import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Tooltip as PieTooltip, Legend
} from 'recharts';
import { balanceTrendData, spendingBreakdownData } from '../../data/mockData';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';

const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                boxShadow: 'var(--shadow-md)',
            }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    ${payload[0].value.toLocaleString()}
                </div>
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                boxShadow: 'var(--shadow-md)',
            }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{payload[0].name}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: payload[0].payload.color }}>
                    ${payload[0].value.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {payload[0].payload.percent ? `${(payload[0].payload.percent * 100).toFixed(1)}%` : ''}
                </div>
            </div>
        );
    }
    return null;
};

export default function ChartsSection() {
    return (
        <div className="charts-grid page-section">
            {/* Line Chart */}
            <div className="chart-card">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">Balance Trend</div>
                        <div className="chart-subtitle">Last 6 months · Net balance over time</div>
                    </div>
                    <TrendingUp size={16} color="var(--accent-primary)" />
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={balanceTrendData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            width={40}
                        />
                        <Tooltip content={<CustomLineTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#6c63ff"
                            strokeWidth={2.5}
                            dot={{ fill: '#6c63ff', strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, fill: '#6c63ff', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie/Donut Chart */}
            <div className="chart-card">
                <div className="chart-header">
                    <div>
                        <div className="chart-title">Spending Breakdown</div>
                        <div className="chart-subtitle">By category · All-time</div>
                    </div>
                    <PieIcon size={16} color="var(--accent-secondary)" />
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie
                            data={spendingBreakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {spendingBreakdownData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                            ))}
                        </Pie>
                        <PieTooltip content={<CustomPieTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                    {spendingBreakdownData.map((item) => (
                        <div key={item.name} className="legend-item">
                            <div className="legend-dot" style={{ background: item.color }} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
