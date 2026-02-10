import WeeklyActivity from '../components/WeeklyActivity';
import PersonalRecords from '../components/PersonalRecords';
import QuickStart from '../components/QuickStart';

import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="page dashboard">
            <header className="page-header">
                <h1>Dashboard</h1>
                <p className="welcome-text">Let's get moving, Dhruv.</p>
            </header>

            <QuickStart />
            <WeeklyActivity />
            <PersonalRecords />
        </div>
    );
};

export default Dashboard;
