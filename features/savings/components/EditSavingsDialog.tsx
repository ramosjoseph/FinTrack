"use client";

import { useState } from "react";

import type { SavingsGoal } from "../types/savings";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditSavingsForm from "./EditSavingsForm";

interface Props {
  goal: SavingsGoal;
}

export default function EditSavingsDialog({
  goal,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Edit Savings Goal
          </DialogTitle>
        </DialogHeader>

        <EditSavingsForm
          goal={goal}
          onSuccess={() =>
            setOpen(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}