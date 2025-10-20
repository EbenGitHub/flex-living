'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, BarChart3, ScanEye , MessageSquare} from "lucide-react";

export const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/reviews", label: "Review Management", icon: MessageSquare },
    { href: "/preview", label: "Preview Website", icon: ScanEye },
  ];

  return (
    <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Flex Living Reviews</h1>
              <p className="text-sm text-muted-foreground">
                Property Management Dashboard
              </p>
            </div>
          </div>

          <nav className="flex gap-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
