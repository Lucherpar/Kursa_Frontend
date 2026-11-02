import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Kursa</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Salir</button>
      </div>
      <p className="mb-4">Bienvenido, {user?.name} ({user?.role})</p>
      <nav className="flex gap-4">
        {user?.role === 'admin' && <Link to="/admin" className="text-blue-600 underline">Panel Admin</Link>}
        {user?.role === 'profesor' && <Link to="/profesor" className="text-blue-600 underline">Panel Profesor</Link>}
        {user?.role === 'estudiante' && <Link to="/estudiante" className="text-blue-600 underline">Panel Estudiante</Link>}
      </nav>
    </div>
  );
}
