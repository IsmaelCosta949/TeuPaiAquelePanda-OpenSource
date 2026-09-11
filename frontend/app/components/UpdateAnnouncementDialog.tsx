import { UPDATE_ITEMS, UPDATE_TITLE } from "../lib/updateAnnouncement";
import type { UpdateAnnouncementDialogProps } from "../types/updateAnnouncementDialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function UpdateAnnouncementDialog({
  open,
  onClose,
}: UpdateAnnouncementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {UPDATE_TITLE}
          </DialogTitle>
        </DialogHeader>
        <ul className="space-y-2 text-sm text-panda-gray dark:text-white/70 list-disc list-inside">
          {UPDATE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <DialogFooter>
          <Button onClick={onClose}>Entendi!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
