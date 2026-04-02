import { useFinance } from '../../context/FinanceContext';
import { Shield, User } from 'lucide-react';

export default function RoleSwitcher() {
    const { role, setRole } = useFinance();

    return (
        <div className="role-switcher">
            {role === 'Admin' ? <Shield size={14} color="#6c63ff" /> : <User size={14} color="#a8a5c0" />}
            <span className="role-label">Role:</span>
            <select
                className="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role-select"
            >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
            </select>
            <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>
        </div>
    );
}
