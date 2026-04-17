import { UserFormType } from "@/lib/schema/forms";
import { create } from "zustand";

type UserFormStore = {
  userFormData: UserFormType;
  setUserFormData: (data: UserFormType) => void;
  resetUserFormData: (data: UserFormType) => void;
};

export const defaultUserFormData: UserFormType = {
  names: "",
  paternal_surname: "",
  maternal_surname: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

export const useUserFormStore = create<UserFormStore>(
  (set) => ({
    userFormData: defaultUserFormData,
    setUserFormData: (data) =>
      set((state) => ({
        userFormData: { ...state.userFormData, ...data },
      })),
    resetUserFormData: (data) =>
      set({ userFormData: data }),
  })
);
