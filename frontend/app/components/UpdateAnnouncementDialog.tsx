import { createPortal } from "react-dom";
import { UPDATE_ITEMS, UPDATE_TITLE } from "../lib/updateAnnouncement";
import type { UpdateAnnouncementDialogProps } from "../types/updateAnnouncementDialog";

export function UpdateAnnouncementDialog({
  open,
  onClose,
}: UpdateAnnouncementDialogProps) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-6 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-lg font-semibold text-panda-ink dark:text-panda-paper">
          {UPDATE_TITLE}
        </h2>
        <ul className="space-y-2 text-sm text-panda-gray dark:text-white/70 list-disc list-inside">
          {UPDATE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Entendi!
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
