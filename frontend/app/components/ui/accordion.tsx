import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "cn";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none cursor-pointer hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    // forceMount keeps content mounted while closed instead of Radix's
    // default of unmounting it — otherwise every input/generated value
    // inside is lost the moment an item closes.
    //
    // The open/close transition is a CSS grid-template-rows animation (0fr
    // <-> 1fr) on a wrapper div we control, NOT on the element Radix
    // renders/refs — Radix's own node briefly zeroes its inline
    // transition-duration/animation-name to take an instant height
    // measurement, and with forceMount that reset doesn't get restored
    // until the item is actually toggled, so a transition placed on that
    // same node gets its target value "measured in" before the duration
    // comes back, producing a snap instead of an ease. A transition on our
    // own wrapper (data-state read via `group`) never touches that node,
    // sidestepping the fight entirely. It also needs no JS-measured pixel
    // height, so it keeps working when content grows while already open
    // (JSON output, JWT panels appearing post-open) instead of clipping.
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="group text-sm"
      {...props}
    >
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out group-data-[state=open]:grid-rows-[1fr]">
        {/* padding lives here, one level below the clipping div — padding
            isn't shrunk by its own element's overflow/min-height, so on the
            same div as the grid item it would leave a permanent sliver
            (e.g. pb-2.5's 10px) even at grid-rows-[0fr]. */}
        <div className="min-h-0 overflow-hidden">
          <div
            className={cn(
              "pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
