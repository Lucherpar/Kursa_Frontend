# Guía del frontend · Kursa

## 1. Rutas

Las rutas se definen en `src/App.tsx` con React Router v6.

| Ruta | Vista | Acceso |
| :--- | :--- | :--- |
| `/login` | `LoginPage` | Público |
| `/register` | `RegisterPage` | Público |
| `/dashboard` | `DashboardPage` | Protegido |
| `/courses/:courseId` | `CoursePage` | Público |
| `/subjects/:subjectId` | `SubjectPage` | Público |
| `/lessons/:lessonId` | `LessonPage` | Público |
| `/assignments/:assignmentId` | `AssignmentPage` | Autenticado |
| `/grades` | `GradesPage` | Autenticado |
| `/profile` | `ProfilePage` | Autenticado |
| `/videocall/:roomId` | `VideoCallPage` | Autenticado |
| `/recordings/:subjectId` | `RecordingsPage` | Autenticado |
| `/` | Redirección | → `/dashboard` |

## 2. Providers

El árbol de providers en `App.tsx` es:

```
QueryClientProvider → AuthProvider → SocketProvider → BrowserRouter → Routes
```

- **QueryClientProvider**: caché de datos del servidor.
- **AuthProvider**: sesión del usuario y tokens.
- **SocketProvider**: conexión Socket.IO.
- **BrowserRouter**: enrutado.

## 3. Componentes

### `src/components/ui/`

| Componente | Descripción |
| :--- | :--- |
| `Button` | Botón con variantes (`default`, `destructive`, `outline`, `secondary`, `ghost`). |
| `Card`, `CardHeader`, `CardTitle`, `CardContent` | Contenedores de contenido. |
| `Input` | Campo de texto. |
| `Label` | Etiqueta accesible. |

### `src/components/layout/`

| Componente | Descripción |
| :--- | :--- |
| `Sidebar` | Barra lateral. |
| `Navbar` | Barra superior. |
| `AppLayout` | Shell autenticado: sidebar + navbar + contenido. |
| `ProtectedRoute` | Envoltorio para rutas protegidas. |

### `src/components/content/`

| Componente | Descripción |
| :--- | :--- |
| `TextContent` | Renderiza contenido HTML/texto. |
| `ImageGallery` | Galería de imágenes. |
| `VideoPlayer` | Reproductor de vídeo. |

### `src/components/common/`

| Componente | Descripción |
| :--- | :--- |
| `LessonCard` | Tarjeta de lección. |
| `DropzoneZone` | Zona de arrastrar y soltar archivos. |

## 4. Hooks

| Hook | Descripción |
| :--- | :--- |
| `useAuth` | Acceso al contexto de autenticación. |
| `useAuthApi` | Cliente HTTP con manejo de `401`. |
| `useAuthForms` | Esquemas y valores por defecto de login/registro. |
| `useMedia` | Consultas `matchMedia` reactivas. |
| `useSocketConnection` | Acceso al socket. |

## 5. Estado global

| Contexto | Archivo | Expone |
| :--- | :--- | :--- |
| `AuthContext` | `src/store/AuthContext.tsx` | `user`, `token`, `login`, `logout`, `isAuthenticated`. |
| `SocketContext` | `src/store/SocketContext.tsx` | `socket`, `joinRoom`, `leaveRoom`, `sendSignal`, `sendChat`. |

La sesión se persiste en `localStorage` (`accessToken`, `refreshToken`, `user`).

## 6. Cliente HTTP

`src/lib/api.ts` crea una instancia de Axios:

- `baseURL = VITE_API_URL`.
- Interceptor de petición: añade `Authorization: Bearer <token>`.
- Interceptor de respuesta: ante `401`, intenta renovar el access token con `POST /auth/refresh` (una sola vez, evitando peticiones duplicadas) y reintenta la petición original. Si el refresh falla, limpia la sesión y redirige a `/login`.
- Al arrancar, `AuthContext` revalida la sesión con `GET /auth/me` cuando existe un token guardado.

## 7. Añadir una página nueva

1. Crea el componente en `src/pages/MiPagina.tsx`.
2. Añade la ruta en `src/App.tsx`.
3. Si requiere datos, usa `useQuery` de React Query.
4. Si requiere autenticación, envuélvela en `ProtectedRoute`.
5. Añade un test si contiene lógica relevante.

## 8. Estilos

- Variables de tema en `src/styles/globals.css`.
- Utilidades de Tailwind en `tailwind.config.ts`.
- Combina clases con `cn()` de `src/lib/utils.ts`.

## 9. Convenciones

- Componentes en `PascalCase`.
- Hooks con prefijo `use`.
- Archivos de utilidades en `camelCase`.
- Props tipadas explícitamente.
- Evitar lógica de negocio en componentes presentacionales.
