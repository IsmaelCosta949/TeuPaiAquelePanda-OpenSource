import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ ...props }: ConfirmDialogProps) {
  return (
    <Dialog
      open={props.open}
      onOpenChange={(next) => !next && props.onCancel()}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-display">{props.title}</DialogTitle>
          {props.description && (
            <DialogDescription>{props.description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={props.onCancel}>
            {props.cancelLabel}
          </Button>
          <Button onClick={props.onConfirm}>{props.confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
