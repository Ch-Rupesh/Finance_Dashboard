import { useFinance } from '../../context/FinanceContext';
import {
    LayoutDashboard, ArrowLeftRight, Lightbulb, Settings,
    TrendingUp, X
} from 'lucide-react';

const NAV_ITEMS = [
    {
        section: 'Main', items: [
            { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'Transactions', label: 'Transactions', icon: ArrowLeftRight },
            { id: 'Insights', label: 'Insights', icon: Lightbulb },
        ]
    },
    {
        section: 'System', items: [
            { id: 'Settings', label: 'Settings', icon: Settings },
        ]
    },
];

export default function Sidebar() {
    const { activeSection, setActiveSection, sidebarOpen, setSidebarOpen } = useFinance();

    const handleNav = (id) => {
        setActiveSection(id);
        setSidebarOpen(false);
    };

    return (
        <>
            <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">
                        <TrendingUp size={18} color="white" />
                    </div>
                    <span className="sidebar-logo-text">Finance Dashboard</span>
                    <button
                        className="hamburger-btn"
                        style={{ marginLeft: 'auto', display: 'flex' }}
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={16} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map(({ section, items }) => (
                        <div key={section}>
                            <div className="sidebar-section-label">{section}</div>
                            {items.map(({ id, label, icon: Icon }) => (
                                <div
                                    key={id}
                                    className={`sidebar-nav-item${activeSection === id ? ' active' : ''}`}
                                    onClick={() => handleNav(id)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNav(id)}
                                >
                                    <Icon size={16} className="nav-icon" />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        Finance Dashboard v1.0
                    </div>
                </div>
            </aside>

            <div
                className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />
        </>
    );
}
