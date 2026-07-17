"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { deleteAttendanceAction } from "../actions/delete-attendance";

interface Props {
  logId: string;
}

export default function DeleteAttendanceButton({
  logId,
}: Props) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete this attendance record?"
      );

    if (!confirmed) {
      return;
    }

    startTransition(
      async () => {
        const result =
          await deleteAttendanceAction(
            logId
          );

        if (!result.success) {
          alert(
            result.error ??
              "Failed to delete record."
          );

          return;
        }

        router.refresh();
      }
    );
  }

  return (
    <Button
      size="icon"
      variant="destructive"
      disabled={isPending}
      onClick={
        handleDelete
      }
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}