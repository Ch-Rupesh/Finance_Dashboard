import { useFinance } from '../../context/FinanceContext';
import { Moon, Sun, Menu } from 'lucide-react';
import RoleSwitcher from './RoleSwitcher';

export default function Navbar() {
    const { darkMode, setDarkMode, setSidebarOpen, activeSection } = useFinance();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button
                    className="hamburger-btn"
                    onClick={() => setSidebarOpen(prev => !prev)}
                    aria-label="Toggle sidebar"
                >
                    <Menu size={18} />
                </button>
                <div>
                    <div className="navbar-title">{activeSection}</div>
                </div>
            </div>

            <div className="navbar-right">
                <button
                    className="dark-mode-btn"
                    onClick={() => setDarkMode(d => !d)}
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <RoleSwitcher />
            </div>
        </nav>
    );
}
