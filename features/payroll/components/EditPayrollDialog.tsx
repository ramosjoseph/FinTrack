"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PayrollForm from "./PayrollForm";

import type { PayrollSettings } from "../types/payroll";

interface EditPayrollDialogProps {
  payroll: PayrollSettings | null;
}

export default function EditPayrollDialog({
  payroll,
}: EditPayrollDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Edit Payroll Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Payroll Settings
          </DialogTitle>
        </DialogHeader>

        <PayrollForm
          initialData={payroll}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}