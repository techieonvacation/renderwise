import { LucideIcon } from "lucide-react"

export interface NavItem {
    name: string
    href: string
    hasDropdown?: boolean
    dropdownItems?: DropdownItem[]
    external?: boolean
    icon?: LucideIcon
    badge?: string
  }
  
  export interface DropdownItem {
    name: string
    href: string
    description?: string
    icon?: LucideIcon
    external?: boolean
    isNew?: boolean
  }
  
  export interface SocialIcon {
    icon: LucideIcon
    href: string
    label: string
    external?: boolean
  }
  
  export interface NavbarConfig {
    mainNavItems: NavItem[]
    secondaryNavItems: NavItem[]
    socialIcons: SocialIcon[]
    showSearch?: boolean
    showThemeToggle?: boolean
    showConsultation?: boolean
    companyName?: string
  }
  
  export interface NavbarProps {
    config?: Partial<NavbarConfig>  
    className?: string
    onSearchSubmit?: (query: string) => void
    onConsultationClick?: () => void
  }
  
  export type NavigationSection = 'main' | 'secondary' | 'mobile' 