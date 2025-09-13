"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function SuccessDialog({ open, onClose, message }: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-2xl shadow-lg max-w-md text-center">
        <AlertDialogHeader className="flex flex-col items-center">
          {/* Vòng tròn vàng chứa emoji */}
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-100 mb-4">
            <span className="text-5xl">🎉</span>
          </div>
          <AlertDialogTitle className="text-xl font-semibold">
            {message}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter >
          <AlertDialogAction
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-15 py-2"
          >
            Thanks!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
