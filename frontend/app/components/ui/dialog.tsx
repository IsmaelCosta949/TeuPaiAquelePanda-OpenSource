import * as React from "react"
import { cn } from "cn"
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from "react-aria-components"
import { XIcon } from "lucide-react"

import { Button } from "~/components/ui/button"

type DialogProps = Pick<
  ModalOverlayProps,
  "isOpen" | "defaultOpen" | "onOpenChange" | "children"
>

function Dialog({ children, ...props }: DialogProps) {
  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable
      className="fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs entering:animate-in entering:fade-in-0 exiting:animate-out exiting:fade-out-0"
      {...props}
    >
      {children}
    </ModalOverlay>
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
}: {
  className?: string
  children: React.ReactNode
  showCloseButton?: boolean
}) {
  return (
    <Modal
      data-slot="dialog-content"
      className={cn(
        "fixed top-1/2 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-popover text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95",
        className
      )}
    >
      <AriaDialog className="grid gap-4 p-4 outline-none">
        {children}
        {showCloseButton && (
          <Button
            slot="close"
            variant="ghost"
            className="absolute top-2 right-2"
            size="icon-sm"
          >
            <XIcon aria-hidden="true" />
            <span className="sr-only">Fechar</span>
          </Button>
        )}
      </AriaDialog>
    </Modal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot">) {
  return (
    <Heading
      slot="title"
      data-slot="dialog-title"
      className={cn("text-base leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
}
