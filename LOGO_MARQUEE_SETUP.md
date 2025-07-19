# Logo Marquee System

## Overview

The Logo Marquee system is a dynamic, CMS-managed component that displays a scrolling list of company logos. It's fully configurable through the admin panel and supports real-time updates.

## Features

- **Dynamic Content Management**: Add, edit, remove, and reorder logos through the admin panel
- **Speed Control**: Adjustable animation speed (1-100 seconds)
- **Direction Control**: Left or right scrolling direction
- **Active/Inactive Toggle**: Enable/disable individual logos or the entire marquee
- **Responsive Design**: Works on all screen sizes
- **Real-time Updates**: Changes are reflected immediately on the frontend

## File Structure

```
app/
├── api/logo-marquee/
│   └── route.ts                    # API endpoints for CRUD operations
├── admin/logo-marquee/
│   └── page.tsx                    # Admin interface for managing logos
├── components/ui/MarqueeWrapper/
│   └── logoMarquee.tsx             # Main marquee component
├── lib/
│   ├── models/
│   │   └── logoMarquee.ts          # Data models and validation schemas
│   └── services/
│       └── logoMarquee.ts          # Service functions for API calls
└── layout/AppSidebar.tsx           # Navigation (updated with logo marquee link)
```

## Usage

### Frontend Implementation

The LogoMarquee component is self-contained and fetches its own data:

```tsx
import { LogoMarquee } from "./components/ui/MarqueeWrapper/logoMarquee";

// Basic usage
<LogoMarquee />

// With custom props (optional)
<LogoMarquee
  speed={25}
  direction="right"
  className="custom-class"
/>
```

### Admin Panel Access

1. Navigate to `/admin/logo-marquee`
2. Use the "Logos" tab to manage individual logos
3. Use the "Settings" tab to configure marquee behavior

## API Endpoints

### GET `/api/logo-marquee`

- Returns the current logo marquee configuration
- Includes logos, speed, direction, and active status

### PUT `/api/logo-marquee`

- Updates the logo marquee configuration
- Requires valid configuration data

### DELETE `/api/logo-marquee`

- Resets the configuration to default values

## Data Model

```typescript
interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  order?: number;
  isActive?: boolean;
}

interface LogoMarqueeConfig {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
  isActive?: boolean;
}
```

## Configuration Options

### Logo Properties

- **id**: Unique identifier for the logo
- **name**: Display name for the logo
- **imageUrl**: URL path to the logo image
- **order**: Display order (optional)
- **isActive**: Whether the logo is visible (default: true)

### Marquee Settings

- **speed**: Animation duration in seconds (1-100, default: 30)
- **direction**: Scroll direction ("left" or "right", default: "left")
- **isActive**: Enable/disable the entire marquee (default: true)

## CSS Animations

The system uses predefined CSS animations:

```css
.animate-marquee-left {
  animation: marquee-left 30s linear infinite;
}

.animate-marquee-right {
  animation: marquee-right 25s linear infinite;
}
```

## Default Configuration

The system includes a default configuration with 8 sample logos:

```typescript
const DEFAULT_LOGO_MARQUEE_CONFIG = {
  logos: [
    {
      id: "1",
      name: "Company 1",
      imageUrl: "/images/light-logo.webp",
      order: 1,
      isActive: true,
    },
    // ... 7 more logos
  ],
  speed: 30,
  direction: "left",
  isActive: true,
};
```

## Error Handling

- **API Failures**: Falls back to default configuration
- **Invalid Data**: Validates input using Zod schemas
- **Loading States**: Shows loading indicator while fetching data
- **Empty States**: Hides component when no active logos exist

## Best Practices

1. **Image Optimization**: Use optimized images (WebP format recommended)
2. **Consistent Sizing**: Maintain consistent logo dimensions
3. **Performance**: Limit the number of logos for optimal performance
4. **Accessibility**: Ensure logos have meaningful alt text
5. **Backup**: Keep backup configurations for quick recovery

## Troubleshooting

### Common Issues

1. **Logos not displaying**: Check if logos are marked as active
2. **Animation not working**: Verify CSS animations are loaded
3. **API errors**: Check MongoDB connection and collection permissions
4. **Performance issues**: Reduce number of logos or increase animation speed

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are accessible
3. Confirm database connection
4. Validate configuration data structure

## Future Enhancements

- Image upload functionality
- Advanced animation options
- Logo categories/tags
- A/B testing support
- Analytics integration
- Mobile-specific optimizations
