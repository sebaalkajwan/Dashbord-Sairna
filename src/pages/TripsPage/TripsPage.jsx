import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardTrips, deleteTrip } from '../../services/dashboardApi';
import { Trash2 } from 'lucide-react';

export const TripsPage = () => {
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ['dashboardTrips'],
    queryFn: getDashboardTrips,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardTrips'] });
    },
  });

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black text-text">إدارة الرحلات</h1>
          <p className="text-xs text-muted mt-1">عرض ومتابعة كافة الرحلات المتاحة في النظام.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted font-bold">جاري تحميل الرحلات...</div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-alt border-b border-border text-xs text-muted">
                <th className="p-4 font-bold">رقم الرحلة</th>
                <th className="p-4 font-bold">السعر</th>
                <th className="p-4 font-bold">المقاعد الكلية</th>
                <th className="p-4 font-bold">الحالة</th>
                <th className="p-4 font-bold text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-surface-alt/50">
                  <td className="p-4 font-black text-text">#{trip.id}</td>
                  <td className="p-4 font-bold text-primary">{trip.price} ل.س</td>
                  <td className="p-4 font-bold text-muted">{trip.totalSeats} مقعد</td>
                  <td className="p-4">
                    <span className="bg-soft-teal text-primary px-2.5 py-1 rounded-lg font-bold text-[11px]">
                      {trip.status || 'متاح'}
                    </span>
                  </td>
                  <td className="p-4 text-left">
                    <button
                      onClick={() => deleteMutation.mutate(trip.id)}
                      className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all cursor-pointer"
                      title="حذف الرحلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TripsPage;