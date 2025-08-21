import { env } from './env'

// Application configuration based on environment
export const config = {
  // App metadata
  app: {
    name: env.NEXT_PUBLIC_APP_NAME,
    description: env.NEXT_PUBLIC_APP_DESCRIPTION,
    url: env.NEXT_PUBLIC_APP_URL,
    version: process.env.npm_package_version || '1.0.0',
  },

  // API configuration
  api: {
    openai: {
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_MODEL,
      embeddingModel: env.OPENAI_EMBEDDING_MODEL,
      maxTokens: env.OPENAI_MAX_TOKENS,
      temperature: env.OPENAI_TEMPERATURE,
    },
    supabase: {
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    },
    stripe: {
      publishableKey: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: env.STRIPE_SECRET_KEY,
      webhookSecret: env.STRIPE_WEBHOOK_SECRET,
      premiumPriceId: env.STRIPE_PRICE_ID_PREMIUM,
    },
    clerk: {
      publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: env.CLERK_SECRET_KEY,
      webhookSecret: env.CLERK_WEBHOOK_SECRET,
    },
  },

  // Document processing limits
  documents: {
    maxFileSize: env.MAX_FILE_SIZE,
    allowedTypes: env.ALLOWED_FILE_TYPES.split(',').map(type => type.trim()),
    autoDeleteHours: env.AUTO_DELETE_HOURS,
  },

  // Subscription limits
  limits: {
    freemium: {
      documentsPerMonth: env.FREEMIUM_DOCUMENTS_PER_MONTH,
      pagesPerDocument: env.FREEMIUM_PAGES_PER_DOCUMENT,
    },
    premium: {
      documentsPerMonth: env.PREMIUM_DOCUMENTS_PER_MONTH,
      pagesPerDocument: env.PREMIUM_PAGES_PER_DOCUMENT,
    },
  },

  // Security configuration
  security: {
    nextAuthSecret: env.NEXTAUTH_SECRET,
    encryptionKey: env.ENCRYPTION_KEY,
    jwtSecret: env.JWT_SECRET,
  },

  // External services
  services: {
    sentry: {
      dsn: env.NEXT_PUBLIC_SENTRY_DSN,
      authToken: env.SENTRY_AUTH_TOKEN,
    },
    posthog: {
      key: env.NEXT_PUBLIC_POSTHOG_KEY,
      host: env.NEXT_PUBLIC_POSTHOG_HOST,
    },
    smtp: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  },

  // Development settings
  dev: {
    debug: env.DEBUG_MODE,
    logApiRequests: env.LOG_API_REQUESTS,
    telemetryDisabled: env.NEXT_TELEMETRY_DISABLED,
  },
} as const

// Helper functions for common configuration tasks
export const getApiUrl = (path: string) => {
  const baseUrl = env.NEXT_PUBLIC_APP_URL
  return `${baseUrl}/api${path.startsWith('/') ? '' : '/'}${path}`
}

export const isFeatureEnabled = (feature: keyof typeof config.services) => {
  const service = config.services[feature]
  return Object.values(service).some(value => Boolean(value))
}

export const getUploadLimits = (isPremium: boolean) => {
  const limits = isPremium ? config.limits.premium : config.limits.freemium
  return {
    ...limits,
    maxFileSize: config.documents.maxFileSize,
    allowedTypes: config.documents.allowedTypes,
  }
}

// Validation helpers
export const validateFileUpload = (file: File, _isPremium: boolean) => {
  const errors: string[] = []
  
  // Check file size
  if (file.size > config.documents.maxFileSize) {
    const maxSizeMB = Math.round(config.documents.maxFileSize / 1024 / 1024)
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }
  
  // Check file type
  if (!config.documents.allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not supported`)
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Environment-specific exports
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'
