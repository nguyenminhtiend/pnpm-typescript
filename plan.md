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

- Root tsconfig.json vs package tsconfig.json
- Understanding project references
- Composite projects and incremental builds
- Path mappings and module resolution
- Common compiler options for monorepos

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
