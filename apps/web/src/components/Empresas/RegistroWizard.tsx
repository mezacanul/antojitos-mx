"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

export default function RegistroWizard({
  totalSteps,
  step,
  setStep,
}: {
  totalSteps: number;
  step: number;
  setStep: (step: number) => void;
}) {
  const handleNext = () => {
    if (step === totalSteps) return;
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {step === 1 && <Step1 />}
      <ButtonSiguiente handleNext={handleNext} />
    </div>
  );
}

function ButtonSiguiente({
  handleNext,
}: {
  handleNext: () => void;
}) {
  return (
    <button
      className="btn-registro-siguiente"
      onClick={handleNext}
    >
      Siguiente
    </button>
  );
}

function Step1() {
  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Nombre de la empresa"
        className={cn("input-text")}
      />
      <select className="input-text">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </form>
  );
}
