"use client";

import ActionButton from "@/components/global/action-button";
import Modal from "@/components/global/modal";
import { useModal } from "@/providers/modal-provider";
import { Sparkles } from "lucide-react";
import React from "react";
import GenerateForm from "../../forms/generate-form";

const GenerateButton = () => {
  const { setOpen } = useModal();

  return (
    <ActionButton
      text="Generate"
      icon={<Sparkles size={16} />}
      onClick={() =>
        setOpen(
          <Modal title="Generate">
            <GenerateForm />
          </Modal>
        )
      }
    />
  );
};

export default GenerateButton;
