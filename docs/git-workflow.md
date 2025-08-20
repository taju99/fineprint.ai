# Git Workflow Guide

This guide outlines the Git workflow and best practices for the Fineprint.ai project.

## Repository Setup

The repository is configured with:
- ✅ Comprehensive `.gitignore` for Next.js, AI/ML, and deployment files
- ✅ `.gitattributes` for consistent line endings and binary file handling
- ✅ Pre-commit hooks for code quality checks
- ✅ Commit message validation for conventional commits

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples
```bash
feat: add document upload functionality
fix: resolve PDF parsing error with special characters
docs: update environment setup guide
style: format code with prettier
refactor: extract OpenAI utility functions
test: add unit tests for authentication service
chore: update dependencies to latest versions
```

## Pre-commit Checks

Before each commit, the following checks run automatically:

1. **Environment Check**: Ensures `.env.local` or `.env` exists
2. **TypeScript**: Type checking with `tsc --noEmit`
3. **ESLint**: Code quality and style checks
4. **Prettier**: Code formatting validation
5. **File Size**: Prevents commits of files >5MB
6. **Code Quality**: Warns about TODO/FIXME and console.log statements

## Branching Strategy

### Main Branches
- `main`: Production-ready code
- `develop`: Integration branch for features

### Feature Branches
- `feature/task-1-1-project-setup`: Feature development
- `feature/auth-integration`: New features
- `bugfix/pdf-parsing-issue`: Bug fixes
- `hotfix/security-patch`: Critical production fixes

### Branch Naming Convention
```
<type>/<brief-description>
<type>/<ticket-number>-<brief-description>
```

Examples:
- `feature/document-upload`
- `feature/task-2-1-clerk-integration`
- `bugfix/stripe-webhook-timeout`
- `hotfix/env-validation-error`

## Workflow Steps

### 1. Start New Feature
```bash
# Switch to develop and pull latest
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/document-upload

# Set upstream
git push -u origin feature/document-upload
```

### 2. Development Process
```bash
# Make changes
# ...

# Stage changes
git add .

# Commit (will trigger pre-commit hooks)
git commit -m "feat: add drag-and-drop document upload"

# Push to remote
git push
```

### 3. Code Review & Merge
```bash
# Create pull request on GitHub
# After approval, merge to develop
git checkout develop
git pull origin develop

# Delete feature branch
git branch -d feature/document-upload
git push origin --delete feature/document-upload
```

## Useful Git Commands

### Daily Commands
```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard changes to file
git checkout -- filename.ts
```

### Branch Management
```bash
# List all branches
git branch -a

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Rename current branch
git branch -m new-branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name
```

### Synchronization
```bash
# Pull latest changes
git pull

# Pull with rebase
git pull --rebase

# Fetch all branches
git fetch --all

# Reset to match remote
git reset --hard origin/main
```

### Stashing
```bash
# Save work in progress
git stash

# Save with message
git stash save "work in progress on auth"

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

## Release Process

### Version Tagging
```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin --tags

# List tags
git tag -l
```

### Release Branches
```bash
# Create release branch from develop
git checkout develop
git checkout -b release/v1.0.0

# Finalize release (version bumps, changelog)
# ...

# Merge to main
git checkout main
git merge release/v1.0.0

# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"

# Merge back to develop
git checkout develop
git merge release/v1.0.0

# Push everything
git push origin main develop --tags

# Delete release branch
git branch -d release/v1.0.0
```

## Hook Management

### Disable Hooks Temporarily
```bash
# Skip pre-commit hooks
git commit --no-verify -m "emergency fix"

# Skip all hooks
git commit --no-hooks -m "quick fix"
```

### Update Hooks
Hooks are stored in `.git/hooks/` and are automatically active. To update:
1. Modify the hook files in the repository
2. Copy to `.git/hooks/`
3. Ensure they're executable (Unix/Mac: `chmod +x`)

## Troubleshooting

### Common Issues

**Pre-commit hook fails**
```bash
# Fix the issue and try again
npm run lint:fix
npm run format
git add .
git commit -m "fix: resolve linting issues"
```

**Merge conflicts**
```bash
# Pull latest changes
git pull

# Fix conflicts in files
# Edit conflicted files, remove conflict markers

# Mark as resolved
git add .
git commit
```

**Accidentally committed to wrong branch**
```bash
# Reset last commit
git reset --soft HEAD~1

# Switch to correct branch
git checkout correct-branch

# Commit changes
git add .
git commit -m "correct commit message"
```

**Need to change last commit message**
```bash
# Amend last commit
git commit --amend -m "new commit message"

# If already pushed (use with caution)
git push --force-with-lease
```

## Best Practices

### Commit Guidelines
- ✅ Make small, focused commits
- ✅ Write clear, descriptive commit messages
- ✅ Test changes before committing
- ✅ Use conventional commit format
- ❌ Don't commit sensitive data (API keys, passwords)
- ❌ Don't commit large files without Git LFS
- ❌ Don't commit temporary or generated files

### Branch Guidelines
- ✅ Use descriptive branch names
- ✅ Keep feature branches small and short-lived
- ✅ Delete merged branches
- ✅ Rebase feature branches on develop regularly
- ❌ Don't work directly on main or develop
- ❌ Don't merge without code review

### Security
- ✅ Review all changes before committing
- ✅ Use `.gitignore` for sensitive files
- ✅ Check for exposed secrets before pushing
- ✅ Use environment variables for configuration
- ❌ Never commit API keys or passwords
- ❌ Don't ignore security warnings in dependencies
