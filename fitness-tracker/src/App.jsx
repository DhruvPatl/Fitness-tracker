import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseDetail from './pages/ExerciseDetail';
import ActiveWorkout from './pages/ActiveWorkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="exercises/:id" element={<ExerciseDetail />} />
          <Route path="workout" element={<ActiveWorkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
