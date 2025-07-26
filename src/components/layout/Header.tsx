"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, BookOpen, LayoutDashboard, Calendar, Users, FileText, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "./UserNav";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lessons", label: "Lesson Planner", icon: FileText },
  { href: "/students", label: "Students", icon: Users },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function Header() {
  const pathname = usePathname();
  const pageTitle = navItems.find(item => pathname.startsWith(item.href))?.label || "Sahayak";

  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="flex items-center justify-center h-20 border-b">
              <Link href="/" className="flex items-center gap-2 text-primary">
                <BookOpen className="h-8 w-8" />
                <span className="text-2xl font-bold font-headline">Sahayak</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
              <nav className="grid items-start px-4 text-sm font-medium gap-2">
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
          </SheetContent>
        </Sheet>
      </nav>

      <div className="w-full flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <h1 className="text-xl font-semibold font-headline">{pageTitle}</h1>
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
