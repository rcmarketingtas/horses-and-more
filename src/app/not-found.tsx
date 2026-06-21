import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-16">
      <div className="text-center max-w-md px-6">
        <p className="text-[120px] font-bold text-[#f0f0f0] leading-none select-none">
          404
        </p>
        <h1 className="text-2xl font-light tracking-tight text-black mb-4 -mt-6">
          Page not found
        </h1>
        <p className="text-sm text-[#888] mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Try
          heading back to the shop.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
