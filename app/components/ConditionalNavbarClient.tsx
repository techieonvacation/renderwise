"use client";

import { usePathname } from "next/navigation";
import Navbar from "./ui/Nabvar";
import { NavbarConfig } from "@/app/lib/models/navbar";

interface ConditionalNavbarClientProps {
  config: NavbarConfig;
}

export default function ConditionalNavbarClient({ config }: ConditionalNavbarClientProps) {
  const pathname = usePathname();
  
  // Hide navbar on admin routes
  const isAdminRoute = pathname.startsWith("/admin");
  
  // Don't render navbar on admin routes
  if (isAdminRoute) {
    return null;
  }
  
  return <Navbar config={config} />;
}
