"use client";
import { createContext, useContext, useState } from "react";
import { useEventListener, useIsMounted } from "usehooks-ts";

interface ModalProviderProps {
  children: React.ReactNode;
}

type ModalContextType = {
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<unknown>) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const isMounted = useIsMounted();

  const setOpen = async (modal: React.ReactNode) => {
    if (modal) {
      setShowingModal(modal);
      setIsOpen(true);
    }
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setClose();
    }
  });

  const setClose = () => {
    setIsOpen(false);
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{ setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the modal provider");
  }
  return context;
};

export default ModalProvider;
