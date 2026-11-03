# Instalación · Kursa Frontend

## 1. Requisitos

- **Node.js 20+** y **npm 10+**
- **Git**
- El **backend** de Kursa en ejecución (ver [Kursa Backend](https://github.com/Lucherpar/Kursa_Backend)).

Comprueba las versiones:

```bash
node -v
npm -v
```

## 2. Clonar el repositorio

```bash
git clone https://github.com/Lucherpar/Kursa_Frontend.git
cd Kursa_Frontend
```

## 3. Instalar dependencias

```bash
npm ci
```

> Usa `npm ci` para instalaciones reproducibles. Usa `npm install` solo si vas a añadir o actualizar dependencias.

## 4. Configurar variables de entorno

```bash
cp .env.example .env
```

Contenido por defecto:

```env
VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000
```

Si el backend corre en otra URL o puerto, ajusta estos valores. Consulta [ENVIRONMENT.md](ENVIRONMENT.md).

## 5. Arrancar en desarrollo

```bash
npm run dev
```

La aplicación estará en `http://localhost:5173`.

> El backend debe estar levantado en `http://localhost:4000` para que las peticiones funcionen. Vite proxya `/api` y `/socket.io` hacia ese puerto.

## 6. Compilar para producción

```bash
npm run build     # genera dist/
npm run preview   # sirve el resultado localmente
```

El contenido de `dist/` puede desplegarse en cualquier hosting estático (Vercel, Netlify, etc.).

## 7. Ejecutar los tests

```bash
npm run test
npm run test:coverage   # opcional
```

Obligatorio según [QUALITY.md](QUALITY.md).

## 8. Comprobar el lint

```bash
npm run lint
```

## 9. Solución de problemas

| Problema | Causa probable | Solución |
| :--- | :--- | :--- |
| `npm run build` falla con errores de tipos | Cambios sin tipar o imports rotos. | Revisa la salida de `tsc`; ejecuta `npm run test`. |
| Peticiones `ERR_CONNECTION_REFUSED` | El backend no está corriendo. | Arranca el backend en `http://localhost:4000`. |
| Error de CORS | `CORS_ORIGIN` del backend no coincide. | Ajusta `CORS_ORIGIN`/`SOCKET_ORIGIN` en el backend. |
| Socket no conecta | `VITE_SOCKET_URL` incorrecta. | Revisa `.env` y reinicia Vite. |
| Pantalla en blanco tras login | Token inválido o backend caído. | Revisa la consola y el estado del backend. |

## 10. Repositorio hermano

El backend se instala por separado: [Kursa Backend](https://github.com/Lucherpar/Kursa_Backend).
