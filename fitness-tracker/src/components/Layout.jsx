import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, PlusCircle, TrendingUp, ClipboardList } from 'lucide-react';
import '../styles/Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <main className="content">
                <Outlet />
            </main>
            <nav className="bottom-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <LayoutDashboard size={24} />
                    <span>Hub</span>
                </NavLink>
                <NavLink to="/plans" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <ClipboardList size={24} />
                    <span>Plans</span>
                </NavLink>
                <NavLink to="/exercises" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Dumbbell size={24} />
                    <span>Library</span>
                </NavLink>
                <NavLink to="/progress" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <TrendingUp size={24} />
                    <span>Progress</span>
                </NavLink>
                <NavLink to="/workout" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <div className="fab">
                        <PlusCircle size={32} />
                    </div>
                </NavLink>
            </nav>
        </div>
    );
};

export default Layout;
