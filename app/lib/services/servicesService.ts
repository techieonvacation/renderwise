import { ServicesConfig, DEFAULT_SERVICES_CONFIG } from "@/app/lib/models/services";

/**
 * Service layer for fetching services data
 * Provides caching and error handling for better performance
 */

// Cache for services data
let servicesCache: ServicesConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 2000; // 2 seconds cache

/**
 * Fetches services configuration from the API
 * Uses caching to improve performance and reduce API calls
 */
export async function getServicesData(): Promise<ServicesConfig> {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (servicesCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return servicesCache;
    }

    // Fetch fresh data from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Use cache for 2 seconds as specified
      next: { revalidate: 2 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services data: ${response.status}`);
    }

    const data = await response.json();
    
    // Update cache
    servicesCache = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error('Error fetching services data:', error);
    
    // Return default data if API fails
    return DEFAULT_SERVICES_CONFIG;
  }
}

/**
 * Clears the services cache
 * Useful when data is updated and we want fresh data
 */
export function clearServicesCache(): void {
  servicesCache = null;
  cacheTimestamp = 0;
}

/**
 * Gets services data for server-side rendering
 * This function can be used in getServerSideProps or similar
 */
export async function getServicesDataSSR(): Promise<ServicesConfig> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Always fetch fresh data for SSR
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching services data for SSR:', error);
    return DEFAULT_SERVICES_CONFIG;
  }
}

/**
 * Updates services configuration
 * Clears cache after successful update
 */
export async function updateServicesData(data: ServicesConfig): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/services`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update services data: ${response.status}`);
    }

    // Clear cache after successful update
    clearServicesCache();
    
    return true;
  } catch (error) {
    console.error('Error updating services data:', error);
    return false;
  }
}

/**
 * Resets services configuration to default
 * Clears cache after successful reset
 */
export async function resetServicesData(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/services`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to reset services data: ${response.status}`);
    }

    // Clear cache after successful reset
    clearServicesCache();
    
    return true;
  } catch (error) {
    console.error('Error resetting services data:', error);
    return false;
  }
} 