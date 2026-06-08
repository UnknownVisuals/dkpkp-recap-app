import Link from "next/link";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export function ModuleCard({
  title,
  description,
  href,
  icon,
}: ModuleCardProps) {
  return (
    <Card className="bg-white flex flex-col justify-between shadow-sm border-slate-200 transition-all hover:shadow-md">
      <CardHeader className="p-8 pb-4 flex flex-col items-center text-center space-y-4">
        {/* Module Icon Container */}
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl border bg-slate-50 text-slate-700">
          {icon}
        </div>

        {/* Module Descriptions */}
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-800">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground max-w-70">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Primary Action Core */}
      <CardContent className="p-8 pt-0 space-y-6">
        <Separator className="bg-slate-100" />
        <Button
          asChild
          size="lg"
          className="w-full h-12 font-semibold text-sm group transition-colors"
        >
          <Link href={href} className="flex items-center justify-center gap-2">
            Buka Modul {title.split(" ")[0]}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
