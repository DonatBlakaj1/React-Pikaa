import React from 'react';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { FormData } from '../hooks/useBusinessForm';

interface StepAccountSetupProps {
  formData: FormData;
  setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

export const StepAccountSetup: React.FC<StepAccountSetupProps> = ({ formData, setField }) => {
  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="font-bold text-ink text-base">Krijoni Llogarinë tuaj</h3>
        <p className="text-xs text-ink-soft">Vendosni email-in dhe fjalëkalimin për t'u kyçur në panel.</p>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-ink-soft">
          Emri i Plotë <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            value={formData.admin_name}
            onChange={(e) => setField('admin_name', e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-slate-50 focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none transition"
            placeholder="p.sh. Agron Berisha"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold text-ink-soft">
          Email Zyrtar <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" />
          <input
            type="email"
            value={formData.admin_email}
            onChange={(e) => setField('admin_email', e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-slate-50 focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none transition"
            placeholder="agron@shembull.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-ink-soft">
            Fjalëkalimi <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" />
            <input
              type="password"
              value={formData.admin_password}
              onChange={(e) => setField('admin_password', e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-slate-50 focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none transition"
              placeholder="Së paku 8 karaktere"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-ink-soft">
            Konfirmo Fjalëkalimin <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" />
            <input
              type="password"
              value={formData.admin_password_confirm}
              onChange={(e) => setField('admin_password_confirm', e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-slate-50 focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none transition"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepAccountSetup;
