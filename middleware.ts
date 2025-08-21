import { authMiddleware } from "@clerk/nextjs";

// Authentication middleware configuration for Fineprint.ai
// Protects routes that require user authentication while allowing public access to landing pages and auth flows
export default authMiddleware({
  // Routes that should be publicly accessible (no authentication required)
  publicRoutes: [
    // Landing and marketing pages
    "/",
    "/about",
    "/pricing", 
    "/features",
    "/contact",
    "/privacy",
    "/terms",
    
    // Authentication pages (Clerk handles these)
    "/sign-in",
    "/sign-up",
    "/auth/login",
    "/auth/signup",
    
    // API webhooks and public endpoints
    "/api/webhooks/stripe",
    "/api/webhooks/clerk",
    "/api/health",
    
    // Static assets and metadata
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml"
  ],
  
  // Note: Routes not listed in publicRoutes will be protected by default
  
  // Redirect unauthenticated users to sign-in page
  afterAuth(auth, req) {
    // If user is not authenticated and trying to access a protected route
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
    
    // If user is authenticated and trying to access auth pages, redirect to dashboard
    if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
    
    // Allow the request to continue
    return undefined;
  }
});

export const config = {
  // Apply middleware to all routes except static files and Next.js internals
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for root
    '/'
  ],
};
