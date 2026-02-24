import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import '../styles/WeeklyActivity.css';

const WeeklyActivity = () => {
    const { getWeeklyStats } = useWorkoutHistory();
    const data = getWeeklyStats();

    // Calculate total workouts for the week
    const totalWorkouts = data.reduce((acc, curr) => acc + curr.workouts, 0);

    return (
        <div className="weekly-activity-card">
            <div className="card-header">
                <h3>Weekly Activity</h3>
                <span className="subtitle">{totalWorkouts} Workouts</span>
            </div>
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={4}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888888', fontSize: 10, fontWeight: 500 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#121212', border: '1px solid #222', borderRadius: '8px', color: '#fff' }}
                        />
                        <Bar dataKey="workouts" radius={[10, 10, 10, 10]} barSize={12}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.workouts > 0 ? 'var(--color-primary)' : '#1a1a1a'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeeklyActivity;
