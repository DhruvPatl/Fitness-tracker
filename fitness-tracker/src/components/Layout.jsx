import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, PlusCircle } from 'lucide-react';
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
                <NavLink to="/workout" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <div className="fab">
                        <PlusCircle size={32} />
                    </div>
                </NavLink>
                <NavLink to="/exercises" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <Dumbbell size={24} />
                    <span>Exercises</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Layout;
