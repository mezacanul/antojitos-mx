import { BusinessFormType } from "@/lib/schema/forms";
import { create } from "zustand";

type BusinessFormStore = {
  businessFormData: BusinessFormType;
  setBusinessFormData: (data: BusinessFormType) => void;
  resetBusinessFormData: (data: BusinessFormType) => void;
};

export const defaultBusinessFormData: BusinessFormType = {
  name: "",
  category_id: "",
};

export const useBusinessFormStore =
  create<BusinessFormStore>((set) => ({
    businessFormData: defaultBusinessFormData,
    setBusinessFormData: (data) =>
      set((state) => ({
        businessFormData: {
          ...state.businessFormData,
          ...data,
        },
      })),
    resetBusinessFormData: (data) =>
      set({ businessFormData: data }),
  }));
