import React from 'react';
import { FileText, Search } from 'lucide-react';
import { FormData } from '../hooks/useBusinessForm';

interface StepBusinessIdentityProps {
  formData: FormData;
  setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  isFetched: boolean;
  isLoading: boolean;
  handleSearch: () => void;
}

export const StepBusinessIdentity: React.FC<StepBusinessIdentityProps> = ({
  formData,
  setField,
  isFetched,
  isLoading,
  handleSearch,
}) => {
  const isAL = formData.country === 'AL';

  const labelText = isAL
    ? 'NIPT (Numri i Identifikimit të Personit të Tatueshëm)'
    : 'Numri Unik Identifikues (NUI) / Numri Fiskal';

  const placeholderText = isAL ? 'p.sh. K12345678A' : 'p.sh. 330123456';

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="font-bold text-ink text-base">Identiteti i Biznesit</h3>
        <p className="text-xs text-ink-soft">
          Vendosni numrin tuaj fiskal për të auto-plotësuar të dhënat zyrtare direkt nga regjistrat shtetërorë.
        </p>
      </div>

      {/* Fetch Box */}
      <div className="bg-slate-50 border border-border rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-end gap-3">
          <div className="flex-1 space-y-1 w-full">
            <label className="block text-xs font-semibold text-ink-soft">
              {labelText} <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" />
              <input
                type="text"
                value={formData.fiscal_number}
                onChange={(e) => setField('fiscal_number', e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-white focus:ring-1 focus:ring-brand focus:border-brand text-sm uppercase outline-none transition"
                placeholder={placeholderText}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full md:w-auto bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded-lg transition text-xs font-semibold h-[38px] flex items-center justify-center gap-2 whitespace-nowrap shadow-sm disabled:opacity-75"
          >
            {isLoading ? (
              <span className="border-2 border-white border-t-transparent rounded-full w-3.5 h-3.5 animate-spin"></span>
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            Kërko dhe Auto-plotëso
          </button>
        </div>

        <span className="block text-[10px] text-ink-soft font-mono">
          {isAL ? (
            <>
              Sugjerim testimi NIPT: <b>K12345678A</b> ose <b>L98765432B</b>
            </>
          ) : (
            <>
              Sugjerim testimi NUI: <b>330123456</b> ose <b>530654321</b>
            </>
          )}
        </span>
      </div>

      {/* Autofilled results block */}
      <div
        className={`transition-all duration-300 space-y-4 ${
          isFetched ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-ink-soft">
            Emri Zyrtar i Biznesit <span className="text-brand">(Auto-plotësuar)</span>
          </label>
          <input
            type="text"
            value={formData.company_name}
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-border bg-slate-100 text-sm font-medium outline-none"
            placeholder="Kërkoni fillimisht më lart..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-ink-soft">
              Forma Ligjore <span className="text-brand">(Auto-plotësuar)</span>
            </label>
            <input
              type="text"
              value={formData.legal_form}
              readOnly
              className="w-full px-3 py-2 rounded-lg border border-border bg-slate-100 text-sm font-medium outline-none"
              placeholder="SH.P.K. / B.I. / etj."
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-ink-soft">
              Emri Tregtar (Brand Name) <span className="text-ink-soft">(Opsionale)</span>
            </label>
            <input
              type="text"
              value={formData.brand_name}
              onChange={(e) => setField('brand_name', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm outline-none focus:ring-1 focus:ring-brand focus:border-brand"
              placeholder="p.sh. Pika App"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepBusinessIdentity;
