import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardOverview } from '../../services/dashboardApi';
import { LayoutDashboard, Users, Ticket, Bus, Building2, TrendingUp } from 'lucide-react';

export const OverviewPage = () => {
  const { data: overview, isLoading, error } = useQuery({
    queryKey: ['dashboardOverview'],
    queryFn: getDashboardOverview,
  });

  if (isLoading) {
    return <div className="py-20 text-center text-muted font-bold">جاري تحميل لوحة التحكم...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-bold">حدث خطأ أثناء جلب البيانات، تأكد من الصلاحيات.</div>;
  }

  const stats = [
    { title: 'إجمالي الحجوزات', value: overview?.totalBookings || 0, icon: Ticket, color: 'bg-soft-teal text-primary' },
    { title: 'الرحلات النشطة', value: overview?.totalTrips || 0, icon: Bus, color: 'bg-blue-500/10 text-blue-500' },
    { title: 'شركات النقل', value: overview?.totalCompanies || 0, icon: Building2, color: 'bg-amber-500/10 text-amber-500' },
    { title: 'المستخدمين المسجلين', value: overview?.totalUsers || 0, icon: Users, color: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      
      {/* ترويسة الصفحة */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">لوحة القيادة الرئيسية</h1>
          <p className="text-xs text-muted mt-1">مرحباً بك في لوحة تحكم منصة Sairna الإدارية.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border px-4 py-2 rounded-xl text-xs font-bold text-primary">
          <TrendingUp className="w-4 h-4" />
          <span>النظام يعمل بكفاءة عالية</span>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-surface border border-border rounded-[22px] p-6 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block mb-1 font-bold">{stat.title}</span>
                <span className="text-2xl font-black text-text">{stat.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* قسم إضافي للنشاطات أو اختصارات سريعة */}
      <div className="bg-surface border border-border rounded-[22px] p-6 shadow-sm">
        <h3 className="text-base font-black text-text mb-4">إدارة سريعة</h3>
        <p className="text-xs text-muted leading-relaxed">
          يمكنك الانتقال عبر الشريط الجانبي لإدارة شركات النقل، إضافة وتعديل الرحلات، مراجعة كافة الحجوزات وتتبع حالاتها، أو استعراض حسابات المستخدمين.
        </p>
      </div>

    </div>
  );
};

export default OverviewPage;