"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EnquiryForm from "./EnquiryForm";
import { MessageSquare } from "lucide-react";

interface Props {
  productId?: string;
  productName?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline" | "ghost";
  triggerSize?: "default" | "sm" | "lg" | "icon";
}

export default function EnquiryModal({
  productId,
  productName,
  triggerLabel = "Enquire Now",
  triggerVariant = "default",
  triggerSize = "default",
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize}>
          <MessageSquare className="h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Make an Enquiry</DialogTitle>
          <DialogDescription>
            Fill in the form below and we'll be in touch within one business
            day.
          </DialogDescription>
        </DialogHeader>
        <EnquiryForm
          productId={productId}
          productName={productName}
          onSuccess={() => setTimeout(() => setOpen(false), 3000)}
        />
      </DialogContent>
    </Dialog>
  );
}
