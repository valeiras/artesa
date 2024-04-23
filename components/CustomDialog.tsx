import React, { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = PropsWithChildren & {
  dialogTrigger: React.ReactNode;
  title?: string;
  description?: string;
  dialogFooter?: React.ReactNode;
};

const CustomDialog: React.FC<Props> = ({ children, dialogTrigger, title, description, dialogFooter }) => {
  return (
    <Dialog>
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
