import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function EstudiantePage() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel Estudiante</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Salir</button>
      </div>
      <p className="mb-4">Hola {user?.name}, rol: {user?.role}</p>
      <Link to="/" className="text-blue-600 underline">Volver al dashboard</Link>
    </div>
  );
}
