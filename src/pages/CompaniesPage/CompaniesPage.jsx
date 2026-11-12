import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardCompanies, createCompany } from '../../services/dashboardApi';
import { Building2, Plus } from 'lucide-react';

export const CompaniesPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const { data: companies = [], isLoading } = useQuery({
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ name, logoUrl });
  };

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h1 className="text-xl font-black text-text">شركات النقل</h1>
          <p className="text-xs text-muted mt-1">إدارة الشركات والناقلين المعتمدين في النظام.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:opacity-95 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة شركة جديدة</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted font-bold">جاري تحميل الشركات...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div key={company.id} className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-alt border border-border flex items-center justify-center overflow-hidden">
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black text-text">{company.name}</h3>
                  <span className="text-[10px] text-muted block mt-0.5">معرّف الشركة: #{company.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full shadow-lg">
            <h3 className="text-base font-black text-text mb-4">إضافة شركة نقل جديدة</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text mb-1">اسم الشركة</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-border rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  placeholder="مثال: شركة الأمل للسفريات"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text mb-1">رابط الشعار (Logo URL)</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  required
                  className="w-full bg-surface-alt border border-border rounded-xl px-3 py-2.5 text-xs text-text focus:outline-none focus:border-primary"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted bg-surface-alt hover:bg-border cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary shadow-sm hover:opacity-95 cursor-pointer"
                >
                  حفظ الشركة
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