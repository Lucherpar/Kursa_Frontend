import type { User, AuthCredentials, AuthResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

interface DemoUser extends User {
  password: string;
}

const DEMO_USERS: DemoUser[] = [
  { id: '1', name: 'Admin Demo', email: 'admin@kursa.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Profesor Demo', email: 'profesor@kursa.com', password: 'profesor123', role: 'profesor' },
  { id: '3', name: 'Estudiante Demo', email: 'estudiante@kursa.com', password: 'estudiante123', role: 'estudiante' },
];

function makeToken(user: User): string {
  return btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
}

export async function login(creds: AuthCredentials): Promise<AuthResponse> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds),
    });
    if (!res.ok) throw new Error('Credenciales invalidas');
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 300));
  const found = DEMO_USERS.find((u) => u.email === creds.email && u.password === creds.password);
  if (!found) throw new Error('Credenciales invalidas');
  const { password: _p, ...user } = found;
  void _p;
  return { token: makeToken(user), user };
}

export async function getCurrentUser(token: string): Promise<User> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('No autorizado');
    return res.json();
  }
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) throw new Error('expired');
    const found = DEMO_USERS.find((u) => u.id === payload.id);
    if (!found) throw new Error('not found');
    const { password: _p, ...user } = found;
    void _p;
    return user;
  } catch {
    throw new Error('Token invalido');
  }
}

export function logout(): void {
  // noop for mock
}
