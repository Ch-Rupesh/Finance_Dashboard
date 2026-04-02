import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  return (
    <FinanceProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <main className="page-content">
            <Dashboard />
          </main>
        </div>
      </div>
    </FinanceProvider>
  );
}
