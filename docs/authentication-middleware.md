# Authentication Middleware Documentation

## Overview

The authentication middleware in Fineprint.ai provides comprehensive route protection using Clerk authentication. It automatically handles user authentication, route protection, and redirects.

## Configuration

### Middleware Setup (`middleware.ts`)

The middleware is configured to:

1. **Protect routes by default** - All routes require authentication unless explicitly marked as public
2. **Allow public access** to landing pages, auth flows, and API webhooks
3. **Redirect unauthenticated users** to sign-in with return URL
4. **Redirect authenticated users** away from auth pages to dashboard

### Public Routes

These routes are accessible without authentication:

**Landing & Marketing Pages:**
- `/` - Homepage
- `/about` - About page
- `/pricing` - Pricing page
- `/features` - Features page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

**Authentication Pages:**
- `/sign-in` - Clerk sign-in page
- `/sign-up` - Clerk sign-up page
- `/auth/login` - Custom login page (if used)
- `/auth/signup` - Custom signup page (if used)

**API Endpoints:**
- `/api/webhooks/stripe` - Stripe webhooks
- `/api/webhooks/clerk` - Clerk webhooks
- `/api/health` - Health check endpoint

**Static Assets:**
- `/favicon.ico`
- `/robots.txt`
- `/sitemap.xml`

### Protected Routes

All other routes are protected and require authentication:

**User Dashboard & Features:**
- `/dashboard` - Main user dashboard
- `/document/*` - Document analysis pages
- `/profile` - User profile management
- `/settings` - User settings
- `/billing` - Billing and subscription management

**Protected API Endpoints:**
- `/api/documents/*` - Document management APIs
- `/api/ai/*` - AI processing APIs
- `/api/ocr/*` - OCR processing APIs
- `/api/payments/create-subscription` - Subscription creation

## Authentication Utilities

### Server-Side Utilities (`src/lib/utils/auth.ts`)

#### `requireAuth(redirectTo?: string)`
Requires authentication for server components. Redirects to sign-in if not authenticated.

```typescript
// In a server component
export default async function ProtectedPage() {
  const userId = await requireAuth();
  // Component logic for authenticated users
}
```

#### `getCurrentUser()`
Gets the current authenticated user safely.

```typescript
const user = await getCurrentUser();
if (user) {
  // User is authenticated
}
```

#### `isAuthenticated()`
Checks if the current user is authenticated.

```typescript
if (isAuthenticated()) {
  // User is authenticated
}
```

#### `redirectIfAuthenticated(redirectTo = '/dashboard')`
Redirects authenticated users away from auth pages.

```typescript
// In sign-in/sign-up pages
export default function SignInPage() {
  redirectIfAuthenticated();
  // Sign-in form
}
```

### Client-Side HOCs (`src/lib/utils/withAuth.tsx`)

#### `withAuth(Component, redirectTo?)`
Higher-order component for protecting page components.

```typescript
import { withAuth } from '@/lib/utils/withAuth';

function ProtectedPage() {
  return <div>Protected content</div>;
}

export default withAuth(ProtectedPage);
```

#### `withPublicAuth(Component, redirectTo?)`
HOC that redirects authenticated users away from auth pages.

```typescript
import { withPublicAuth } from '@/lib/utils/withAuth';

function SignInPage() {
  return <div>Sign in form</div>;
}

export default withPublicAuth(SignInPage);
```

## Route Protection Patterns

### 1. Automatic Protection (Recommended)
The middleware automatically protects all routes not listed in `publicRoutes`.

### 2. Manual Server Component Protection
Use `requireAuth()` in server components for explicit protection:

```typescript
import { requireAuth } from '@/lib/utils/auth';

export default async function DashboardPage() {
  const userId = await requireAuth();
  
  return (
    <div>
      <h1>Dashboard for user: {userId}</h1>
    </div>
  );
}
```

### 3. HOC Protection for Client Components
Use `withAuth()` HOC for client component protection:

```typescript
'use client';

import { withAuth } from '@/lib/utils/withAuth';

function InteractiveComponent() {
  return <div>Interactive content</div>;
}

export default withAuth(InteractiveComponent);
```

### 4. API Route Protection
API routes are automatically protected by middleware. For additional validation:

```typescript
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId } = auth();
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // API logic
}
```

## Redirect Flows

### Unauthenticated User Flow
1. User tries to access protected route (e.g., `/dashboard`)
2. Middleware detects no authentication
3. User is redirected to `/sign-in?redirect_url=/dashboard`
4. After sign-in, user is redirected back to `/dashboard`

### Authenticated User Flow
1. Authenticated user tries to access auth page (e.g., `/sign-in`)
2. Middleware detects authentication
3. User is redirected to `/dashboard`

## Security Considerations

1. **Server-Side Protection**: All route protection happens server-side
2. **No Client-Side Bypass**: Authentication cannot be bypassed on the client
3. **Secure Redirects**: Return URLs are validated to prevent open redirects
4. **API Protection**: API routes are protected by the same middleware
5. **Static Asset Exclusion**: Static files bypass authentication for performance

## Testing

To test the authentication middleware:

1. **Test Public Routes**: Access public routes without authentication
2. **Test Protected Routes**: Verify redirects to sign-in for protected routes
3. **Test Auth Flow**: Complete sign-in and verify redirect back to original route
4. **Test Authenticated Redirects**: Access auth pages while authenticated
5. **Test API Protection**: Verify API routes require authentication

## Configuration Updates

To modify route protection:

1. **Add Public Routes**: Add to `publicRoutes` array in `middleware.ts`
2. **Custom Redirects**: Modify `afterAuth` function in `middleware.ts`
3. **Matcher Updates**: Update `config.matcher` for new route patterns

## Troubleshooting

**Common Issues:**

1. **Route not protected**: Add route to protected patterns or remove from public routes
2. **Redirect loops**: Check that auth pages are in public routes
3. **Static assets blocked**: Ensure proper matcher configuration excludes assets
4. **API routes failing**: Verify API routes are covered by matcher patterns
