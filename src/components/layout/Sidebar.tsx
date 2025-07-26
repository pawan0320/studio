"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Calendar, Users, FileText, UserCircle, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserNav } from "./UserNav";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons", label: "Lesson Planner", icon: FileText },
  { href: "/students", label: "Students", icon: Users },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={cn("hidden md:flex flex-col h-full bg-card border-r", className)}>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-20 border-b">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">Sahayak</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                className="w-full justify-start text-base"
              >
                <item.icon className="mr-3 h-5 w-5 text-accent" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <UserNav />
      </div>
    </div>
  );
}
