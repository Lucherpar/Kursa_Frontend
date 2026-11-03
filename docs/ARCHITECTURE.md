# Arquitectura · Kursa Frontend

## 1. Visión general

Kursa Frontend es una **SPA** con React 18 y Vite que consume la API REST y el canal WebSocket del [backend](https://github.com/Lucherpar/Kursa_Backend).

```
┌─────────────────────────────────────────────────────────┐
│                        App.tsx                          │
│  QueryClientProvider → AuthProvider → SocketProvider    │
│                     BrowserRouter                       │
├─────────────────────────────────────────────────────────┤
│  pages  →  components  →  hooks  →  lib / store          │
│                                           │              │
│                            Axios /api     │ Socket.IO    │
└───────────────────────────────────────────┼──────────────┘
                                            ▼
                                   Kursa Backend
```

## 2. Capas

| Capa | Responsabilidad | Ubicación |
| :--- | :--- | :--- |
| **pages** | Vistas asociadas a una ruta. | `src/pages/` |
| **components** | UI reutilizable y presentacional. | `src/components/` |
| **hooks** | Lógica reutilizable y acceso a estado. | `src/hooks/` |
| **store** | Contextos globales (auth y socket). | `src/store/` |
| **lib** | Cliente HTTP, socket, React Query, utilidades. | `src/lib/` |
| **schemas** | Validaciones Zod. | `src/schemas/` |

Regla de dependencia: las capas superiores consumen las inferiores, nunca al revés.

## 3. Estado

| Tipo de estado | Herramienta | Uso |
| :--- | :--- | :--- |
| Estado del servidor | **TanStack React Query** | Caché, revalidación y carga de datos de la API. |
| Autenticación | **AuthContext** | Usuario, tokens y estado de sesión (persistido en `localStorage`). |
| Tiempo real | **SocketContext** | Conexión Socket.IO y operaciones de sala/chat. |
| Estado local | `useState` / `useReducer` | Estado efímero de componentes. |

## 4. Comunicación con el backend

- **REST**: instancia de Axios en `src/lib/api.ts`, con `baseURL` de `VITE_API_URL`. Un interceptor añade el `Authorization: Bearer` y redirige a `/login` ante un `401`.
- **WebSocket**: cliente en `src/lib/socket.ts` (`getSocket()`), usando `VITE_SOCKET_URL`.

En desarrollo, Vite proxya `/api` y `/socket.io` hacia `http://localhost:4000` (ver `vite.config.ts`).

## 5. Enrutado

`react-router-dom` v6. Las rutas se declaran en `src/App.tsx`.

- Rutas públicas: `/login`, `/register`.
- Rutas protegidas: envueltas en `ProtectedRoute`.
- Redirección de `/` a `/dashboard`.

Detalle en [FRONTEND.md](FRONTEND.md).

## 6. Estilos

- **Tailwind CSS** con variables CSS (`src/styles/globals.css`) para temas.
- Utilidad `cn()` (`clsx` + `tailwind-merge`) para combinar clases sin conflictos.
- Componentes base en `src/components/ui/`.

## 7. Formularios y validación

- **React Hook Form** para el estado del formulario.
- **Zod** para los esquemas (`src/schemas/`) y mensajes de error.
- `@hookform/resolvers` conecta ambos.

## 8. Accesibilidad y responsive

- HTML semántico y etiquetas asociadas a los campos.
- Foco visible y contraste según WCAG.
- Diseño *mobile-first* con utilidades responsive de Tailwind.

## 9. Decisiones de diseño

| Decisión | Motivo |
| :--- | :--- |
| Vite | Arranque y HMR rápidos; build optimizado. |
| React Query | Evita reimplementar caché y estados de carga/error. |
| Context API frente a Redux | El estado global es pequeño (auth y socket). |
| Zod compartido con el backend | Mismas reglas de validación en ambos lados. |
| Tailwind + Radix | UI consistente y accesible sin CSS artesanal. |

## 10. Documentos relacionados

- [FRONTEND.md](FRONTEND.md) · [QUALITY.md](QUALITY.md) · [INSTALLATION.md](INSTALLATION.md)
