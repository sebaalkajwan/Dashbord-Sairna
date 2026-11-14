import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardUsers } from '../../services/dashboardApi';
import { Users, Shield, User, Calendar } from 'lucide-react';

export const UsersPage = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['dashboardUsers'],
    queryFn: getDashboardUsers,
  });

  if (isLoading) {
    return <div className="text-center py-20 text-muted font-bold font-cairo">جاري تحميل المستخدمين...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب قائمة المستخدمين.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      {/* ترويسة الصفحة */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">إدارة المستخدمين</h1>
          <p className="text-xs text-muted mt-1">عرض ومتابعة كافة الحسابات المسجلة في النظام ({users.length} مستخدم).</p>
        </div>
      </div>

      {/* جدول المستخدمين */}
      <div className="bg-surface border border-border rounded-[22px] overflow-hidden shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-surface-alt border-b border-border text-xs text-muted">
              <th className="p-4 font-bold">المستخدم</th>
              <th className="p-4 font-bold">البريد الإلكتروني</th>
              <th className="p-4 font-bold">الصلاحية (Role)</th>
              <th className="p-4 font-bold">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-surface-alt/50 transition-colors">
                
                {/* اسم المستخدم والمعرّف */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-teal text-primary flex items-center justify-center font-black shrink-0">
                      {user.role === 'ADMIN' ? <Shield className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <span className="font-black text-text block">{user.name}</span>
                      <span className="text-[10px] text-muted">ID: #{user.id}</span>
                    </div>
                  </div>
                </td>

                {/* البريد الإلكتروني */}
                <td className="p-4 font-bold text-muted" dir="ltr">
                  {user.email}
                </td>

                {/* الصلاحية */}
                <td className="p-4">
                  {user.role === 'ADMIN' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full">
                      <Shield className="w-3.5 h-3.5" /> مشرف (Admin)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-primary bg-soft-teal px-3 py-1 rounded-full">
                      <User className="w-3.5 h-3.5" /> مستخدم (User)
                    </span>
                  )}
                </td>

                {/* تاريخ التسجيل */}
                <td className="p-4 text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span dir="ltr">{new Date(user.createdAt).toLocaleString()}</span>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;