"use client";

import { Modal } from "../ui/Modal";
import Terminal from "./Terminal";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} label="Terminal">
      <div className="h-[500px] md:h-[600px] w-full bg-zinc-950 overflow-hidden rounded-3xl border border-white/5">
        <Terminal onStart={onClose} />
      </div>
    </Modal>
  );
}
