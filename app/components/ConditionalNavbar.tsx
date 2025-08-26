import { getNavbarConfig } from "@/app/lib/services/navbarService";
import ConditionalNavbarClient from "./ConditionalNavbarClient";

export default async function ConditionalNavbar() {
  // Fetch navbar configuration server-side
  const navbarConfig = await getNavbarConfig();
  
  return <ConditionalNavbarClient config={navbarConfig} />;
} 