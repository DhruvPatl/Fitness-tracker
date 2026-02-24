import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../styles/VolumeChart.css';

const VolumeChart = ({ data }) => {
    return (
        <div className="progress-chart-card">
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#555', fontSize: 10, fontWeight: 500 }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#121212', border: '1px solid #222', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: 'var(--color-primary)' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="volume"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-primary)', strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, stroke: '#000', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default VolumeChart;
