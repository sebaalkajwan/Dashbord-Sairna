import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/dashboardApi';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export const DashboardLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminLogin({ email, password });
      navigate('/dashboard/overview');
    } catch (err) {
      setError(err.response?.data?.message || 'فشل تسجيل الدخول، تحقق من البيانات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 font-cairo" dir="rtl">
      <div className="max-w-md w-full bg-surface border border-border rounded-[22px] p-8 shadow-md">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-soft-teal text-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-text">لوحة تحكم المشرفين</h1>
          <p className="text-xs text-muted mt-1">سجل دخولك لإدارة الرحلات والشركات والمدن</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-600 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-text mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-alt border border-border rounded-xl pr-10 pl-4 py-3 text-xs text-text focus:outline-none focus:border-primary transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface-alt border border-border rounded-xl pr-10 pl-4 py-3 text-xs text-text focus:outline-none focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl text-xs font-black shadow-md hover:opacity-95 transition-all cursor-pointer mt-2"
          >
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default DashboardLogin;