# Module 1.2: Initial Setup

## Step-by-Step Setup Guide

### Step 1: Install pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version
```

### Step 2: Create Project Directory
```bash
# Create your monorepo directory
mkdir my-typescript-monorepo
cd my-typescript-monorepo

# Initialize git repository (optional but recommended)
git init
```

### Step 3: Create pnpm-workspace.yaml
Create the workspace configuration file at the root:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

This tells pnpm where to find your workspace packages.

### Step 4: Understand .pnpm Directory Structure
After installing packages, pnpm creates:
- `.pnpm/` - Stores actual package files with hard links
- `node_modules/` - Contains symlinks to `.pnpm` directory
- This structure saves disk space and ensures consistent versions

### Step 5: Create .npmrc Configuration
Create `.npmrc` in your project root:

```ini
# .npmrc
# Use shamefully-hoist for better compatibility (optional)
shamefully-hoist=false

# Enable strict peer dependencies
strict-peer-dependencies=true

# Auto install peer dependencies
auto-install-peers=true

# Use workspace protocol for local packages
prefer-workspace-packages=true
```

### Step 6: Set Up .gitignore
Create `.gitignore` for monorepo-specific patterns:

```gitignore
# Dependencies
node_modules/
.pnpm-store/
.pnpm-debug.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Step 7: Initialize Package.json
Create root `package.json`:

```json
{
  "name": "my-typescript-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "TypeScript monorepo with pnpm workspaces",
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -r dev",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean"
  },
  "keywords": ["monorepo", "typescript", "pnpm"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### Step 8: Create Directory Structure
```bash
# Create workspace directories
mkdir packages apps

# Create example package directory
mkdir packages/utils

# Create example app directory  
mkdir apps/web
```

Your project structure should now look like:
```
my-typescript-monorepo/
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   └── web/
└── packages/
    └── utils/
```

### Step 9: Verify Setup
```bash
# Install dependencies
pnpm install

# Check workspace configuration
pnpm list --depth=0

# Verify pnpm recognizes your workspace
pnpm ls -r
```

## Key Concepts Explained

### pnpm File Structure
- **Hard links**: Actual files stored once in `.pnpm/`
- **Symlinks**: `node_modules/` points to hard links
- **Benefits**: Faster installs, less disk space, no phantom dependencies

### Workspace Protocol
- `workspace:*` - Use exact version from workspace
- `workspace:^` - Use compatible version from workspace  
- `workspace:~` - Use patch-level compatible version

### .npmrc Options
- `shamefully-hoist=false` - Prevents hoisting for stricter dependency management
- `strict-peer-dependencies=true` - Fails on missing peer deps
- `auto-install-peers=true` - Automatically installs peer dependencies

## Next Steps
After completing this setup, you'll be ready for Module 1.3: Creating your first workspace package.

## Troubleshooting
- If `pnpm` command not found: Restart terminal or check PATH
- Permission errors: Use `sudo` for global installation or configure npm prefix
- Workspace not recognized: Check `pnpm-workspace.yaml` syntax and file location