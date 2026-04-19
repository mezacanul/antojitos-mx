"use client";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { cn } from "@/utils/cn";
import { useModalStateStore } from "@/store/useModalStateStore";

export default function ModalProducto({
  label,
  btnClass,
  children,
}: {
  label: string;
  btnClass: string;
  children: React.ReactNode;
}) {
  const { isOpen, openModal, closeModal } =
    useModalStateStore();

  return (
    <>
      <button className={btnClass} onClick={openModal}>
        {label}
      </button>

      <DialogWrapper isOpen={isOpen} onClose={closeModal}>
        {children}
      </DialogWrapper>
    </>
  );
}

function DialogWrapper({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <DialogBackdrop
        className={cn(
          "fixed inset-0",
          isOpen && "bg-black/50",
          !isOpen && "bg-black/0",
          "transition-all duration-200 ease-in-out"
        )}
      />
      {/* <DialogBackdrop
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-200",
          isOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        )}
      /> */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-3xl rounded-xl bg-gray-100 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
