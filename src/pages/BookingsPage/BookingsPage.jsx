import React from 'react';

import { User, CheckCircle2, XCircle, XOctagon } from 'lucide-react';
import { useBookings } from '../../hooks/useBookings';
import Button from '../../components/Button/Button';

export const BookingsPage = () => {
  const { bookings, isLoading, error, cancelBooking } = useBookings();

  if (isLoading) {
    return <div className="text-center py-20 text-muted font-bold font-cairo">جاري تحميل الحجوزات...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب الحجوزات.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">إدارة الحجوزات</h1>
          <p className="text-xs text-muted mt-1">متابعة كافة حجوزات المستخدمين والرحلات في النظام ({bookings.length} حجز).</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[22px] overflow-hidden shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-surface-alt border-b border-border text-xs text-muted">
              <th className="p-4 font-bold">كود الحجز</th>
              <th className="p-4 font-bold">المستخدم</th>
              <th className="p-4 font-bold">المسار والرحلة</th>
              <th className="p-4 font-bold">المقاعد والركاب</th>
              <th className="p-4 font-bold">السعر الإجمالي</th>
              <th className="p-4 font-bold">الحالة</th>
              <th className="p-4 font-bold text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-surface-alt/50 transition-colors">
                <td className="p-4">
                  <span className="font-black text-text block">{booking.code}</span>
                  <span className="text-[10px] text-muted">ID: #{booking.id}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-soft-teal text-primary flex items-center justify-center font-black shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-text block">{booking.user?.name || 'مستخدم'}</span>
                      <span className="text-[10px] text-muted block">{booking.user?.email}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-text flex items-center gap-1">
                    <span>{booking.trip?.origin?.name}</span>
                    <span className="text-muted">←</span>
                    <span>{booking.trip?.destination?.name}</span>
                  </div>
                  <span className="text-[10px] text-muted block mt-0.5">رحلة: {booking.trip?.code}</span>
                </td>
                <td className="p-4">
                  {booking.seats && booking.seats.length > 0 ? (
                    <div className="space-y-0.5">
                      {booking.seats.map((seat) => (
                        <div key={seat.id} className="text-[11px] font-bold text-text">
                          مقعد #{seat.seatNumber}: <span className="text-muted">{seat.passengerName}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted italic">لا توجد مقاعد محددة</span>
                  )}
                </td>
                <td className="p-4 font-black text-primary">
                  {booking.totalPrice?.toLocaleString()} ل.س
                </td>
                <td className="p-4">
                  {booking.status === 'CONFIRMED' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> مؤكد
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> ملغي
                    </span>
                  )}
                </td>
                <td className="p-4 text-left">
                  {booking.status === 'CONFIRMED' && (
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (window.confirm(`هل أنت متأكد من إلغاء الحجز رقم ${booking.code}؟`)) {
                          cancelBooking(booking.id);
                        }
                      }}
                      className="ml-auto px-3 py-1.5"
                      icon={XOctagon}
                      title="إلغاء الحجز"
                    >
                      إلغاء
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsPage;