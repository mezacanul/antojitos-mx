"use client";
import { cn } from "@/utils/cn";
import { Step1 } from "./Step1";
import { useState } from "react";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { FinalizarRegistro } from "./FinalizarRegistro";

export default function RegistroWizard({
  businessCategories,
  states,
}: {
  businessCategories: any[];
  states: any[];
}) {
  const totalSteps = Titles.wizard.length;
  const [step, setStep] = useState(0);

  const handleStart = () => {
    setStep(1);
  };

  return (
    <>
      {/* Titles and progress dots */}
      <div className="flex flex-col items-center justify-center gap-3">
        <TitlesComponent step={step} />
      </div>

      {/* Start button */}
      {step == 0 && (
        <button
          className="btn-registro flex items-center gap-2"
          onClick={handleStart}
        >
          <span>{"Empezar Registro"}</span>
        </button>
      )}

      {/* Wizard content */}
      {step > 0 && (
        <div className="flex w-[16rem] flex-col gap-2 justify-center items-center">
          {/* Datos de la empresa */}
          {step === 1 && (
            <Step1
              businessCategories={businessCategories}
              setStep={setStep}
            />
          )}
          {/* Datos del usuario */}
          {step === 2 && <Step2 setStep={setStep} />}
          {/* Datos de la sucursal */}
          {step === 3 && (
            <Step3 states={states} setStep={setStep} />
          )}
          {/* Finalizar registro */}
          {step === 4 && <FinalizarRegistro />}
        </div>
      )}

      {/* Progress dots */}
      {step > 0 && (
        <ProgressDots totalSteps={totalSteps} step={step} />
      )}
    </>
  );
}

function ButtonSiguiente({
  handleNext,
}: {
  handleNext: () => void;
}) {
  return (
    <button
      className="btn-registro-siguiente w-full"
      onClick={handleNext}
    >
      Siguiente
    </button>
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

function TitlesComponent({ step }: { step: number }) {
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
              "w-2 h-2 rounded-full shadow-sm",
              step > index && "bg-blue-700",
              step <= index && "bg-blue-600/30"
            )}
          />
        )
      )}
    </div>
  );
}
