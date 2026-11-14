import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardCompanies, createCompany, deleteCompany } from '../../services/dashboardApi';
import { Building2, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';

export const CompaniesPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const { data: companies = [], isLoading, error } = useQuery({
    queryKey: ['dashboardCompanies'],
    queryFn: getDashboardCompanies,
  });

  const createMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCompanies'] });
      setShowModal(false);
      setName('');
      setLogoUrl('');
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل إضافة الشركة');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardCompanies'] });
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'فشل حذف الشركة');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ 
      name: name.trim(), 
      logoUrl: logoUrl.trim() ? logoUrl.trim() : null 
    });
  };

  if (isLoading) {
    return <div className="text-center py-20 text-muted font-bold font-cairo">جاري تحميل الشركات...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 font-bold font-cairo">حدث خطأ أثناء جلب الشركات.</div>;
  }

  return (
    <div className="space-y-8 font-cairo" dir="rtl">
      {/* ترويسة الصفحة */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-black text-text">شركات النقل</h1>
          <p className="text-xs text-muted mt-1">إدارة الشركات والناقلين المعتمدين في النظام ({companies.length} شركة).</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شركة جديدة</span>
        </button>
      </div>

      {/* شبكة عرض الشركات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div 
            key={company.id} 
            className="bg-surface border border-border rounded-[22px] p-5 shadow-sm flex items-center justify-between hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-alt border border-border flex items-center justify-center overflow-hidden shrink-0">
                {company.logoUrl ? (
                  <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-7 h-7 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-black text-text">{company.name}</h3>
                <span className="text-[11px] text-muted block mt-0.5">معرّف الشركة: #{company.id}</span>
                
                {/* شارة حالة التفعيل */}
                <div className="mt-2">
                  {company.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> مفعلة
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3" /> معطلة / مؤرشفة
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (window.confirm(`هل أنت متأكد من أرشفة/حذف شركة "${company.name}"؟`)) {
                  deleteMutation.mutate(company.id);
                }
              }}
              className="text-red-500 hover:bg-red-500/10 p-2.5 rounded-xl transition-colors cursor-pointer"
              title="حذف الشركة"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* نافذة الإضافة (Modal) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-[24px] p-6 max-w-md w-full shadow-lg">
            <h3 className="text-base font-black text-text mb-4">إضافة شركة نقل جديدة</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text mb-1.5">اسم الشركة</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs text-text focus:outline-none focus:border-primary"
                  placeholder="مثال: شركة الأمل للسفريات"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text mb-1.5">رابط الشعار (Logo URL) - اختياري</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-xs text-text focus:outline-none focus:border-primary"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-muted bg-surface-alt hover:bg-border cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-primary shadow-sm hover:opacity-95 cursor-pointer transition-opacity disabled:opacity-50"
                >
                  {createMutation.isPending ? 'جاري الحفظ...' : 'حفظ الشركة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;