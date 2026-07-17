import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepsText: Record<number, string> = {
  1: "Hapi 1: Llogaria",
  2: "Hapi 2: Zgjedhja e Shtetit",
  3: "Hapi 3: Të Dhënat e Biznesit",
  4: "Hapi 4: Adresa & Kontakti",
  5: "Hapi 5: Rishikimi & Përfundimi",
};

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center text-xs font-semibold text-ink-soft mb-2">
        <span>{stepsText[currentStep]}</span>
        <span>{currentStep} nga {totalSteps}</span>
      </div>
      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden flex">
        <div
          className="bg-brand h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      {/* Step circles */}
      <div className="flex justify-between mt-4 relative px-1">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10"></div>
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          let circleClass = "";
          let circleContent: React.ReactNode = stepNum;

          if (isCompleted) {
            circleClass =
              "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-brand text-white border-2 border-brand z-10 transition-all";
            circleContent = <Check className="w-3.5 h-3.5" />;
          } else if (isActive) {
            circleClass =
              "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-brand text-white border-2 border-brand z-10 scale-110 shadow-sm transition-all";
          } else {
            circleClass =
              "w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs bg-white border-2 border-border text-ink-muted z-10 transition-all";
          }

          return (
            <div key={stepNum} className={circleClass}>
              {circleContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default StepProgressBar;
