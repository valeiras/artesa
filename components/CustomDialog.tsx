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

type Props = PropsWithChildren & {
  dialogTrigger?: React.ReactNode;
  title?: string;
  description?: string;
  dialogFooter?: React.ReactNode;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
};

const CustomDialog: React.FC<Props> = ({
  children,
  dialogTrigger,
  title,
  description,
  dialogFooter,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="max-w-full w-4/5 xl:p-16">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
