import React, { PropsWithChildren } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

// ! \\ Dialog Trigger wraps the DialogTriggerContent inside a Button => any Button must be used with the asChild property set
type Props = PropsWithChildren & {
  DialogTriggerContent?: React.ReactNode;
  title?: string;
  description?: string;
  dialogFooter?: React.ReactNode;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
};

const CustomDialog: React.FC<Props> = ({
  children,
  DialogTriggerContent,
  title,
  description,
  dialogFooter,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{DialogTriggerContent}</DialogTrigger>
      <DialogContent className="max-w-full w-4/5 xl:p-16">
        <ScrollArea viewportClassName="max-h-[80dvh]">
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
          {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
