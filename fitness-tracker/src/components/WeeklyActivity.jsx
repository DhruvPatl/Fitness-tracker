import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import '../styles/WeeklyActivity.css';

const data = [
    { day: 'M', workouts: 1 },
    { day: 'T', workouts: 0 },
    { day: 'W', workouts: 1 },
    { day: 'T', workouts: 1 },
    { day: 'F', workouts: 0 },
    { day: 'S', workouts: 1 },
    { day: 'S', workouts: 0 },
];

const WeeklyActivity = () => {
    return (
        <div className="weekly-activity-card">
            <div className="card-header">
                <h3>Weekly Activity</h3>
                <span className="subtitle">4 Workouts</span>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="workouts" radius={[4, 4, 4, 4]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.workouts > 0 ? '#6366f1' : '#334155'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeeklyActivity;
