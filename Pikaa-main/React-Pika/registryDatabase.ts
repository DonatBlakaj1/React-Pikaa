import React from 'react';
import { Check } from 'lucide-react';
import { FormData } from '../hooks/useBusinessForm';

interface StepCountrySelectionProps {
  formData: FormData;
  selectCountry: (countryCode: string) => void;
}

export const StepCountrySelection: React.FC<StepCountrySelectionProps> = ({
  formData,
  selectCountry,
}) => {
  const isSelected = (code: string) => formData.country === code;

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="font-bold text-ink text-base">Zgjidhni Shtetin e Operimit</h3>
        <p className="text-xs text-ink-soft">
          Kjo do të përcaktojë lidhjen me regjistrat përkatës tatimorë dhe shtetërorë.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Albania Card */}
        <div
          onClick={() => selectCountry('AL')}
          className={`cursor-pointer border rounded-xl p-5 transition flex flex-col items-center text-center gap-3 relative shadow-sm ${
            isSelected('AL')
              ? 'border-brand bg-brand-tint'
              : 'border-border bg-white hover:border-brand'
          }`}
        >
          {isSelected('AL') && (
            <div className="absolute top-3 right-3 text-brand bg-brand-tint rounded-full p-1 border border-brand/20">
              <Check className="w-4 h-4" />
            </div>
          )}
          <span className="text-3xl" role="img" aria-label="Albania Flag">
            🇦🇱
          </span>
          <div>
            <h4 className="font-bold text-ink text-sm">Shqipëri</h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-normal">
              Kërkim automatik në QKB përmes NIPT-it zyrtar.
            </p>
          </div>
        </div>

        {/* Kosovo Card */}
        <div
          onClick={() => selectCountry('KS')}
          className={`cursor-pointer border rounded-xl p-5 transition flex flex-col items-center text-center gap-3 relative shadow-sm ${
            isSelected('KS')
              ? 'border-brand bg-brand-tint'
              : 'border-border bg-white hover:border-brand'
          }`}
        >
          {isSelected('KS') && (
            <div className="absolute top-3 right-3 text-brand bg-brand-tint rounded-full p-1 border border-brand/20">
              <Check className="w-4 h-4" />
            </div>
          )}
          <span className="text-3xl" role="img" aria-label="Kosovo Flag">
            🇽🇰
          </span>
          <div>
            <h4 className="font-bold text-ink text-sm">Kosovë</h4>
            <p className="text-[11px] text-ink-soft mt-1 leading-normal">
              Kërkim automatik në ARBK përmes Numrit Unik Identifikues (NUI).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StepCountrySelection;
