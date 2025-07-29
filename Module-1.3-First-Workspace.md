# Module 1.3: First Workspace

## Step-by-Step Guide to Creating Your First Package

### Prerequisites
- Completed Module 1.2: Initial Setup
- Have pnpm installed and workspace configured

### Step 1: Create Your First Package Structure
```bash
# Navigate to your monorepo root
cd my-typescript-monorepo

# Create a utility package directory
mkdir -p packages/utils/src

# Create package.json for the utils package
touch packages/utils/package.json
```

### Step 2: Configure Package.json for Utils Package
Create `packages/utils/package.json`:

```json
{
  "name": "@myorg/utils",
  "version": "1.0.0",
  "description": "Shared utility functions",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist",
    "test": "echo \"No tests yet\""
  },
  "keywords": ["utils", "typescript"],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

### Step 3: Create TypeScript Configuration for Package
Create `packages/utils/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

### Step 4: Create Root TypeScript Base Configuration
Create `tsconfig.base.json` at the root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "incremental": true,
    "composite": true
  }
}
```

### Step 5: Create Your First Utility Functions
Create `packages/utils/src/index.ts`:

```typescript
// String utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// Object utilities
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// Type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// Constants
export const VERSION = '1.0.0';

// Default export
export default {
  capitalize,
  kebabCase,
  chunk,
  unique,
  pick,
  isString,
  isNumber,
  VERSION
};
```

### Step 6: Create a Web Application Package
```bash
# Create web app directory
mkdir -p apps/web/src

# Create package.json for web app
touch apps/web/package.json
```

Create `apps/web/package.json`:

```json
{
  "name": "@myorg/web",
  "version": "1.0.0",
  "private": true,
  "description": "Web application",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@myorg/utils": "workspace:*"
  },
  "devDependencies": {
    "typescript": "workspace:*",
    "tsx": "^4.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### Step 7: Create Web App TypeScript Config
Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "CommonJS",
    "target": "ES2020",
    "declaration": false
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"],
  "references": [
    { "path": "../../packages/utils" }
  ]
}
```

### Step 8: Use Utils Package in Web App
Create `apps/web/src/index.ts`:

```typescript
import { capitalize, chunk, unique, kebabCase } from '@myorg/utils';

// Example usage of utility functions
const names = ['john doe', 'jane smith', 'bob johnson', 'alice brown'];
const duplicateNumbers = [1, 2, 2, 3, 4, 4, 5];

console.log('=== Web App Demo ===');

// Capitalize names
console.log('\nCapitalized names:');
names.forEach(name => {
  console.log(`${name} -> ${capitalize(name)}`);
});

// Convert to kebab case
console.log('\nKebab case names:');
names.forEach(name => {
  console.log(`${name} -> ${kebabCase(name)}`);
});

// Chunk array
console.log('\nChunked names (size 2):');
const chunkedNames = chunk(names, 2);
chunkedNames.forEach((chunk, index) => {
  console.log(`Chunk ${index + 1}:`, chunk);
});

// Remove duplicates
console.log('\nUnique numbers:');
console.log('Original:', duplicateNumbers);
console.log('Unique:', unique(duplicateNumbers));

console.log('\n=== Demo Complete ===');
```

### Step 9: Install Dependencies Using Workspace Protocol
```bash
# Install all dependencies (run from root)
pnpm install

# Install tsx for the web app specifically
pnpm add -D tsx @types/node --filter @myorg/web
```

### Step 10: Build Your Packages
```bash
# Build utils package first
pnpm --filter @myorg/utils build

# Build web app
pnpm --filter @myorg/web build

# Or build all packages
pnpm -r build
```

### Step 11: Run Your Application
```bash
# Run in development mode
pnpm --filter @myorg/web dev

# Or run the built version
pnpm --filter @myorg/web start
```

## Understanding Workspace Protocol

### Workspace Protocol Variants
- `workspace:*` - Use exact version from workspace
- `workspace:^` - Use compatible version (allows minor updates)
- `workspace:~` - Use patch-compatible version

### Example in package.json:
```json
{
  "dependencies": {
    "@myorg/utils": "workspace:*",
    "@myorg/types": "workspace:^1.0.0",
    "@myorg/config": "workspace:~1.0.0"
  }
}
```

## Running Scripts Across Workspaces

### Basic Commands
```bash
# Run script in specific package
pnpm --filter @myorg/utils build

# Run script in all packages
pnpm -r build

# Run script recursively with dependencies first
pnpm -r --sort build

# Run in parallel (faster but less safe)
pnpm -r --parallel dev
```

### Filtering Examples
```bash
# Run in packages matching pattern
pnpm --filter "*utils*" build

# Run in package and its dependencies
pnpm --filter @myorg/web... build

# Run in package and its dependents
pnpm --filter ...@myorg/utils build

# Exclude specific packages
pnpm --filter !@myorg/web -r test
```

## Package.json Essentials for Workspaces

### Required Fields
- `name` - Unique package name (use org scope: `@myorg/package-name`)
- `version` - Semantic version
- `main` - Entry point for CommonJS
- `types` - TypeScript declaration files

### Important Fields
- `exports` - Modern module exports (supports ESM/CJS)
- `files` - Which files to include when published
- `private` - Set to `true` for apps, `false` for publishable packages
- `scripts` - Package-specific build/dev commands

### Example Complete package.json:
```json
{
  "name": "@myorg/my-package",
  "version": "1.0.0",
  "description": "Description of the package",
  "private": false,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "clean": "rm -rf dist",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "keywords": ["typescript", "utility"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "@myorg/other-package": "workspace:*"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

## Verification Steps

### Check Workspace Recognition
```bash
# List all workspace packages
pnpm ls -r

# Show workspace tree
pnpm ls -r --depth=0

# Check specific package dependencies
pnpm ls --filter @myorg/web
```

### Test Package Linking
```bash
# Verify utils package was built
ls packages/utils/dist/

# Run web app to test import
pnpm --filter @myorg/web dev
```

## Common Issues and Solutions

### Issue: Module not found
**Solution**: Ensure utils package is built before web app
```bash
pnpm --filter @myorg/utils build
```

### Issue: TypeScript errors with workspace packages
**Solution**: Add proper TypeScript references in tsconfig.json

### Issue: Package not recognized in workspace
**Solution**: Check pnpm-workspace.yaml includes the package directory

## Next Steps
After completing this module, you'll have:
- A working utils package with TypeScript
- A web app consuming the utils package
- Understanding of workspace protocols
- Experience with pnpm filtering

Ready for Module 2.1: TypeScript Setup with project references and advanced configuration.