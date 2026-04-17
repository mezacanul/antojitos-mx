import { BranchFormType } from "@/lib/schema/forms";
import { create } from "zustand";

type BranchFormStore = {
  branchFormData: BranchFormType;
  setBranchFormData: (data: BranchFormType) => void;
  resetBranchFormData: (data: BranchFormType) => void;
};

export const defaultBranchFormData: BranchFormType = {
  name: "",
  address: "",
  latitude: "0.0",
  longitude: "0.0",
};

export const useBranchFormStore = create<BranchFormStore>(
  (set) => ({
    branchFormData: defaultBranchFormData,
    setBranchFormData: (data) =>
      set((state) => ({
        branchFormData: {
          ...state.branchFormData,
          ...data,
        },
      })),
    resetBranchFormData: (data) =>
      set({ branchFormData: data }),
  })
);
