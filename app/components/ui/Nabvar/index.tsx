"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcons } from "../Icon";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { useTheme } from "@/app/lib/theme-provider";
import { NavbarProps } from "./Navbar.types";
import { NAVBAR_CONFIG } from "./constant";
import Image from "next/image";

export default function Navbar({
  config = {},
  className = "",
  onSearchSubmit,
  onConsultationClick,
}: NavbarProps = {}) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const finalConfig = useMemo(
    () => ({ ...NAVBAR_CONFIG, ...config }),
    [config]
  );

  // Advanced scroll effect with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search with advanced features
  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearchSubmit?.(searchQuery.trim());
        setIsOpen(false);
        setSearchFocused(false);
        searchRef.current?.blur();
      }
    },
    [searchQuery, onSearchSubmit]
  );

  // Mobile menu toggle
  const toggleMobileMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setSearchFocused(false);
    setActiveDropdown(null);
  }, []);

  // Consultation handler
  const handleConsultationClick = useCallback(() => {
    onConsultationClick?.();
    closeMobileMenu();
  }, [onConsultationClick, closeMobileMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      const toggleButton = document.querySelector(
        '[aria-label="Toggle navigation menu"]'
      );

      if (
        toggleButton &&
        (toggleButton === target || toggleButton.contains(target))
      ) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(target) && isOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMobileMenu]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeMobileMenu]);

  const getThemeIcon = () => {
    if (!mounted) return <LucideIcons.Moon className="h-5 w-5" />;
    return theme === "dark" ? (
      <LucideIcons.Sun className="h-5 w-5" />
    ) : (
      <LucideIcons.Moon className="h-5 w-5" />
    );
  };

  return (
    <>
      {/* Main Navigation Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
              : "bg-background border-b border-border"
          }
          ${className}
        `}
      >
        <div className="container">
          {/* Mobile Navigation Bar */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative h-10 w-10 rounded-xl transition-all duration-300 ease-out hover:bg-hover focus:bg-hover focus:ring-2 focus:ring-ring bg-transparent border-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              type="button"
            >
              <div className="relative w-6 h-6 mx-auto">
                <span
                  className={`absolute block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "top-3 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "opacity-0" : "top-2.5 opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-foreground transition-all duration-300 ease-out ${
                    isOpen ? "top-3 -rotate-45" : "top-4"
                  }`}
                />
              </div>
            </button>

            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Renderwise"
                width={100}
                height={100}
                className="object-contain lg:w-30 h-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {finalConfig.mainNavItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-foreground hover:text-primary transition-all duration-200 font-medium text-base group-hover:scale-105"
                    onMouseEnter={() =>
                      item.hasDropdown && setActiveDropdown(item.name)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <LucideIcons.ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown &&
                    item.dropdownItems &&
                    activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 p-2"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            href={dropdownItem.href}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-hover transition-all duration-200 group"
                          >
                            {dropdownItem.icon && (
                              <dropdownItem.icon className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <div>
                              <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                                {dropdownItem.name}
                              </div>
                              {dropdownItem.description && (
                                <div className="text-sm text-text-muted mt-1">
                                  {dropdownItem.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              {/* Search Toggle - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchFocused(!searchFocused)}
                className="hidden lg:flex h-10 w-10 rounded-full border border-border hover:bg-hover transition-all duration-200"
                aria-label="Toggle search"
              >
                <LucideIcons.Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              {finalConfig.showThemeToggle && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-10 w-10 rounded-full border border-border hover:bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label={`Switch to ${
                    theme === "light" ? "dark" : "light"
                  } theme`}
                >
                  {getThemeIcon()}
                </Button>
              )}

              {/* Consultation CTA - Desktop */}
              {finalConfig.showConsultation && (
                <>
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={handleConsultationClick}
                    className="sm:hidden whitespace-nowrap"
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleConsultationClick}
                    className="hidden sm:flex lg:hidden whitespace-nowrap"
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="hidden lg:flex whitespace-nowrap"
                    onClick={handleConsultationClick}
                    rightIcon={<LucideIcons.ArrowUpRight className="size-5" />}
                  >
                    Let&apos;s Talk
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - Expandable */}
          <div
            className={`
              hidden lg:block overflow-hidden transition-all duration-300 ease-out
              ${searchFocused ? "max-h-20 pb-4" : "max-h-0"}
            `}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  ref={searchRef}
                  type="search"
                  placeholder="Search our services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-border text-foreground placeholder:text-text-muted rounded-full"
                  autoFocus={searchFocused}
                />
                <LucideIcons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground transition-all 
                  duration-200 hover:scale-105"
                >
                  <LucideIcons.ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-out
          ${
            isOpen
              ? "visible opacity-100"
              : "invisible opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300
            ${isOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={closeMobileMenu}
        />

        {/* Sidebar */}
        <div
          ref={menuRef}
          className={`
            absolute z-50 top-0 left-0 h-full w-full sm:max-w-[85vw] bg-background border-r border-border
            transform transition-transform duration-300 ease-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col shadow-2xl
          `}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src="/images/logo.png"
                alt="Renderwise"
                width={100}
                height={100}
                className="object-contain"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileMenu}
              className="h-10 w-10 rounded-xl border border-border hover:bg-hover transition-all duration-200 hover:scale-105"
              aria-label="Close menu"
            >
              <LucideIcons.X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div className="p-6">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                Services & Solutions
              </h3>
              <div className="space-y-2">
                {finalConfig.mainNavItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
                      onClick={closeMobileMenu}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon && (
                          <item.icon className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors duration-200" />
                        )}
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {item.name}
                        </span>
                      </div>
                      {item.hasDropdown && (
                        <LucideIcons.ChevronDown className="h-4 w-4 text-text-muted group-hover:text-primary transition-all duration-200" />
                      )}
                    </Link>

                    {/* Mobile Dropdown Items */}
                    {item.hasDropdown && item.dropdownItems && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.dropdownItems.map((dropdownItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-hover transition-all duration-200"
                            onClick={closeMobileMenu}
                          >
                            {dropdownItem.icon && (
                              <dropdownItem.icon className="h-4 w-4 text-primary" />
                            )}
                            <span className="text-sm text-text-secondary hover:text-foreground transition-colors duration-200">
                              {dropdownItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Navigation */}
            <div className="px-6 pb-6 border-t border-border pt-6">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">
                Company
              </h3>
              <div className="space-y-2">
                {finalConfig.secondaryNavItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex items-center p-2 rounded-xl hover:bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 text-text-muted group-hover:text-primary mr-3 transition-colors duration-200" />
                    )}
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-border">
            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-6 mb-4">
              {finalConfig.socialIcons.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-text-muted hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label={social.label}
                  {...(social.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Consultation CTA */}
            {finalConfig.showConsultation && (
              <Button
                onClick={handleConsultationClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white rounded-xl py-3 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <LucideIcons.Calendar className="h-4 w-4 mr-2" />
                Schedule Free Consultation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
