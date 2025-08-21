import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

/**
 * Authentication utilities for server-side route protection and user management
 */

/**
 * Requires authentication for server components.
 * Redirects to sign-in if user is not authenticated.
 * @param redirectTo - Optional URL to redirect to after sign-in
 * @returns The authenticated user ID
 */
export async function requireAuth(redirectTo?: string): Promise<string> {
  const { userId } = auth()
  
  if (!userId) {
    const signInUrl = redirectTo 
      ? `/sign-in?redirect_url=${encodeURIComponent(redirectTo)}`
      : '/sign-in'
    redirect(signInUrl)
  }
  
  return userId
}

/**
 * Gets the current authenticated user or null if not authenticated.
 * Safe to use in both protected and public routes.
 */
export async function getCurrentUser() {
  try {
    return await currentUser()
  } catch {
    return null
  }
}

/**
 * Checks if the current user is authenticated.
 * @returns True if user is authenticated, false otherwise
 */
export function isAuthenticated(): boolean {
  const { userId } = auth()
  return !!userId
}

/**
 * Gets the current user's ID if authenticated.
 * @returns User ID or null if not authenticated
 */
export function getCurrentUserId(): string | null {
  const { userId } = auth()
  return userId
}

/**
 * Redirects authenticated users away from auth pages.
 * Use this in sign-in/sign-up pages to prevent authenticated users from accessing them.
 * @param redirectTo - Where to redirect authenticated users (default: /dashboard)
 */
export function redirectIfAuthenticated(redirectTo: string = '/dashboard'): void {
  const { userId } = auth()
  
  if (userId) {
    redirect(redirectTo)
  }
}

/**
 * Route protection configuration
 */
export const ROUTE_CONFIG = {
  // Public routes that don't require authentication
  public: [
    '/',
    '/about',
    '/pricing',
    '/features',
    '/contact',
    '/privacy',
    '/terms',
    '/sign-in',
    '/sign-up',
    '/auth/login',
    '/auth/signup',
  ],
  
  // Protected routes that require authentication
  protected: [
    '/dashboard',
    '/document',
    '/profile',
    '/settings',
    '/billing',
  ],
  
  // API routes that require authentication
  protectedApi: [
    '/api/documents',
    '/api/ai',
    '/api/ocr',
    '/api/payments/create-subscription',
  ],
  
  // Public API routes
  publicApi: [
    '/api/webhooks/stripe',
    '/api/webhooks/clerk',
    '/api/health',
  ]
} as const

/**
 * Checks if a given path is a public route
 * @param path - The path to check
 * @returns True if the path is public, false if protected
 */
export function isPublicRoute(path: string): boolean {
  return ROUTE_CONFIG.public.some(route => 
    path === route || path.startsWith(route + '/')
  )
}

/**
 * Checks if a given path is a protected route
 * @param path - The path to check
 * @returns True if the path requires authentication
 */
export function isProtectedRoute(path: string): boolean {
  return ROUTE_CONFIG.protected.some(route => 
    path === route || path.startsWith(route + '/')
  )
}
