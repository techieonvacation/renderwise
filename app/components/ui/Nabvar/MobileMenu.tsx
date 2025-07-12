/**
 * MobileMenu Component
 * 
 * Advanced mobile navigation component that provides:
 * - State management for expandable sub-menus
 * - Beautiful scrollable layout with sections
 * - Touch-optimized interactions
 * - Smooth animations and transitions
 * - Integration with MobileSubMenu components
 * - Social links and consultation CTA
 * 
 * @component
 * @example
 * ```tsx
 * <MobileMenu 
 *   config={navbarConfig}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConsultationClick={() => handleConsultation()}
 * />
 * ```
 */

"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Calendar } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import MobileSubMenu from "./MobileSubMenu";
import { NavbarConfig } from "./Navbar.types";
import * as LucideIcons from "lucide-react";

interface MobileMenuProps {
  config: NavbarConfig;
  isOpen: boolean;
  onClose: () => void;
  onConsultationClick?: () => void;
}

export default function MobileMenu({ 
  config, 
  isOpen, 
  onClose, 
  onConsultationClick 
}: MobileMenuProps) {
  // State to track which sub-menus are expanded
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  /**
   * Dynamic icon loading from Lucide React
   * Safely retrieves icons by name with fallback
   */
  const getIcon = React.useCallback(
    (iconName: string | undefined) => {
      if (!iconName) return null;
      const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
      return Icon ? <Icon className="h-5 w-5" /> : null;
    },
    []
  );

  /**
   * Toggle sub-menu expansion state
   */
  const toggleSubMenu = useCallback((menuName: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuName)) {
        newSet.delete(menuName);
      } else {
        newSet.add(menuName);
      }
      return newSet;
    });
  }, []);

  /**
   * Handle menu item click - closes mobile menu
   */
  const handleMenuItemClick = useCallback(() => {
    onClose();
    // Reset expanded menus when closing
    setExpandedMenus(new Set());
  }, [onClose]);

  /**
   * Handle consultation click
   */
  const handleConsultationClick = useCallback(() => {
    onConsultationClick?.();
    handleMenuItemClick();
  }, [onConsultationClick, handleMenuItemClick]);

  /**
   * Close menu and reset state when menu is closed
   */
  React.useEffect(() => {
    if (!isOpen) {
      setExpandedMenus(new Set());
    }
  }, [isOpen]);

  // Filter active items and sort by order
  const activeMainItems = config.mainNavItems
    .filter(item => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const activeSecondaryItems = config.secondaryNavItems
    .filter(item => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const activeSocialIcons = config.socialIcons
    .filter(social => social.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-out",
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />

        {/* Mobile Menu Sidebar */}
        <div
          className={cn(
            "absolute z-50 top-0 left-0 h-full w-full sm:max-w-[90vw] bg-background border-r border-border",
            "transform transition-transform duration-300 ease-out",
            "flex flex-col shadow-2xl",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <Link href="/" onClick={handleMenuItemClick}>
              <Image
                src="/images/logo.png"
                alt={config.companyName || "Renderwise"}
                width={120}
                height={40}
                className="object-contain h-8 w-auto"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-xl border border-border hover:bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Main Navigation Section */}
            <div className="py-2">
              <div className="px-4 py-3 border-b border-border/10">
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                  Main Navigation
                </h3>
              </div>
              <div className="divide-y divide-border/10">
                {activeMainItems.map((item, index) => (
                  <MobileSubMenu
                    key={`main-${item.name}-${index}`}
                    menu={item}
                    isExpanded={expandedMenus.has(`main-${item.name}`)}
                    onToggle={() => toggleSubMenu(`main-${item.name}`)}
                    onItemClick={handleMenuItemClick}
                  />
                ))}
              </div>
            </div>

            {/* Secondary Navigation Section */}
            {activeSecondaryItems.length > 0 && (
              <div className="py-2 border-t border-border/20">
                <div className="px-4 py-3 border-b border-border/10">
                  <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                    Company
                  </h3>
                </div>
                <div className="divide-y divide-border/10">
                  {activeSecondaryItems.map((item, index) => (
                    <MobileSubMenu
                      key={`secondary-${item.name}-${index}`}
                      menu={item}
                      isExpanded={expandedMenus.has(`secondary-${item.name}`)}
                      onToggle={() => toggleSubMenu(`secondary-${item.name}`)}
                      onItemClick={handleMenuItemClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links Section */}
            <div className="py-2 border-t border-border/20">
              <div className="px-4 py-3 border-b border-border/10">
                <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                  Quick Links
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <Link
                  href="/portfolio"
                  onClick={handleMenuItemClick}
                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group active:bg-primary/10"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    View Our Work
                  </span>
                </Link>
                <Link
                  href="/blog"
                  onClick={handleMenuItemClick}
                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group active:bg-primary/10"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    Latest Insights
                  </span>
                </Link>
                <Link
                  href="/contact"
                  onClick={handleMenuItemClick}
                  className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-200 group active:bg-primary/10"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    Get In Touch
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer - Sticky */}
          <div className="p-4 border-t border-border bg-background/80 backdrop-blur-sm sticky bottom-0">
            {/* Social Icons */}
            {activeSocialIcons.length > 0 && (
              <div className="flex items-center justify-center space-x-6 mb-4">
                {activeSocialIcons.map((social, index) => {
                  const IconComponent = getIcon(social.icon);
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-foreground/60 hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 p-2"
                      aria-label={social.label}
                      onClick={handleMenuItemClick}
                      {...(social.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {IconComponent || <span className="h-5 w-5" />}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Consultation CTA */}
            {config.showConsultation && (
              <Button
                onClick={handleConsultationClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl py-3 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 group"
              >
                <Calendar className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                Schedule Free Consultation
              </Button>
            )}

            {/* Company Info */}
            <div className="mt-4 pt-4 border-t border-border/20 text-center">
              <p className="text-xs text-foreground/50">
                © 2024 {config.companyName || "Renderwise"}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 