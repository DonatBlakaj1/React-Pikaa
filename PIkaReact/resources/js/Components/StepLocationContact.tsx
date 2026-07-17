import React from 'react';
import { MapPin, UploadCloud } from 'lucide-react';
import { FormData } from '../hooks/useBusinessForm';

interface StepLocationContactProps {
  formData: FormData;
  setField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  simulateUpload: () => void;
}

export const StepLocationContact: React.FC<StepLocationContactProps> = ({
  formData,
  setField,
  simulateUpload,
}) => {
  const isAL = formData.country === 'AL';
  const regionLabel = isAL ? 'Qarku' : 'Rajoni';
  const cityLabel = isAL ? 'Bashkia' : 'Komuna';

  const isUploaded = !!formData.uploaded_document;

  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h3 className="font-bold text-ink text-base">Vendndodhja & Kontakti</h3>
        <p className="text-xs text-ink-soft">
          Adresa është marrë nga regjistri zyrtar. Plotësoni kontaktet dhe ngarkoni dokumentet.
        </p>
      </div>

      {/* Auto-fetched address review */}
      <div className="bg-slate-50 border border-border rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-brand" />
          Adresa Zyrtare nga Registri Qendror
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-ink-soft uppercase">{regionLabel}</label>
            <input
              type="text"
              value={formData.region}
              readOnly
              className="w-full px-2.5 py-1.5 rounded border border-border bg-slate-100 font-medium outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-ink-soft uppercase">{cityLabel}</label>
            <input
              type="text"
              value={formData.city}
              readOnly
              className="w-full px-2.5 py-1.5 rounded border border-border bg-slate-100 font-medium outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-ink-soft uppercase">Kodi Postar</label>
            <input
              type="text"
              value={formData.postal_code}
              readOnly
              className="w-full px-2.5 py-1.5 rounded border border-border bg-slate-100 font-medium outline-none"
            />
          </div>
        </div>
        <div className="space-y-1 text-xs">
          <label className="text-[10px] font-semibold text-ink-soft uppercase">Rruga dhe Ndërtesa</label>
          <input
            type="text"
            value={formData.address_line}
            readOnly
            className="w-full px-2.5 py-1.5 rounded border border-border bg-slate-100 font-medium outline-none"
          />
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-ink-soft">
            Telefon i Biznesit <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            value={formData.company_phone}
            onChange={(e) => setField('company_phone', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none"
            placeholder={isAL ? '+355 69 12 34 567' : '+383 44 123 456'}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-ink-soft">
            Webfaqja <span className="text-ink-soft">(Opsionale)</span>
          </label>
          <input
            type="url"
            value={formData.company_website}
            onChange={(e) => setField('company_website', e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:ring-1 focus:ring-brand focus:border-brand text-sm outline-none"
            placeholder="https://shembull.com"
          />
        </div>
      </div>

      {/* Simulated Upload */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-ink-soft">
          Kopje e Ekstraktit apo ID e Përfaqësuesit <span className="text-danger">*</span>
        </label>
        <div
          onClick={simulateUpload}
          className={`rounded-lg p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
            isUploaded
              ? 'border border-brand-hover/30 bg-brand-tint shadow-sm'
              : 'border border-dashed border-border hover:border-brand bg-slate-50'
          }`}
        >
          <UploadCloud className="w-6 h-6 text-brand" />
          <div className="text-xs font-semibold text-ink">Klikoni për të ngarkuar dokumentin</div>
          <div className="text-[10px] text-ink-soft">Formatet: PDF, PNG, JPG (Maks. 5MB)</div>
          {isUploaded && (
            <div className="text-xs font-semibold text-brand bg-brand-tint border border-brand/20 px-3 py-1 rounded mt-2">
              Ngarkuar: {formData.uploaded_document}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StepLocationContact;
