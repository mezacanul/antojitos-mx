import { BusinessForm } from "@/types";
import { create } from "zustand";

type BusinessFormStore = {
  formData: BusinessForm;
  setFormData: (data: Partial<BusinessForm>) => void;
  resetFormData: (data: BusinessForm) => void;
};

const defaultFormData: BusinessForm = {
  name: "",
  description: "",
  image: "",
};

export const useBusinessFormStore =
  create<BusinessFormStore>((set) => ({
    formData: defaultFormData,
    setFormData: (data) =>
      set((state) => ({
        formData: { ...state.formData, ...data },
      })),
    resetFormData: (data) => set({ formData: data }),
  }));
