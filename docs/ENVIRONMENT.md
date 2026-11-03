# Variables de entorno · Kursa Frontend

Vite solo expone al cliente las variables que empiezan por `VITE_`. Se leen con `import.meta.env`.

> Nunca subas `.env` al repositorio. Usa `.env.example` como plantilla.

| Variable | Obligatoria | Por defecto | Descripción |
| :--- | :---: | :--- | :--- |
| `VITE_API_URL` | ❌ | `http://localhost:4000/api` | URL base de la API REST. |
| `VITE_SOCKET_URL` | ❌ | `http://localhost:4000` | URL del servidor Socket.IO. |

## Ejemplo

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

## Entornos

| Entorno | `VITE_API_URL` | Dónde se configura |
| :--- | :--- | :--- |
| Desarrollo | `http://localhost:4000/api` | `.env` local |
| Producción | URL pública del backend | Panel del proveedor (Vercel/Netlify, etc.) |

## Notas

- Los cambios en `.env` requieren reiniciar el servidor de desarrollo.
- En producción, configura estas variables en el panel del hosting antes del build.
- No incluyas secretos en variables `VITE_*`: se exponen en el bundle del navegador.
