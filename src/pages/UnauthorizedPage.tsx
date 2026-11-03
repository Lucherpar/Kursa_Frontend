export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
      <p className="text-sm text-muted-foreground">No tienes permisos para ver esta página.</p>
      <a href="/" className="text-sm text-primary hover:underline">Volver al inicio</a>
    </div>
  );
}
