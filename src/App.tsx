import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorSchedule from "./pages/DoctorSchedule";
import PatientRecords from "./pages/PatientRecords";
import PrescriptionHistory from "./pages/PrescriptionHistory";
import AppointmentDetails from "./pages/AppointmentDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";
import AdminSystemSettings from "./pages/AdminSystemSettings";
import AdminAppointmentSettings from "./pages/AdminAppointmentSettings";
import Search from "./pages/Search";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import HospitalDoctors from "./pages/HospitalDoctors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Patient Routes */}
            <Route path="/" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/hospital/:hospitalId/doctors" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <HospitalDoctors />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <EditProfile />
              </ProtectedRoute>
            } />
            
            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor/schedule" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorSchedule />
              </ProtectedRoute>
            } />
            <Route path="/doctor/patients" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientRecords />
              </ProtectedRoute>
            } />
            <Route path="/doctor/prescriptions" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PrescriptionHistory />
              </ProtectedRoute>
            } />
            <Route path="/doctor/appointment/:id" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <AppointmentDetails />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/doctors" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDoctors />
              </ProtectedRoute>
            } />
            <Route path="/admin/patients" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPatients />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminSystemSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/appointments" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAppointmentSettings />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
