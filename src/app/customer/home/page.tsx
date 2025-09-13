"use client";

import SuccessDialog from "@/app/components/SuccessMessage";
import { useState } from "react";

export default function DemoPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Mời thành viên
      </button>

      <SuccessDialog
        open={open}
        onClose={() => setOpen(false)}
        message="Invite successfully!"
      />
    </div>
  );
}
