"use server";

import { revalidatePath } from "next/cache";

// Server action to revalidate logo marquee cache
export async function revalidateLogoMarquee() {
  revalidatePath("/api/logo-marquee");
  revalidatePath("/api/logo-marquee/main");
  revalidatePath("/");
  revalidatePath("/admin/logo-marquee");
} 