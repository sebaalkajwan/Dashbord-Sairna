import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardCities, createCity, deleteCity } from '../../services/dashboardApi';
import { MapPin, Plus, Trash2, Navigation } from 'lucide-react';

export const CitiesPage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { data: citiesData, isLoading, error } = useQuery({
    queryKey: ['dashboardCities'],
    queryFn: getDashboardCities,
  });

  const cities = Array.isArray(citiesData) ? citiesData : citiesData?.data || [];

  const addMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCities'] });
      setName('');
      setLatitude('');
      setLongitude('');
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إضافة المدينة');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCities'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'لا يمكن حذف هذه المدينة لارتباطها برحلات');
    },
  });

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addMutation.mutate({
      name: name.trim(),
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
    });
  };

  if (isLoading) {
    return <div className="py-20 text-center text-muted font-bold font-cairo">جاري تحميل المدن...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب قائمة المدن.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      {/* الترويسة */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">إدارة المدن</h1>
          <p className="text-xs text-muted mt-1">استعراض وإدارة المدن والمحافظات المتاحة للرحلات ({cities.length} مدينة).</p>
        </div>
      </div>

      {/* نموذج إضافة مدينة جديدة */}
      <form onSubmit={handleAddCity} className="bg-surface border border-border rounded-[22px] p-6 shadow-sm">
        <h3 className="text-sm font-black text-text mb-4">إضافة مدينة جديدة</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="اسم المدينة (مثال: دمشق)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-text focus:outline-none focus:border-primary"
          />
          <input
            type="number"
            step="any"
            placeholder="خط العرض Latitude (اختياري)"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-text focus:outline-none focus:border-primary"
          />
          <input
            type="number"
            step="any"
            placeholder="خط الطول Longitude (اختياري)"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-xs font-bold text-text focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="bg-primary text-white rounded-xl px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{addMutation.isPending ? 'جاري الإضافة...' : 'إضافة مدينة'}</span>
          </button>
        </div>
      </form>

      {/* شبكة عرض المدن */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cities.map((city) => (
          <div
            key={city.id}
            className="bg-surface border border-border rounded-[20px] p-5 shadow-sm flex items-center justify-between hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-soft-teal text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-text">{city.name}</h4>
                <span className="text-[11px] text-muted block mt-0.5">
                  معرّف المدينة: #{city.id}
                </span>
                {(city.latitude || city.longitude) && (
                  <span className="text-[10px] text-muted/80 flex items-center gap-1 mt-1" dir="ltr">
                    <Navigation className="w-3 h-3 text-primary" />
                    {city.latitude}, {city.longitude}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm(`هل أنت متأكد من حذف مدينة "${city.name}"؟`)) {
                  deleteMutation.mutate(city.id);
                }
              }}
              className="text-red-500 hover:bg-red-500/10 p-2 rounded-xl transition-colors"
              title="حذف المدينة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesPage;