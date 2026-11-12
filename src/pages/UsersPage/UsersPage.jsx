import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardUsers } from '../../services/dashboardApi';
import { Mail } from 'lucide-react';

export const UsersPage = () => {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['dashboardUsers'],
    queryFn: getDashboardUsers,
  });

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black text-text">المستخدمين</h1>
          <p className="text-xs text-muted mt-1">عرض حسابات المسافرين والمستخدمين المسجلين في المنصة.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted font-bold">جاري تحميل المستخدمين...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-soft-teal text-primary flex items-center justify-center font-black">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-sm font-black text-text">{user.name || 'مستخدم'}</h3>
                <span className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;