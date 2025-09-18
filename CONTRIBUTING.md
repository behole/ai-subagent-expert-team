# Contributing to AI SubAgent Expert Team

Thank you for your interest in contributing to the AI SubAgent Expert Team project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Error messages and stack traces

### Suggesting Features

1. **Check the roadmap** and existing feature requests
2. **Open a discussion** before submitting a pull request
3. **Describe the problem** your feature would solve
4. **Propose a solution** with implementation details

### Contributing Code

1. **Fork the repository** and create a feature branch
2. **Follow the coding standards** outlined below
3. **Write tests** for new functionality
4. **Update documentation** as needed
5. **Submit a pull request** with a clear description

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Docker (optional)

### Local Development

```bash
# Clone your fork
git clone https://github.com/yourusername/ai-subagent-expert-team.git
cd ai-subagent-expert-team

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start development server
npm run dev
```

## 📝 Coding Standards

### TypeScript Guidelines

- **Use TypeScript strict mode** - All code must pass strict type checking
- **Define interfaces** for all data structures
- **Use explicit return types** for public methods
- **Document public APIs** with JSDoc comments

### Code Style

```typescript
// ✅ Good
export interface ExpertAnalysis {
  expertName: string;
  confidence: number;
  recommendations: Recommendation[];
}

/**
 * Analyzes a project submission using the specified expert
 * @param expertName - Name of the expert to consult
 * @param submission - Project details to analyze
 * @returns Promise resolving to expert analysis
 */
public async consultExpert(
  expertName: string, 
  submission: ProjectSubmission
): Promise<ExpertAnalysis> {
  // Implementation
}

// ❌ Avoid
function doStuff(data: any): any {
  // Implementation
}
```

### Expert Implementation Guidelines

When adding new experts:

1. **Extend BaseExpert** class
2. **Follow the persona pattern** - Create detailed expert personality
3. **Implement all required methods**:
   - `analyzeProject()`
   - `getConfidenceLevel()`
   - `generateRecommendations()`
4. **Add comprehensive tests**
5. **Update orchestrator registration**

### File Organization

```
src/
├── experts/           # Expert implementations
│   ├── BaseExpert.ts     # Base class
│   └── [ExpertName].ts   # Individual experts
├── orchestration/     # Coordination logic
├── middleware/        # Express middleware
├── utils/            # Utility functions
├── types/            # Type definitions
└── tests/            # Test files
```

## 🧪 Testing

### Test Requirements

- **Unit tests** for all new functionality
- **Integration tests** for expert interactions
- **API tests** for REST endpoints
- **Minimum 80% code coverage**

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- expert.test.ts
```

### Test Structure

```typescript
import { DesignTheorySpecialist } from '../experts/DesignTheorySpecialist';

describe('DesignTheorySpecialist', () => {
  let expert: DesignTheorySpecialist;

  beforeEach(() => {
    expert = new DesignTheorySpecialist();
  });

  describe('analyzeProject', () => {
    it('should provide design recommendations for website projects', async () => {
      const submission = {
        type: 'website',
        content: 'Modern website redesign needed'
      };

      const result = await expert.analyzeProject(submission);

      expect(result.recommendations).toHaveLength(greaterThan(0));
      expect(result.confidence).toBeGreaterThan(0.7);
    });
  });
});
```

## 📚 Documentation

### Required Documentation

- **JSDoc comments** for all public APIs
- **README updates** for new features
- **API documentation** for new endpoints
- **Expert persona files** for new experts

### Documentation Style

```typescript
/**
 * Represents a specialized AI expert for creative project analysis
 * 
 * @example
 * ```typescript
 * const expert = new ColorTheorist();
 * const analysis = await expert.analyzeProject(submission);
 * console.log(analysis.recommendations);
 * ```
 */
export class ColorTheorist extends BaseExpert {
  /**
   * Analyzes color usage and psychology in the project
   * 
   * @param submission - Project details including visual elements
   * @param context - Optional additional context from other experts
   * @returns Promise resolving to color analysis with recommendations
   * 
   * @throws {ValidationError} When submission lacks visual content
   */
  public async analyzeProject(
    submission: ProjectSubmission,
    context?: ExpertContext
  ): Promise<ExpertAnalysis> {
    // Implementation
  }
}
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch** with the latest main
2. **Run the full test suite** and ensure all tests pass
3. **Run linting** and fix any issues
4. **Update documentation** for any changes
5. **Test your changes** in different environments

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Updated documentation

## Related Issues
Closes #123
```

### Review Process

1. **Automated checks** must pass (tests, linting, build)
2. **Code review** by at least one maintainer
3. **Manual testing** for significant changes
4. **Documentation review** for public API changes

## 🚀 Expert Development Guidelines

### Creating New Experts

1. **Research the domain** thoroughly
2. **Define clear boundaries** - what this expert does/doesn't cover
3. **Create a detailed persona** with:
   - Professional background
   - Areas of expertise
   - Analysis methodology
   - Communication style
4. **Implement comprehensive analysis** covering:
   - Current state assessment
   - Specific recommendations
   - Confidence levels
   - Integration with other experts

### Expert Quality Standards

- **Domain accuracy** - Recommendations must be professionally sound
- **Consistency** - Expert behavior should be predictable
- **Collaboration** - Must integrate well with other experts
- **Performance** - Analysis should complete within reasonable time

## 📋 Issue Templates

### Bug Report
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: [e.g. macOS]
- Node.js version: [e.g. 18.17.0]
- Project version: [e.g. 1.0.0]
```

### Feature Request
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Additional context**
Any other context about the feature request.
```

## 🏷️ Release Process

1. **Version bump** following semantic versioning
2. **Update CHANGELOG.md** with new features and fixes
3. **Tag the release** with git
4. **Publish to npm** (if applicable)
5. **Update deployment** configurations

## 📞 Community

- **GitHub Discussions** for general questions
- **GitHub Issues** for bugs and feature requests
- **Code Reviews** for learning and improvement

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- **Be respectful** in all interactions
- **Focus on constructive feedback**
- **Help others learn and grow**
- **Follow the [Contributor Covenant](https://www.contributor-covenant.org/)**

---

Thank you for contributing to AI SubAgent Expert Team! 🎉