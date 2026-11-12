import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLogin from './pages/DashboardLogin/DashboardLogin';
import OverviewPage from './pages/OverviewPage/OverviewPage';
import DashboardLayout from './layouts/DashboardLayout';
import CompaniesPage from './pages/CompaniesPage/CompaniesPage';
import TripsPage from './pages/TripsPage/TripsPage';
import BookingsPage from './pages/BookingsPage/BookingsPage';
import UsersPage from './pages/UsersPage/UsersPage';


const queryClient = new QueryClient();

// مكون لحماية صفحات الداشبورد
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('dashboard_token');
  if (!token) {
    return <Navigate to="/dashboard/login" replace />;
  }
  return children;
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/login" element={<DashboardLogin />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>

          {/* توجيه أي مسار غير معروف إلى تسجيل الدخول */}
          <Route path="*" element={<Navigate to="/dashboard/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;