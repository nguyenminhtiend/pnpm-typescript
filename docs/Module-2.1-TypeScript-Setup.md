# Module 2.1: TypeScript Setup - Deep Dive

## 2.1.1 Root tsconfig.json vs Package tsconfig.json

### Root Configuration Strategy

```json
// tsconfig.base.json (shared configuration)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["./packages/shared/src/*"],
      "@utils/*": ["./packages/utils/src/*"],
      "@types/*": ["./packages/types/src/*"]
    }
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

### Package-Level Configuration

```json
// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "references": [{ "path": "../shared" }, { "path": "../types" }]
}
```

### Key Principles:

- Base configuration provides common settings
- Package configs extend base and add specific needs
- Each package controls its own build output
- References enable TypeScript project graph

## 2.1.2 Understanding Project References

### What Project References Solve:

- Enable TypeScript to understand package dependencies
- Allow incremental builds across the monorepo
- Provide better IDE experience with go-to-definition
- Enable parallel compilation of independent packages

### Setting Up References:

```json
// Root tsconfig.json (solution file)
{
  "files": [],
  "references": [
    { "path": "./packages/types" },
    { "path": "./packages/utils" },
    { "path": "./packages/shared" },
    { "path": "./packages/api" },
    { "path": "./apps/web" }
  ]
}
```

### Reference Chain Example:

```
types (no deps) → utils (depends on types) → shared (depends on utils, types) → api (depends on all)
```

### Best Practices:

- Order references by dependency chain
- Use `"prepend": true` for utility packages
- Keep references minimal to avoid circular deps
- Use `tsc --build` for reference-aware compilation

## 2.1.3 Composite Projects and Incremental Builds

### Enabling Composite Mode:

```json
{
  "compilerOptions": {
    "composite": true, // Enables project references
    "incremental": true, // Saves build info for faster rebuilds
    "tsBuildInfoFile": "./dist/.tsbuildinfo",
    "declaration": true, // Required for composite
    "declarationMap": true // Helpful for debugging
  }
}
```

### Build Performance Benefits:

- Only rebuilds changed packages and dependents
- Parallel builds for independent packages
- Faster subsequent builds with .tsbuildinfo
- Skips type checking for unchanged code

### Build Commands:

```bash
# Build all projects respecting references
tsc --build

# Build specific package and dependencies
tsc --build packages/api

# Clean and rebuild
tsc --build --clean
tsc --build --force

# Watch mode for development
tsc --build --watch
```

### Managing Build Info:

```json
// In each package tsconfig.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
```

## 2.1.4 Path Mappings and Module Resolution

### Centralized Path Mapping:

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Package aliases
      "@pnpm-monorepo/types": ["./packages/types/src/index.ts"],
      "@pnpm-monorepo/types/*": ["./packages/types/src/*"],
      "@pnpm-monorepo/utils": ["./packages/utils/src/index.ts"],
      "@pnpm-monorepo/utils/*": ["./packages/utils/src/*"],
      "@pnpm-monorepo/shared": ["./packages/shared/src/index.ts"],
      "@pnpm-monorepo/shared/*": ["./packages/shared/src/*"],

      // Internal path shortcuts
      "~/*": ["./src/*"],
      "#types": ["./src/types/index.ts"],
      "#config": ["./src/config/index.ts"]
    }
  }
}
```

### Module Resolution Strategy:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16" for Node.js
    "allowImportingTsExtensions": true,
    "noEmit": true, // When using bundler
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Runtime Path Resolution:

For Node.js runtime, use tools like `tsconfig-paths`:

```json
// package.json
{
  "scripts": {
    "dev": "node -r tsconfig-paths/register -r ts-node/register src/index.ts"
  }
}
```

## 2.1.5 Common Compiler Options for Monorepos

### Strict Type Checking:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Module and Import Settings:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2022",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true
  }
}
```

### Declaration and Source Maps:

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": false,
    "removeComments": false
  }
}
```

### Performance Optimizations:

```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "incremental": true,
    "assumeChangesOnlyAffectDirectDependencies": true
  }
}
```

## 2.1.6 Advanced Configuration Patterns

### Environment-Specific Configs:

```json
// tsconfig.build.json (production builds)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "declarationMap": false
  },
  "exclude": ["**/*.test.ts", "**/*.spec.ts", "src/test-utils"]
}
```

### Package Export Configuration:

```json
// packages/utils/package.json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./async": {
      "types": "./dist/async.d.ts",
      "import": "./dist/async.js"
    }
  }
}
```

### Workspace Protocol Integration:

```json
// Consumer package.json
{
  "dependencies": {
    "@pnpm-monorepo/utils": "workspace:*",
    "@pnpm-monorepo/types": "workspace:^"
  }
}
```

## 2.1.7 Common Issues and Solutions

### Circular Dependencies:

```bash
# Detect circular references
npx madge --circular --extensions ts ./packages

# Solution: Extract shared types to separate package
```

### Build Order Issues:

```json
// Use explicit references to control build order
{
  "references": [
    { "path": "../types" }, // Build first
    { "path": "../utils" }, // Then utils
    { "path": "../shared" } // Finally shared
  ]
}
```

### Path Resolution Problems:

```typescript
// Use consistent import patterns
import { type User } from '@pnpm-monorepo/types';
import { logger } from '@pnpm-monorepo/utils';

// Avoid relative imports across packages
// ❌ import { helper } from '../../../utils/src/helper'
// ✅ import { helper } from '@pnpm-monorepo/utils'
```

## 2.1.8 Development Workflow Integration

### VS Code Multi-root Workspace:

```json
// .vscode/workspace.json
{
  "folders": [
    { "path": "." },
    { "path": "./packages/types" },
    { "path": "./packages/utils" },
    { "path": "./apps/web" }
  ],
  "settings": {
    "typescript.preferences.useAliasesForRenames": false,
    "typescript.preferences.includePackageJsonAutoImports": "on"
  }
}
```

### Build Scripts Integration:

```json
// Root package.json
{
  "scripts": {
    "build": "tsc --build",
    "build:clean": "tsc --build --clean",
    "build:watch": "tsc --build --watch",
    "type-check": "tsc --build --dry"
  }
}
```

## Key Takeaways

This deep dive covers the essential TypeScript configuration concepts needed for effective monorepo development with pnpm:

1. **Hierarchical Configuration**: Use base configs for shared settings and package-specific configs for customization
2. **Project References**: Enable TypeScript's understanding of package relationships for better builds and IDE experience
3. **Composite Mode**: Leverage incremental builds for faster development cycles
4. **Path Mappings**: Centralize module resolution for consistent imports across packages
5. **Compiler Options**: Apply strict typing and performance optimizations appropriate for monorepos
6. **Advanced Patterns**: Use environment-specific configs and proper package exports
7. **Troubleshooting**: Know how to identify and resolve common TypeScript monorepo issues
8. **IDE Integration**: Configure development tools for optimal monorepo workflow

These patterns form the foundation for a robust TypeScript monorepo setup that scales with your project's complexity.
