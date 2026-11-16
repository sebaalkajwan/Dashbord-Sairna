import React, { useState } from 'react';

import { MapPin, Plus, Trash2, Navigation } from 'lucide-react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { useCities } from '../../hooks/useCities';

export const CitiesPage = () => {
  const { cities, isLoading, error, addCity, isAdding, deleteCity } = useCities();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCity(
      {
        name: name.trim(),
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      },
      {
        onSuccess: () => {
          setName('');
          setLatitude('');
          setLongitude('');
        }
      }
    );
  };

  if (isLoading) {
    return <div className="py-20 text-center text-muted font-bold font-cairo">جاري تحميل المدن...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب قائمة المدن.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">إدارة المدن</h1>
          <p className="text-xs text-muted mt-1">استعراض وإدارة المدن والمحافظات المتاحة للرحلات ({cities.length} مدينة).</p>
        </div>
      </div>

      <Card title="إضافة مدينة جديدة">
        <form onSubmit={handleAddCity} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
          <Button type="submit" disabled={isAdding} icon={Plus}>
            {isAdding ? 'جاري الإضافة...' : 'إضافة مدينة'}
          </Button>
        </form>
      </Card>

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
                <span className="text-[11px] text-muted block mt-0.5">معرّف المدينة: #{city.id}</span>
                {(city.latitude || city.longitude) && (
                  <span className="text-[10px] text-muted/80 flex items-center gap-1 mt-1" dir="ltr">
                    <Navigation className="w-3 h-3 text-primary" />
                    {city.latitude}, {city.longitude}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm(`هل أنت متأكد من حذف مدينة "${city.name}"؟`)) {
                  deleteCity(city.id);
                }
              }}
              className="p-2"
              icon={Trash2}
              title="حذف المدينة"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesPage;