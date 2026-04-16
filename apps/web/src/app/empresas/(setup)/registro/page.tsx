"use client";
import RegistroWizard from "@/components/Empresas/RegistroWizard";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function RegistroPage() {
  const totalSteps = Titles.wizard.length;
  const [step, setStep] = useState(0);

  const handleStart = () => {
    setStep(1);
  };

  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-[2rem]">
      <div className="flex flex-col items-center justify-center gap-3">
        <TitlesComponent
          step={step}
          totalSteps={totalSteps}
        />
      </div>

      {step == 0 && (
        <button
          className="btn-registro flex items-center gap-2"
          onClick={handleStart}
        >
          <span>{"Empezar Registro"}</span>
        </button>
      )}

      {step > 0 && (
        <RegistroWizard
          totalSteps={totalSteps}
          step={step}
          setStep={setStep}
        />
      )}
    </div>
  );
}

const Titles = {
  start: (
    <>
      {"Bienvenido a "}
      <span className="text-blue-600 ">Menius</span>
      <span className="text-orange-600 ">.</span>
    </>
  ),
  wizard: [
    "Información de la empresa",
    "Información del usuario",
    "Agrega una sucursal",
    "Completar registro",
  ],
};

function TitlesComponent({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) {
  return (
    <>
      <h1
        className={cn(
          "text-4xl font-bold",
          step > 0 && "text-2xl"
        )}
      >
        {step == 0 ? Titles.start : Titles.wizard[step - 1]}
      </h1>
      {step > 0 && (
        <ProgressDots totalSteps={totalSteps} step={step} />
      )}
    </>
  );
}

function ProgressDots({
  totalSteps,
  step,
}: {
  totalSteps: number;
  step: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }).map(
        (_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full shadow-sm",
              step > index && "bg-blue-700",
              step <= index && "bg-blue-600/30"
            )}
          />
        )
      )}
    </div>
  );
}
