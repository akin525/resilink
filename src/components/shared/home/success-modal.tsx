"use client";

import { Dialog, DialogContent } from "../../ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuccessModal({ open, onOpenChange }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 md:max-w-md rounded-lg p-6 bg-white">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-blue-50 p-3">
            <CheckIcon className="h-8 w-8 text-bc" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">
              Thanks for contacting us!
            </h3>
            <p className="text-gray-500">
              We'll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-bc px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CheckIcon(props: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={props.className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <path d="m9 11 3 3L22 4"></path>
    </svg>
  );
}
