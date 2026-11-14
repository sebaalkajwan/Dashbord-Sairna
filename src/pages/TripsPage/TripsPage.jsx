import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardTrips, deleteTrip } from '../../services/dashboardApi';
import { Trash2, Bus, MapPin, Calendar, CheckCircle2, XCircle } from 'lucide-react';

export const TripsPage = () => {
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading, error } = useQuery({
    queryKey: ['dashboardTrips'],
    queryFn: getDashboardTrips,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardTrips'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إلغاء/حذف الرحلة');
    },
  });

  if (isLoading) {
    return <div className="text-center py-20 text-muted font-bold font-cairo">جاري تحميل الرحلات...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب الرحلات.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      {/* ترويسة الصفحة */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">إدارة الرحلات</h1>
          <p className="text-xs text-muted mt-1">عرض ومتابعة كافة الرحلات المتاحة في النظام ({trips.length} رحلة).</p>
        </div>
      </div>

      {/* جدول الرحلات */}
      <div className="bg-surface border border-border rounded-[22px] overflow-hidden shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-surface-alt border-b border-border text-xs text-muted">
              <th className="p-4 font-bold">كود الرحلة</th>
              <th className="p-4 font-bold">شركة النقل</th>
              <th className="p-4 font-bold">المسار (من - إلى)</th>
              <th className="p-4 font-bold">موعد الانطلاق</th>
              <th className="p-4 font-bold">السعر</th>
              <th className="p-4 font-bold">المقاعد</th>
              <th className="p-4 font-bold">الحالة</th>
              <th className="p-4 font-bold text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {trips.map((trip) => (
              <tr key={trip.id} className="hover:bg-surface-alt/50 transition-colors">
                
                {/* كود الرحلة والمعرّف */}
                <td className="p-4">
                  <span className="font-black text-text block">{trip.code}</span>
                  <span className="text-[10px] text-muted">ID: #{trip.id}</span>
                </td>

                {/* شركة النقل */}
                <td className="p-4 font-bold text-text">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-primary shrink-0" />
                    <span>{trip.company?.name || 'غير متوفرة'}</span>
                  </div>
                </td>

                {/* المسار */}
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-text font-bold">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{trip.origin?.name}</span>
                    <span className="text-muted">←</span>
                    <span>{trip.destination?.name}</span>
                  </div>
                </td>

                {/* موعد الانطلاق */}
                <td className="p-4 text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span dir="ltr">{new Date(trip.departureAt).toLocaleString()}</span>
                  </div>
                </td>

                {/* السعر */}
                <td className="p-4 font-black text-primary">
                  {trip.price?.toLocaleString()} ل.س
                </td>

                {/* المقاعد الكلية */}
                <td className="p-4 font-bold text-muted">
                  {trip.totalSeats} مقعد
                </td>

                {/* حالة الرحلة */}
                <td className="p-4">
                  {trip.status === 'AVAILABLE' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> متاح
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> ملغاة
                    </span>
                  )}
                </td>

                {/* الإجراءات (حذف/إلغاء الرحلة) */}
                <td className="p-4 text-left">
                  <button
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من إلغاء الرحلة رقم ${trip.code}؟`)) {
                        deleteMutation.mutate(trip.id);
                      }
                    }}
                    className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/25 transition-all cursor-pointer"
                    title="إلغاء/حذف الرحلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripsPage;