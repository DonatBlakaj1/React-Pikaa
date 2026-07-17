import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessScreenProps {
  resetWizard: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ resetWizard }) => {
  return (
    <div className="text-center py-10 space-y-4 animate-scaleUp">
      <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-success rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-ink">Regjistrimi u Dërgua!</h3>
        <p className="text-sm text-ink-soft mt-1">
          Llogaria e biznesit tuaj është hapur. Të dhënat u konfirmuan automatikisht.
        </p>
      </div>
      <div className="bg-slate-50 border border-border p-4 rounded-lg text-left text-xs max-w-md mx-auto space-y-2">
        <p className="font-bold text-ink">Hapat e ardhshëm:</p>
        <ul className="list-disc pl-4 space-y-1 text-ink-soft">
          <li>Ekstrakti juaj zyrtar është lidhur me llogarinë tuaj.</li>
          <li>Tani mund të hyni direkt në panelin e kontrollit të platformës Pika.</li>
          <li>Për çdo paqartësi ose ndryshim adresash, mund të na shkruani në mbështetje.</li>
        </ul>
      </div>
      <button
        onClick={resetWizard}
        type="button"
        className="mt-4 bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded-lg text-xs font-semibold transition shadow-sm"
      >
        Fillo Regjistrim të Ri
      </button>
    </div>
  );
};
export default SuccessScreen;
