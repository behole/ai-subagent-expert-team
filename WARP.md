# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development Workflow
```bash
# Build and test the project
npm run build                # Compile TypeScript to dist/
npm test                     # Run Jest tests (when implemented)
npm run lint                 # Run ESLint on TypeScript files
npm run lint:fix            # Auto-fix linting issues

# Development and testing
npm run dev                 # Run development version (ts-node src/index.ts)
npm start                   # Run compiled version (node dist/index.js)
npm run start:prod         # Run production server (NODE_ENV=production node dist/server.js)

# Example execution and testing
npx ts-node examples/basic-usage.ts              # Test core functionality
npx ts-node examples/comprehensive-test.ts       # Test all 12 experts
npx ts-node examples/phase2-advanced-test.ts     # Advanced scenarios
```

### Docker and Deployment
```bash
# Docker operations
npm run docker:build       # Build Docker image
npm run docker:run         # Run containerized version
docker-compose up          # Full production stack with nginx/redis

# Production deployment
npm run build:prod         # Clean build for production
npm run deploy             # Build and start production server
```

### Running Single Tests
```bash
# When tests are implemented:
npm test -- --testNamePattern="ExpertOrchestrator"  # Run specific test suites
npm test -- experts/ColorTheorist.test.ts          # Run specific test file
npm run test:watch         # Run tests in watch mode
```

## Architecture Overview

### Core System Design
This is an **AI SubAgent Expert Team** system implementing a **hub-and-spoke architecture** where 12 specialized AI experts analyze creative projects and provide professional consulting-level feedback.

**Key Architectural Principles:**
- **Expert Orchestration**: Central `ExpertOrchestrator` coordinates specialist consultations
- **Smart Activation**: Experts auto-activate based on project type, keywords, and content analysis
- **Manual Override**: Slash commands (`@expertName`) enable direct expert consultation
- **Conflict Resolution**: System presents multiple expert perspectives when opinions differ
- **Human-in-the-Loop**: Always presents expert conflicts for human decision-making

### Expert Team Structure (12 Specialists)

**Phase 1: Universal Foundation**
- `ProjectContextSpecialist` (Alex Chen) - Central orchestrator, always active
- `DesignTheorySpecialist` (Dr. Maya Rodriguez) - Visual design, typography, layout
- `ColorTheorist` (Dr. Zara Okafor) - Color psychology, accessibility, cultural meaning
- `CopywritingStrategist` (Marcus Thompson) - Messaging, brand voice, conversion

**Phase 2: Specialized Analysis**
- `ArtHistoryAnalyst` (Dr. Elena Vasquez) - Cultural context, historical references
- `BrandStrategyAnalyst` (Sarah Kim) - Competitive positioning, brand architecture
- `UXUsabilitySpecialist` (David Chen) - User experience, conversion optimization
- `TechnicalImplementationAdvisor` (Jordan Rivera) - Technical feasibility, performance

**Phase 3: Contextual Experts**
- `CulturalContextExpert` (Dr. Amara Osei) - Global sensitivity, inclusive design
- `MarketResearchAnalyst` (Lisa Park) - Audience behavior, competitive intelligence
- `AccessibilityExpert` (Dr. Alex Johnson) - WCAG compliance, inclusive design
- `PerformanceAnalyst` (Maria Santos) - Core Web Vitals, technical optimization

### Key Components

**Core Classes:**
- `AISubAgentExpertTeam` - Main public interface
- `ExpertOrchestrator` - Coordinates expert consultations and processes projects
- `BaseExpert` - Abstract base class all experts extend
- `SlashCommandParser` - Handles `@expertName` commands
- `SynthesisEngine` - Combines expert insights and identifies conflicts

**Data Flow:**
1. Project submission → `ProjectContextSpecialist` (always activated)
2. Context specialist determines relevant expert team
3. Selected experts analyze project with collaborative context
4. `SynthesisEngine` synthesizes insights and identifies conflicts
5. Results presented with expert perspectives and recommendations

### Project Types and Expert Activation

The system automatically activates relevant experts based on project type:
- **Website Design**: Context, Design Theory, Color, UX, Performance, Accessibility
- **Brand Identity**: Context, Design Theory, Color, Brand Strategy, Cultural Context
- **Marketing Campaign**: Context, Copy, Brand Strategy, Market Research, Cultural Context
- **App Development**: Context, UX, Technical, Performance, Accessibility

### Expert Slash Commands

Manual expert consultation via slash commands:
```
@projectContextSpecialist - Central orchestrator (always available)
@designTheorySpecialist  - Visual design analysis
@colorTheorist           - Color palette and psychology
@copywritingStrategist   - Messaging and content strategy
@artHistoryAnalyst       - Cultural and historical context
@brandStrategyAnalyst    - Competitive positioning
@uxUsabilitySpecialist   - User experience optimization
@technicalImplementationAdvisor - Technical feasibility
@culturalContextExpert   - Global sensitivity and inclusive design
@marketResearchAnalyst   - Audience and competitive intelligence
@accessibilityExpert     - WCAG compliance and accessibility
@performanceAnalyst      - Core Web Vitals and technical optimization
```

### Production API Server

The system includes a complete REST API server (`src/server.ts`) with:

**API Endpoints:**
- `GET /health` - Health check and system status
- `GET /api/info` - API information and expert statistics
- `GET /api/experts` - List all experts and slash commands
- `POST /api/analyze` - Analyze project with automatic expert selection
- `POST /api/consult/:expertCommand` - Consult specific expert
- `GET /api/docs` - Complete API documentation

**Production Features:**
- Security middleware (Helmet, CORS, rate limiting)
- Structured logging with Winston
- Error handling and validation
- Health checks and graceful shutdown
- Docker containerization ready

## Development Guidelines

### TypeScript Configuration
- **Strict mode enabled** - All code must pass strict type checking
- **ES2020 target** with CommonJS modules
- **Source maps** and **declaration files** generated
- **Exact optional properties** and **no unchecked indexed access**

### Code Architecture Patterns
- **Expert Pattern**: All experts extend `BaseExpert` and implement `analyze()` method
- **Orchestration Pattern**: Central coordinator manages expert activation and synthesis
- **Confidence Boundaries**: Experts explicitly state areas of certainty vs. uncertainty
- **Collaborative Context**: Experts can reference other experts' insights

### Adding New Experts
1. Create expert persona in `/personas/` directory
2. Implement expert class extending `BaseExpert` in `/src/experts/`
3. Register expert in `ExpertOrchestrator.initializeExperts()`
4. Add slash command mapping in `SlashCommandParser`
5. Update role mapping in orchestrator's `findExpertByName()`

### Key Environment Variables
```bash
NODE_ENV=production          # Environment mode
PORT=3000                   # Server port
ALLOWED_ORIGINS=https://... # CORS allowed origins
LOG_LEVEL=info              # Logging verbosity
RATE_LIMIT_MAX_REQUESTS=100 # Rate limiting
```

### File Structure Understanding
```
src/
├── experts/           # 12 individual expert implementations + BaseExpert
├── orchestration/     # ExpertOrchestrator, SlashCommandParser, SynthesisEngine
├── types/            # TypeScript interfaces and types
├── middleware/       # Express middleware (rate limiting, error handling)
├── utils/           # Logger, validation utilities
├── server.ts        # Production REST API server
└── index.ts         # Main entry point and AISubAgentExpertTeam class

examples/            # Usage examples and comprehensive tests
personas/           # Individual expert persona files (design documentation)
docs/              # Additional documentation
```

This is a **production-ready** system with all 12 experts implemented and tested. The codebase emphasizes **professional-level expert analysis**, **collaborative expert interaction**, and **human-in-the-loop decision making** for creative project consulting.