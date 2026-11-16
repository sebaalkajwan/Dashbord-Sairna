import React, { useState } from 'react';

import { Building2, Plus, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../../components/Button/Button';
import { useCompanies } from '../../hooks/useCompanies';

export const CompaniesPage = () => {
  const { companies, isLoading, error, createCompany, isCreating, deleteCompany } = useCompanies();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createCompany(
      { 
        name: name.trim(), 
        logoUrl: logoUrl.trim() ? logoUrl.trim() : null 
      },
      {
        onSuccess: () => {
          setShowModal(false);
          setName('');
          setLogoUrl('');
        }
      }
    );
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
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          إضافة شركة جديدة
        </Button>
      </div>

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

            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm(`هل أنت متأكد من أرشفة/حذف شركة "${company.name}"؟`)) {
                  deleteCompany(company.id);
                }
              }}
              className="p-2.5"
              icon={Trash2}
              title="حذف الشركة"
            />
          </div>
        ))}
      </div>

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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                >
                  {isCreating ? 'جاري الحفظ...' : 'حفظ الشركة'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;