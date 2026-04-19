import { create } from "zustand";

type ModalStateStore = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalStateStore = create<ModalStateStore>(
  (set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  })
);
