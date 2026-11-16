import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Bus, MapPin, Ticket, Users, LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useAdminProfile } from '../hooks/useAdminProfile';

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { admin } = useAdminProfile();

  const handleLogout = () => {
    // 1. حذف التوكن من الذاكرة المحلية
    localStorage.removeItem('dashboard_token');
    
    // 2. مسح جميع بيانات الـ Cache الخاصة بـ TanStack Query أمنياً
    queryClient.clear();
    
    // 3. التوجيه الفوري لصفحة تسجيل الدخول
    navigate('/dashboard/login');
  };

  const navItems = [
    { to: '/dashboard/overview', label: 'الرئيسية', icon: LayoutDashboard },
    { to: '/dashboard/trips', label: 'إدارة الرحلات', icon: Bus },
    { to: '/dashboard/bookings', label: 'إدارة الحجوزات', icon: Ticket },
    { to: '/dashboard/companies', label: 'شركات النقل', icon: Building2 },
    { to: '/dashboard/users', label: 'المستخدمين', icon: Users },
    { to: '/dashboard/cities', label: 'المدن', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-bg flex font-cairo" dir="rtl">
      
      <aside className="w-64 bg-surface border-l border-border flex flex-col justify-between p-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
              {admin?.name ? admin.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-black text-text truncate">
                {admin?.name || 'Sairna Admin'}
              </h2>
              <span className="text-[11px] text-muted block truncate" title={admin?.email}>
                {admin?.email || 'لوحة الإدارة والتحكم'}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-md'
                        : 'text-muted hover:bg-surface-alt hover:text-text'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;