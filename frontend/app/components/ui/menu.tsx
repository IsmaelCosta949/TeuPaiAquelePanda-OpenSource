import type { ReactNode } from "react"
import {
  Header as AriaHeader,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection as AriaMenuSection,
  MenuTrigger,
  Popover,
  composeRenderProps,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
} from "react-aria-components"
import { cn } from "cn"

function Menu<T extends object>({
  className,
  ...props
}: Omit<MenuProps<T>, "className"> & { className?: string }) {
  return (
    <Popover
      data-slot="menu-popover"
      placement="bottom end"
      offset={8}
      className="z-50 max-h-[min(32rem,var(--visible-area-height))] w-72 overflow-auto rounded-xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none entering:animate-in entering:fade-in-0 entering:zoom-in-95 exiting:animate-out exiting:fade-out-0 exiting:zoom-out-95"
    >
      <AriaMenu
        data-slot="menu"
        className={cn("p-1.5 outline-none", className)}
        {...props}
      />
    </Popover>
  )
}

function MenuSection<T extends object>({
  title,
  children,
  ...props
}: Omit<MenuSectionProps<T>, "children"> & {
  title: string
  children: ReactNode
}) {
  return (
    <AriaMenuSection
      data-slot="menu-section"
      className="not-first:mt-1.5"
      {...props}
    >
      <AriaHeader className="px-2.5 pt-1.5 pb-1 font-display text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </AriaHeader>
      {children}
    </AriaMenuSection>
  )
}

function MenuItem({
  className,
  ...props
}: Omit<MenuItemProps, "className"> & { className?: string }) {
  return (
    <AriaMenuItem
      data-slot="menu-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none focus:bg-muted focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-panda-red dark:[&_svg]:text-panda-red-light",
          className
        )
      )}
      {...props}
    />
  )
}

export { Menu, MenuItem, MenuSection, MenuTrigger }
