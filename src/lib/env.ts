import { z } from 'zod'

// Environment validation schema
const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default('Fineprint.ai'),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().default('AI-Powered Legal Document Simplification'),

  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  OPENAI_MODEL: z.string().default('gpt-4-turbo-preview'),
  OPENAI_EMBEDDING_MODEL: z.string().default('text-embedding-3-large'),
  OPENAI_MAX_TOKENS: z.coerce.number().default(4000),
  OPENAI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.1),

  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_DB_PASSWORD: z.string().optional(),

  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_WEBHOOK_SECRET: z.string().optional(),

  // Stripe Payments
  STRIPE_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID_PREMIUM: z.string().optional(),

  // Document Processing
  MAX_FILE_SIZE: z.coerce.number().default(10485760), // 10MB
  ALLOWED_FILE_TYPES: z.string().default('application/pdf,text/plain'),
  AUTO_DELETE_HOURS: z.coerce.number().default(72),

  // Rate Limiting
  FREEMIUM_DOCUMENTS_PER_MONTH: z.coerce.number().default(5),
  FREEMIUM_PAGES_PER_DOCUMENT: z.coerce.number().default(20),
  PREMIUM_DOCUMENTS_PER_MONTH: z.union([z.coerce.number(), z.literal('unlimited')]).default('unlimited'),
  PREMIUM_PAGES_PER_DOCUMENT: z.union([z.coerce.number(), z.literal('unlimited')]).default('unlimited'),

  // Security
  NEXTAUTH_SECRET: z.string().min(32, 'NextAuth secret must be at least 32 characters'),
  ENCRYPTION_KEY: z.string().min(32, 'Encryption key must be at least 32 characters'),
  JWT_SECRET: z.string().min(1),

  // External Services (Optional)
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASS: z.string().optional(),

  // Development Tools
  DEBUG_MODE: z.coerce.boolean().default(false),
  LOG_API_REQUESTS: z.coerce.boolean().default(false),
  NEXT_TELEMETRY_DISABLED: z.coerce.boolean().default(true),
})

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>

// Validate and export environment variables
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      )
      throw new Error(
        `Environment validation failed:\n${errorMessages.join('\n')}`
      )
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Helper functions for environment-specific logic
export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'

// Rate limiting helpers
export const getRateLimit = (isPremium: boolean) => ({
  documentsPerMonth: isPremium 
    ? env.PREMIUM_DOCUMENTS_PER_MONTH 
    : env.FREEMIUM_DOCUMENTS_PER_MONTH,
  pagesPerDocument: isPremium 
    ? env.PREMIUM_PAGES_PER_DOCUMENT 
    : env.FREEMIUM_PAGES_PER_DOCUMENT,
})

// File processing helpers
export const getAllowedFileTypes = () => 
  env.ALLOWED_FILE_TYPES.split(',').map(type => type.trim())

export const isFileTypeAllowed = (mimeType: string) => 
  getAllowedFileTypes().includes(mimeType)

export const isFileSizeAllowed = (size: number) => 
  size <= env.MAX_FILE_SIZE
