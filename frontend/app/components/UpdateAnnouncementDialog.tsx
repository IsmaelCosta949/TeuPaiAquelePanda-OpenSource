import { UPDATE_ITEMS, UPDATE_TITLE } from "../lib/updateAnnouncement";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function UpdateAnnouncementDialog({
  ...props
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog isOpen={props.open} onOpenChange={(next) => !next && props.onClose()}>
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
          <Button onPress={props.onClose}>Entendi!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
