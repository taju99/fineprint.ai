'use client'

import { ClerkProvider } from '@clerk/nextjs'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    console.warn('Clerk publishable key is missing. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env.local file.')
    return <>{children}</>
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  )
}
