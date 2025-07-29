# TypeScript + PNPM Monorepo Tutorial: Core Concepts & Features

## Phase 1: Foundations (Week 1)

### Module 1.1: Understanding the Basics

- What is a monorepo and why use it
- pnpm vs npm/yarn: symlinks, disk space, and performance
- Workspace concepts and benefits
- TypeScript in monorepo context
- Basic tooling overview

### Module 1.2: Initial Setup

- Installing pnpm and understanding its file structure
- Creating pnpm-workspace.yaml
- Understanding .pnpm directory and node_modules structure
- Basic .npmrc configuration
- Git setup and .gitignore patterns

### Module 1.3: First Workspace

- Creating your first package
- Package.json essentials for workspaces
- Understanding workspace: protocol
- Running scripts across workspaces
- Basic dependency installation

## Phase 2: TypeScript Configuration (Week 2)

### Module 2.1: TypeScript Setup

#### 2.1.1 Root tsconfig.json vs Package tsconfig.json

**Root Configuration Strategy**
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

**Package-Level Configuration**
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
  "references": [
    { "path": "../shared" },
    { "path": "../types" }
  ]
}
```

**Key Principles:**
- Base configuration provides common settings
- Package configs extend base and add specific needs
- Each package controls its own build output
- References enable TypeScript project graph

#### 2.1.2 Understanding Project References

**What Project References Solve:**
- Enable TypeScript to understand package dependencies
- Allow incremental builds across the monorepo
- Provide better IDE experience with go-to-definition
- Enable parallel compilation of independent packages

**Setting Up References:**
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

**Reference Chain Example:**
```
types (no deps) → utils (depends on types) → shared (depends on utils, types) → api (depends on all)
```

**Best Practices:**
- Order references by dependency chain
- Use `"prepend": true` for utility packages
- Keep references minimal to avoid circular deps
- Use `tsc --build` for reference-aware compilation

#### 2.1.3 Composite Projects and Incremental Builds

**Enabling Composite Mode:**
```json
{
  "compilerOptions": {
    "composite": true,        // Enables project references
    "incremental": true,      // Saves build info for faster rebuilds
    "tsBuildInfoFile": "./dist/.tsbuildinfo",
    "declaration": true,      // Required for composite
    "declarationMap": true    // Helpful for debugging
  }
}
```

**Build Performance Benefits:**
- Only rebuilds changed packages and dependents
- Parallel builds for independent packages
- Faster subsequent builds with .tsbuildinfo
- Skips type checking for unchanged code

**Build Commands:**
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

**Managing Build Info:**
```json
// In each package tsconfig.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./dist/.tsbuildinfo"
  }
}
```

#### 2.1.4 Path Mappings and Module Resolution

**Centralized Path Mapping:**
```json
// tsconfig.base.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Package aliases
      "@myapp/types": ["./packages/types/src/index.ts"],
      "@myapp/types/*": ["./packages/types/src/*"],
      "@myapp/utils": ["./packages/utils/src/index.ts"],
      "@myapp/utils/*": ["./packages/utils/src/*"],
      "@myapp/shared": ["./packages/shared/src/index.ts"],
      "@myapp/shared/*": ["./packages/shared/src/*"],
      
      // Internal path shortcuts
      "~/*": ["./src/*"],
      "#types": ["./src/types/index.ts"],
      "#config": ["./src/config/index.ts"]
    }
  }
}
```

**Module Resolution Strategy:**
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

**Runtime Path Resolution:**
For Node.js runtime, use tools like `tsconfig-paths`:
```json
// package.json
{
  "scripts": {
    "dev": "node -r tsconfig-paths/register -r ts-node/register src/index.ts"
  }
}
```

#### 2.1.5 Common Compiler Options for Monorepos

**Strict Type Checking:**
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

**Module and Import Settings:**
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

**Declaration and Source Maps:**
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

**Performance Optimizations:**
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "incremental": true,
    "assumeChangesOnlyAffectDirectDependencies": true
  }
}
```

#### 2.1.6 Advanced Configuration Patterns

**Environment-Specific Configs:**
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

**Package Export Configuration:**
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

**Workspace Protocol Integration:**
```json
// Consumer package.json
{
  "dependencies": {
    "@myapp/utils": "workspace:*",
    "@myapp/types": "workspace:^"
  }
}
```

#### 2.1.7 Common Issues and Solutions

**Circular Dependencies:**
```bash
# Detect circular references
npx madge --circular --extensions ts ./packages

# Solution: Extract shared types to separate package
```

**Build Order Issues:**
```json
// Use explicit references to control build order
{
  "references": [
    { "path": "../types" },     // Build first
    { "path": "../utils" },     // Then utils
    { "path": "../shared" }     // Finally shared
  ]
}
```

**Path Resolution Problems:**
```typescript
// Use consistent import patterns
import { type User } from '@myapp/types'
import { logger } from '@myapp/utils'

// Avoid relative imports across packages
// ❌ import { helper } from '../../../utils/src/helper'
// ✅ import { helper } from '@myapp/utils'
```

#### 2.1.8 Development Workflow Integration

**VS Code Multi-root Workspace:**
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

**Build Scripts Integration:**
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

This deep dive covers the essential TypeScript configuration concepts needed for effective monorepo development with pnpm.

### Module 2.2: Build Configuration

- Setting up build scripts
- Watch mode across packages
- Source maps configuration
- Declaration files generation
- Build output organization

### Module 2.3: Type Sharing

- Creating shared types packages
- Importing types across packages
- Declaration merging patterns
- Type-only imports/exports
- Managing @types dependencies

## Phase 3: Package Management (Week 3)

### Module 3.1: Dependencies Deep Dive

- workspace:\* vs workspace:^ vs workspace:~
- Peer dependencies in monorepo
- Dev dependencies placement strategies
- Hoisting and shamefully-hoist
- Dealing with phantom dependencies

### Module 3.2: Package Scripts

- Root scripts vs package scripts
- Running scripts with --filter
- Sequential vs parallel execution
- Script composition patterns
- Using pnpm exec and dlx

### Module 3.3: Publishing Packages

- Public vs private packages
- Package.json exports field
- Preparing packages for publishing
- Local testing with pnpm link
- Version management basics

## Phase 4: Development Workflow (Week 4)

### Module 4.1: Development Tools

- Setting up hot reload with tsx/ts-node
- Debugging TypeScript in monorepo
- VS Code multi-root workspaces
- Running multiple services locally
- Environment variables management

### Module 4.2: Code Sharing Patterns

- Creating utility packages
- Shared configuration packages
- Component libraries setup
- API type sharing
- Constants and enums packages

### Module 4.3: Testing Setup

- Jest/Vitest configuration for workspaces
- Running tests across packages
- Shared test utilities
- Test coverage aggregation
- Testing package integrations

## Phase 5: Build Optimization (Week 5)

### Module 5.1: Build Performance

- Understanding pnpm's linking mechanism
- TypeScript incremental builds
- Build caching with .tsbuildinfo
- Parallel builds setup
- Selective builds with --filter

### Module 5.2: Bundle Optimization

- Using build tools (esbuild, tsup, rollup)
- Tree shaking in monorepo
- External dependencies handling
- Source and declaration bundling
- Development vs production builds

### Module 5.3: Advanced pnpm Features

- Catalogs (pnpm 9.5+)
- Overrides and resolutions
- Hooks and lifecycle scripts
- Side effects cache
- Store management and pruning

## Phase 6: Tooling Integration (Week 6)

### Module 6.1: Linting and Formatting

- ESLint setup for monorepo
- Shared ESLint configurations
- Package-specific rules
- Prettier integration
- Pre-commit hooks setup

### Module 6.2: Git Integration

- Conventional commits setup
- Changesets for version management
- Git hooks with Husky
- Lint-staged configuration
- Branch protection rules

### Module 6.3: CI/CD Basics

- GitHub Actions for monorepo
- Caching pnpm store in CI
- Running affected packages only
- Build matrix strategies
- Artifact management

## Phase 7: Common Patterns (Week 7)

### Module 7.1: Application Structure

- Apps vs packages organization
- Internal tools and scripts
- Documentation structure
- Example applications
- Playground/sandbox packages

### Module 7.2: Configuration Management

- Shared TypeScript configs
- Build tool configurations
- Runtime configuration patterns
- Environment-specific builds
- Configuration validation

### Module 7.3: Debugging and Troubleshooting

- Common pnpm errors and solutions
- TypeScript resolution issues
- Circular dependency detection
- Performance profiling
- Memory usage optimization

## Phase 8: Real-World Scenarios (Week 8)

### Module 8.1: Migration Strategies

- Converting existing project to monorepo
- Gradual migration approach
- Handling legacy dependencies
- Preserving git history
- Team onboarding

### Module 8.2: Scaling Considerations

- When to split packages
- Managing growing dependencies
- Build time optimization
- Development experience at scale
- Monorepo boundaries

### Module 8.3: Best Practices

- Package naming conventions
- Version management strategies
- Documentation standards
- Code ownership patterns
- Maintenance workflows

## Practical Projects Throughout

- **Week 1-2**: Build a simple CLI tool with shared utilities
- **Week 3-4**: Create a full-stack app (API + Frontend) sharing types
- **Week 5-6**: Add build optimization and tooling to existing project
- **Week 7-8**: Migrate a real application to monorepo structure

## Key Learning Outcomes

- **Understand pnpm mechanics**: How symlinks work, dependency resolution, and workspace protocols
- **Master TypeScript configuration**: Project references, path mappings, and build optimization
- **Efficient package management**: Dependencies, scripts, and publishing workflows
- **Development productivity**: Hot reload, debugging, and testing strategies
- **Build optimization**: Incremental builds, caching, and bundling
- **Tool integration**: Linting, formatting, and CI/CD setup
- **Problem-solving**: Debug common issues and optimize performance
- **Best practices**: Structure, naming, and maintenance patterns

## Each module includes:

- Hands-on exercises with real code
- Common pitfalls and solutions
- Performance comparisons
- Decision criteria for different approaches
- Practical tips from real-world usage
