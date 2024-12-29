"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  buttons?: React.ReactNode;
};

const Modal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className="overflow-y-auto
      
      
       shad-dialog"
      >
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
