import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
}: PageHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="font-semibold h-9 px-4 bg-white"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shrink-0">
          <Icon className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="text-sm text-slate-600 font-medium">{description}</p>
        </div>
      </div>
    </>
  );
}
