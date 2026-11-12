import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardBookings, cancelBooking } from '../../services/dashboardApi';
import { XCircle } from 'lucide-react';

export const BookingsPage = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['dashboardBookings'],
    queryFn: getDashboardBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardBookings'] });
    },
  });

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black text-text">إدارة الحجوزات</h1>
          <p className="text-xs text-muted mt-1">متابعة تذاكر الحجوزات الصادرة وإلغاؤها عند الحاجة.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted font-bold">جاري تحميل الحجوزات...</div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-alt border-b border-border text-xs text-muted">
                <th className="p-4 font-bold">رقم الحجز</th>
                <th className="p-4 font-bold">رقم الرحلة</th>
                <th className="p-4 font-bold">عدد المقاعد</th>
                <th className="p-4 font-bold text-left">إلغاء الحجز</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-alt/50">
                  <td className="p-4 font-black text-text">#{booking.id}</td>
                  <td className="p-4 font-bold text-muted">رحلة #{booking.tripId}</td>
                  <td className="p-4 font-bold text-text">{booking.seats?.length || 1} مقاعد</td>
                  <td className="p-4 text-left">
                    <button
                      onClick={() => cancelMutation.mutate(booking.id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 font-bold transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>إلغاء</span>
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

export default BookingsPage;