import React from 'react';

import { Users, Ticket, Bus, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useOverview } from '../../hooks/useOverview';
import Card from '../../components/Card/Card';

export const OverviewPage = () => {
  const { overview, isLoading, error } = useOverview();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted font-bold font-cairo">
        جاري تحميل لوحة التحكم...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-bold font-cairo">
        حدث خطأ أثناء جلب البيانات، تأكد من الصلاحيات.
      </div>
    );
  }

  const stats = [
    {
      title: 'إجمالي الحجوزات',
      value: overview?.totalBookings ?? 0,
      icon: Ticket,
      color: 'bg-soft-teal text-primary',
    },
    {
      title: 'الحجوزات المؤكدة',
      value: overview?.confirmedBookings ?? 0,
      icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-500',
    },
    {
      title: 'الرحلات النشطة',
      value: overview?.upcomingTrips ?? 0,
      icon: Bus,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'شركات النقل',
      value: overview?.companies ?? 0,
      icon: Building2,
      color: 'bg-amber-500/10 text-amber-500',
    },
    {
      title: 'المستخدمين المسجلين',
      value: overview?.customers ?? 0,
      icon: Users,
      color: 'bg-purple-500/10 text-purple-500',
    },
  ];

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      
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


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block mb-1 font-bold">{stat.title}</span>
                <span className="text-2xl font-black text-text">{stat.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="إدارة سريعة">
        <p className="text-xs text-muted leading-relaxed">
          يمكنك الانتقال عبر الشريط الجانبي لإدارة شركات النقل، إضافة وتعديل الرحلات، مراجعة كافة الحجوزات وتتبع حالاتها، أو استعراض حسابات المستخدمين.
        </p>
      </Card>

    </div>
  );
};

export default OverviewPage;