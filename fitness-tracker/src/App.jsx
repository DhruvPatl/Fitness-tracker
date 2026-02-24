import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseDetail from './pages/ExerciseDetail';
import ActiveWorkout from './pages/ActiveWorkout';
import Progress from './pages/Progress';
import Plans from './pages/Plans';
import WorkoutSummary from './pages/WorkoutSummary';
import Auth from './pages/Auth';
import { WorkoutProvider } from './context/WorkoutContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="plans" element={<Plans />} />
              <Route path="exercises" element={<ExerciseLibrary />} />
              <Route path="exercises/:id" element={<ExerciseDetail />} />
              <Route path="progress" element={<Progress />} />
              <Route path="workout" element={<ActiveWorkout />} />
              <Route path="summary" element={<WorkoutSummary />} />
              <Route path="auth" element={<Auth />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  );
}




export default App;
