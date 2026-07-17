import React from 'react';
import {
  Printer,
  ArrowLeft,
  ArrowRight,
  Check,
  Landmark,
  Lightbulb,
} from 'lucide-react';
import { useBusinessForm } from '../hooks/useBusinessForm';
import StepProgressBar from '../Components/StepProgressBar';
import ErrorBanner from '../Components/ErrorBanner';
import StepAccountSetup from '../Components/StepAccountSetup';
import StepCountrySelection from '../Components/StepCountrySelection';
import StepBusinessIdentity from '../Components/StepBusinessIdentity';
import StepLocationContact from '../Components/StepLocationContact';
import StepReviewConfirm from '../Components/StepReviewConfirm';
import SuccessScreen from '../Components/SuccessScreen';

export const BusinessOnboarding: React.FC = () => {
  const {
    formData,
    currentStep,
    totalSteps,
    isFetched,
    isLoading,
    errorMessage,
    isSubmitted,
    setField,
    selectCountry,
    handleSearch,
    navigateStep,
    simulateUpload,
    resetForm,
  } = useBusinessForm();

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.print();
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-tint text-brand">
              Specifikim Teknik
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 border border-border text-ink-soft">
              UX / UI i Ri
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">
            Regjistrimi i Biznesit (AL / KS)
          </h1>
          <p className="text-ink-soft mt-1">
            Dizajni i ri minimalist me autoplotësim inteligjent nga regjistrat shtetërorë (QKB / ARBK).
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-ink px-4 py-2 rounded-lg border border-border transition text-sm font-medium shadow-sm"
          >
            <Printer className="w-4 h-4" /> Printo / Ruaj PDF
          </button>
          <a
            href="Welcome.tsx"
            className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg transition text-sm font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Kthehu te Kodi
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: The Interactive Form Prototype (7 Cols) */}
        <section className="lg:col-span-7 bg-white border border-border rounded-xl shadow-sm p-6 relative">
          {!isSubmitted && (
            <>
              <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                <div>
                  <h2 className="text-base font-bold text-ink">Prototipi i Ri Interaktiv (UI Live Preview)</h2>
                  <p className="text-xs text-ink-soft">Fluks i thjeshtëzuar me më pak klikime dhe të dhëna automatike.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                  <span className="text-xs font-mono font-medium text-brand">Auto-fetch Active</span>
                </div>
              </div>

              {/* Progress Steps */}
              <StepProgressBar currentStep={currentStep} totalSteps={totalSteps} />

              {/* Error Banner */}
              <ErrorBanner message={errorMessage} />
            </>
          )}

          {/* Form Wizard Container */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {!isSubmitted ? (
              <>
                {currentStep === 1 && (
                  <StepAccountSetup formData={formData} setField={setField} />
                )}
                {currentStep === 2 && (
                  <StepCountrySelection formData={formData} selectCountry={selectCountry} />
                )}
                {currentStep === 3 && (
                  <StepBusinessIdentity
                    formData={formData}
                    setField={setField}
                    isFetched={isFetched}
                    isLoading={isLoading}
                    handleSearch={handleSearch}
                  />
                )}
                {currentStep === 4 && (
                  <StepLocationContact
                    formData={formData}
                    setField={setField}
                    simulateUpload={simulateUpload}
                  />
                )}
                {currentStep === 5 && (
                  <StepReviewConfirm formData={formData} setField={setField} />
                )}

                {/* Step Navigation Controls */}
                <div className="flex justify-between items-center pt-4 border-t border-border mt-6">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => navigateStep(-1)}
                      className="flex items-center gap-1.5 text-ink-soft hover:text-ink hover:bg-slate-50 px-3.5 py-1.5 rounded-lg border border-border transition font-medium text-xs"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Mbrapa
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    type="button"
                    onClick={() => navigateStep(1)}
                    className="flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-lg transition font-semibold text-xs shadow-sm"
                  >
                    {currentStep === totalSteps ? (
                      <>
                        Përfundo Regjistrimin <Check className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        Vazhdo <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <SuccessScreen resetWizard={resetForm} />
            )}
          </form>
        </section>

        {/* RIGHT COLUMN: Guidelines & React Spec (5 Cols) */}
        <section className="lg:col-span-5 space-y-6">
          {/* Quick Rules (Albania vs Kosovo) */}
          <div className="bg-white border border-border rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
              <Landmark className="w-4.5 h-4.5 text-brand" />
              Formatet dhe Shtetet
            </h3>

            <div className="space-y-4 text-xs">
              {/* Albania requirements */}
              <div className="border-l-2 border-indigo-200 pl-3 py-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇦🇱</span>
                  <span className="font-bold text-ink">Shqipëri (QKB)</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-ink-soft leading-relaxed">
                  <li>
                    <strong>NIPT:</strong> 10 karaktere. Fillon dhe mbaron me shkronjë (p.sh.{' '}
                    <code>K12345678A</code>).
                  </li>
                  <li>
                    <strong>Burimi i të Dhënave:</strong> Integrim me API e hapur të QKB ose e-Albania për kërkim në
                    kohë reale.
                  </li>
                </ul>
              </div>

              {/* Kosovo requirements */}
              <div className="border-l-2 border-indigo-200 pl-3 py-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🇽🇰</span>
                  <span className="font-bold text-ink">Kosovë (ARBK)</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-ink-soft leading-relaxed">
                  <li>
                    <strong>NUI / Numri Fiskal:</strong> Saktësisht 9 shifra (p.sh. <code>330123456</code>).
                  </li>
                  <li>
                    <strong>Burimi i të Dhënave:</strong> Integrim me API e ARBK apo portalin e ATK për të dhënat e
                    biznesit.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* React frontend component schema */}
          <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-border bg-slate-50 px-4 py-3 flex items-center justify-between">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Kodi i Propozuar (React)</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-brand-tint text-brand">
                React + Inertia
              </span>
            </div>
            <div className="p-4">
              <p className="text-xs text-ink-soft mb-3">
                Struktura e komponentit React me funksionin e kërkimit të NIPT/NUI:
              </p>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-[10px] text-slate-300 overflow-x-auto">
                <pre className="leading-relaxed">
                  {`import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function BusinessOnboarding() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        country: '',
        fiscal_number: '',
        company_name: '',
        legal_form: '',
        brand_name: '',
        region: '',
        city: '',
        address_line: '',
        postal_code: '',
        company_phone: '',
        company_website: '',
        uploaded_document: null
    });

    const handleSearch = async () => {
        if (!data.fiscal_number) return;
        setLoading(true);
        try {
            const response = await fetch(
                \`/api/fetch-business?number=\${data.fiscal_number}&country=\${data.country}\`
            );
            const resData = await response.json();
            
            if (resData.success) {
                setData(prev => ({
                    ...prev,
                    company_name: resData.company_name,
                    legal_form: resData.legal_form,
                    region: resData.region,
                    city: resData.city,
                    address_line: resData.address_line,
                    postal_code: resData.postal_code,
                }));
                setFetched(true);
            }
        } catch (err) {
            console.error("Biznesi nuk u gjet", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Strukturimi i formës dhe navigimit */
    );
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Keshilla Section */}
          <div className="bg-white border border-border rounded-xl shadow-sm p-6 space-y-3">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Lightbulb className="w-4.5 h-4.5 text-brand" />
              Këshilla
            </h3>
            <ul className="list-decimal pl-4 text-xs text-ink-soft space-y-2 leading-relaxed">
              <li>
                <strong>Përparësia e UX:</strong> Kërkimi me API (Auto-fetch) shmang gabimet e shkrimit dhe shkurton kohën e
                regjistrimit me 80%. Ky është fluksi më profesional për t'u zbatuar.
              </li>
              <li>
                <strong>Zgjedhja e Shtetit:</strong> Të mbahet gjithmonë e thjeshtë me vetëm dy opsione të qarta me flamuj
                (Shqipëri dhe Kosovë).
              </li>
              <li>
                <strong>Fushat Read-Only:</strong> Fushat që merren direkt nga QKB ose ARBK (si Emri Zyrtar dhe Adresa) duhet
                të jenë vetëm për lexim (Read-only) që të mos ndryshohen nga përdoruesi.
              </li>
              <li>
                <strong>Rishikimi Final:</strong> Hapi i fundit duhet të jetë gjithmonë një kartë përmbledhëse përpara se të
                kryhet dërgimi.
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 text-center text-xs text-ink-soft border-t border-border pt-6 mb-12">
        <p>&copy; 2026 Pika Platform. Specifikimi i Regjistrimit të Biznesit. Të gjitha të drejtat të rezervuara.</p>
      </footer>
    </div>
  );
};
export default BusinessOnboarding;
