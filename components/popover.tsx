import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Drawer } from "vaul";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Popover({
  children,
  content,
  align = "center",
  open,
  onOpenChange,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <PopoverPrimitive.Trigger className="sm:inline-flex" asChild>
          {children}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            sideOffset={8}
            align={align}
            className="z-50 rounded-md focus:outline-none border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger className="sm:hidden" asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 z-50 bg-black/80" />
      <Drawer.Portal>
        <Drawer.Content className="fixed focus:outline-none inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background pt-8 px-2 pb-4">
          <div className="relative">
            <span className="absolute left-1/2 w-10 h-1 rounded-full bg-muted transform -translate-x-1/2 -top-4"></span>
          </div>
          <div className="grid">{content}</div>
        </Drawer.Content>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
}
