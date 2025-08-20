# Environment Setup Guide

This guide explains how to set up environment variables for Fineprint.ai across different deployment environments.

## Quick Start

1. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

2. Fill in your actual values in `.env.local`

3. Never commit `.env.local` to version control

## Environment Files

### Development (`.env.local`)
Used for local development. Copy from `env.example` and customize.

### Production
Set environment variables directly in your hosting platform:
- Vercel: Dashboard → Project → Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Railway: Dashboard → Variables

## Required Environment Variables

### Core Services
These are required for the application to function:

- `OPENAI_API_KEY` - Your OpenAI API key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `NEXTAUTH_SECRET` - 32+ character random string
- `ENCRYPTION_KEY` - 32+ character encryption key
- `JWT_SECRET` - JWT signing secret

### Optional Services
These enhance functionality but aren't strictly required:

- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `NEXT_PUBLIC_POSTHOG_KEY` - Analytics
- `SMTP_*` - Email notifications
- `STRIPE_WEBHOOK_SECRET` - Stripe webhooks
- `CLERK_WEBHOOK_SECRET` - Clerk webhooks

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEBUG_MODE=true
LOG_API_REQUESTS=true
OPENAI_TEMPERATURE=0.2
FREEMIUM_DOCUMENTS_PER_MONTH=10
```

### Production
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
DEBUG_MODE=false
LOG_API_REQUESTS=false
OPENAI_TEMPERATURE=0.1
FREEMIUM_DOCUMENTS_PER_MONTH=5
```

### Testing
```env
NODE_ENV=test
NEXT_PUBLIC_APP_URL=http://localhost:3000
DEBUG_MODE=true
LOG_API_REQUESTS=false
```

## Security Best Practices

### API Keys
- Use test keys for development (prefix: `sk_test_`, `pk_test_`)
- Use live keys only in production (prefix: `sk_live_`, `pk_live_`)
- Rotate keys regularly
- Never expose secret keys in client-side code

### Secrets Generation
Generate secure secrets using:
```bash
# 32-character random string
openssl rand -base64 32

# UUID v4
node -e "console.log(require('crypto').randomUUID())"
```

### Environment Isolation
- Development: Use test/sandbox APIs
- Staging: Use test APIs with production-like data
- Production: Use live APIs only

## Service Setup Guides

### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create new API key
3. Add to `OPENAI_API_KEY`

### Supabase
1. Create project at [Supabase](https://supabase.com/dashboard)
2. Go to Settings → API
3. Copy URL and anon key
4. Copy service role key from service_role section

### Clerk
1. Create application at [Clerk Dashboard](https://dashboard.clerk.com)
2. Go to API Keys
3. Copy publishable and secret keys

### Stripe
1. Create account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers → API Keys
3. Copy publishable and secret keys
4. Set up webhooks for subscription events

## Troubleshooting

### Common Issues

**Environment validation failed**
- Check that all required variables are set
- Verify variable names match exactly
- Ensure URLs are valid and include protocol

**API connection errors**
- Verify API keys are correct and active
- Check API key permissions and quotas
- Ensure network connectivity

**Type validation errors**
- Check numeric values are valid numbers
- Verify boolean values are 'true' or 'false'
- Ensure URLs include protocol (http/https)

### Debug Commands
```bash
# Check environment loading
npm run type-check

# Validate environment in development
node -e "require('./src/lib/env.ts')"
```

## Environment Variables Reference

See `env.example` for the complete list of available environment variables with descriptions and example values.
