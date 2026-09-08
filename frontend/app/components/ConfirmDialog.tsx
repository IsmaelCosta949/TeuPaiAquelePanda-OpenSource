import { createPortal } from "react-dom";
import type { ConfirmDialogProps } from "../types/confirmDialog";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-6 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-lg font-semibold text-panda-ink dark:text-panda-paper">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-panda-gray dark:text-white/60">
            {description}
          </p>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="rounded-full border-2 border-panda-ink dark:border-white/30 text-panda-ink dark:text-panda-paper text-sm font-semibold px-4 py-2 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
