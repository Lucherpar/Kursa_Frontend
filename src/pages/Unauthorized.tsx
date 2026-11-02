import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">No autorizado</h1>
      <p className="mb-4">No tienes permisos para acceder a esta pagina.</p>
      <Link to="/" className="text-blue-600 underline">Ir al dashboard</Link>
    </div>
  );
}
