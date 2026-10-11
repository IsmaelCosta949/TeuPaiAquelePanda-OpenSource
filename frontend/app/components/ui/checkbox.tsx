import {
  Checkbox as AriaCheckbox,
  composeRenderProps,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { CheckIcon } from "lucide-react";
import { cn } from "cn";

type CheckboxProps = Omit<AriaCheckboxProps, "className"> & {
  className?: string;
};

function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      data-slot="checkbox"
      className={composeRenderProps(className, (className) =>
        cn("group flex cursor-pointer items-center gap-2 disabled:cursor-not-allowed", className),
      )}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <div
            data-slot="checkbox-box"
            className={cn(
              "relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none dark:bg-input/30",
              "group-focus-visible:border-ring group-focus-visible:ring-3 group-focus-visible:ring-ring/50",
              "group-disabled:cursor-not-allowed group-disabled:opacity-50",
              "group-invalid:border-destructive group-invalid:ring-3 group-invalid:ring-destructive/20",
              isSelected &&
                "border-primary bg-primary text-primary-foreground dark:bg-primary",
            )}
          >
            {isSelected && <CheckIcon aria-hidden="true" className="size-3.5" />}
          </div>
          {children}
        </>
      ))}
    </AriaCheckbox>
  );
}

export { Checkbox };
