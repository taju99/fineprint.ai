import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { ComponentType } from 'react'

/**
 * Higher-order component for protecting page components with authentication
 * Usage: export default withAuth(YourPageComponent)
 */
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  redirectTo?: string
) {
  const AuthenticatedComponent = (props: P) => {
    const { userId } = auth()
    
    if (!userId) {
      const signInUrl = redirectTo 
        ? `/sign-in?redirect_url=${encodeURIComponent(redirectTo)}`
        : '/sign-in'
      redirect(signInUrl)
    }

    return <WrappedComponent {...props} />
  }

  // Set display name for debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return AuthenticatedComponent
}

/**
 * Higher-order component that redirects authenticated users away from auth pages
 * Use this for sign-in/sign-up pages
 */
export function withPublicAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  redirectTo: string = '/dashboard'
) {
  const PublicAuthComponent = (props: P) => {
    const { userId } = auth()
    
    if (userId) {
      redirect(redirectTo)
    }

    return <WrappedComponent {...props} />
  }

  PublicAuthComponent.displayName = `withPublicAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return PublicAuthComponent
}
