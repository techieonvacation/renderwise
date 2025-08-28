import { ObjectId } from "mongodb";

/**
 * Serialize MongoDB objects to plain objects for Next.js 15 client components
 * This converts ObjectIds to strings and handles dates properly
 */
export function serializeForClient<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof ObjectId) {
    return obj.toString() as T;
  }

  if (obj instanceof Date) {
    return obj.toISOString() as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeForClient(item)) as T;
  }

  if (typeof obj === "object" && obj !== null) {
    // Handle case where obj might have a toJSON method (like MongoDB objects)
    if ("toJSON" in obj && typeof (obj as any).toJSON === "function") {
      try {
        const jsonString = JSON.stringify(obj);
        return JSON.parse(jsonString) as T;
      } catch {
        // Fallback to manual serialization if JSON.stringify fails
      }
    }

    const serialized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeForClient(value);
    }
    return serialized as T;
  }

  return obj;
}

/**
 * Serialize an array of objects for client components
 */
export function serializeArrayForClient<T>(arr: T[]): T[] {
  return arr.map((item) => serializeForClient(item));
}
