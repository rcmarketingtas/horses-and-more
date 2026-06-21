"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  productId?: string;
  productName?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ productId, productName, onSuccess }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: productName
        ? `I'm interested in "${productName}". Could you please provide more information?`
        : "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, productId }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      onSuccess?.();
      toast({
        title: "Enquiry sent",
        description: "We'll be in touch within one business day.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "error",
      });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-4">
        <div className="w-14 h-14 border border-black flex items-center justify-center">
          <CheckCircle className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-light">Enquiry Received</h3>
        <p className="text-sm text-[#888] max-w-xs">
          Thank you! We'll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {productName && (
        <div className="bg-[#fafafa] border border-[#e5e5e5] px-4 py-3 text-sm text-[#444]">
          Enquiring about:{" "}
          <span className="font-semibold text-black">{productName}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            {...register("name")}
            aria-invalid={!!errors.name}
            className={errors.name ? "border-[#888]" : ""}
          />
          {errors.name && (
            <p className="text-xs text-[#888]">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
            className={errors.email ? "border-[#888]" : ""}
          />
          {errors.email && (
            <p className="text-xs text-[#888]">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="0400 000 000"
          {...register("phone")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us what you're looking for…"
          {...register("message")}
          aria-invalid={!!errors.message}
          className={errors.message ? "border-[#888]" : ""}
        />
        {errors.message && (
          <p className="text-xs text-[#888]">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>

      <p className="text-[11px] text-[#888] text-center">
        We reply within 1 business day. Your details are never shared.
      </p>
    </form>
  );
}
