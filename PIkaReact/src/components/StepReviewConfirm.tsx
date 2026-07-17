import React from 'react';
import { FormData } from '../hooks/useBusinessForm';

interface StepReviewConfirmProps {
  formData: FormData;
  setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
}

export const StepReviewConfirm: React.FC<StepReviewConfirmProps> = ({ formData, setField }) => {
  const companyNameWithBrand =
    formData.company_name + (formData.brand_name ? ` (${formData.brand_name})` : '');

  const countryLabel = formData.country === 'AL' ? 'Shqipëri 🇦🇱' : 'Kosovë 🇽🇰';
  const fiscalLabel = `${countryLabel} - NIPT/NUI: ${formData.fiscal_number}`;

  const fullAddress = `${formData.address_line}, ${formData.city}, ${formData.region}, Kodi Postar: ${formData.postal_code}`;

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="font-bold text-ink text-base">Rishikoni dhe Konfirmoni</h3>
        <p className="text-xs text-ink-soft">Ju lutem rishikoni të dhënat e regjistruara përpara dërgimit.</p>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 border border-border rounded-xl p-5 space-y-3 text-xs">
        <h4 className="font-bold text-brand uppercase tracking-wider text-[10px]">Të Dhënat e Biznesit tuaj:</h4>
        <div className="grid grid-cols-2 gap-y-2 border-b border-border pb-3 text-ink">
          <span className="text-ink-soft">Emri Zyrtar:</span>
          <span className="font-semibold">{companyNameWithBrand || '-'}</span>

          <span className="text-ink-soft">Shteti / Numri Fiskal:</span>
          <span className="font-semibold">{fiscalLabel || '-'}</span>

          <span className="text-ink-soft">Forma Ligjore:</span>
          <span className="font-semibold">{formData.legal_form || '-'}</span>

          <span className="text-ink-soft">Telefon:</span>
          <span className="font-semibold">{formData.company_phone || '-'}</span>
        </div>
        <div className="space-y-1">
          <span className="block text-ink-soft font-bold text-[10px] uppercase">Adresa e Regjistruar:</span>
          <p className="text-ink leading-relaxed font-medium">{fullAddress || '-'}</p>
        </div>
      </div>

      {/* Terms agreement checkbox */}
      <div className="flex items-start gap-2.5 pt-2">
        <input
          type="checkbox"
          id="agree_terms"
          checked={formData.agree_terms}
          onChange={(e) => setField('agree_terms', e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-border text-brand focus:ring-brand cursor-pointer"
        />
        <label htmlFor="agree_terms" className="text-xs text-ink-soft leading-tight cursor-pointer select-none">
          Unë konfirmoj se të dhënat e biznesit të marra nga regjistrat shtetërorë janë të sakta dhe përputhen me
          aktivitetin aktual. Pajtohem me{' '}
          <a href="#" className="text-brand font-semibold hover:underline" onClick={(e) => e.preventDefault()}>
            Kushtet e Shërbimit
          </a>
          .
        </label>
      </div>
    </div>
  );
};
export default StepReviewConfirm;
