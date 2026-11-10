import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./store/AuthContext";
import { SocketProvider } from "./store/SocketContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CoursePage from "./pages/CoursePage";
import SubjectPage from "./pages/SubjectPage";
import LessonPage from "./pages/LessonPage";
import AssignmentPage from "./pages/AssignmentPage";
import GradesPage from "./pages/GradesPage";
import ProfilePage from "./pages/ProfilePage";
import VideoCallPage from "./pages/VideoCallPage";
import RecordingsPage from "./pages/RecordingsPage";
import AdminPage from "./pages/AdminPage";
import ProfesorPage from "./pages/ProfesorPage";
import EstudiantePage from "./pages/EstudiantePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { ProtectedRoute } from "./components/layout/layout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Public content routes */}
      <Route path="/courses/:courseId" element={<CoursePage />} />
      <Route path="/subjects/:subjectId" element={<SubjectPage />} />
      <Route path="/lessons/:lessonId" element={<LessonPage />} />

      {/* Authenticated area with navigation shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profesor"
          element={
            <ProtectedRoute allowedRoles={["profesor"]}>
              <ProfesorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute allowedRoles={["estudiante"]}>
              <EstudiantePage />
            </ProtectedRoute>
          }
        />
        <Route path="/assignments/:assignmentId" element={<AssignmentPage />} />
        <Route path="/videocall/:roomId" element={<VideoCallPage />} />
        <Route path="/recordings/:subjectId" element={<RecordingsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
