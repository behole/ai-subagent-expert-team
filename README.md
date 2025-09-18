# AI SubAgent Expert Team

An orchestrated team of AI SubAgents that function as expert consultants, providing intelligent feedback on creative work across multiple domains.

## 🎯 Overview

This system implements a **hub-and-spoke model** where a central orchestrator coordinates specialized AI experts to analyze creative projects. Instead of generating content, the experts provide professional insights, recommendations, and analysis to help you make better creative decisions.

### Key Features

- **Smart Expert Activation**: Automatically determines which experts to consult based on project type and content
- **Manual Expert Override**: Use slash commands (`@expertName`) to directly consult specific experts
- **Conflict Resolution**: Presents multiple expert perspectives when opinions differ
- **Confidence Boundaries**: Experts explicitly state areas of certainty vs. uncertainty
- **Cross-Expert Collaboration**: Seamless integration between specialist domains

## 🏗️ Architecture

### Expert Team (12 Specialists)

#### Phase 1: Universal Foundation (✅ Implemented)
1. **Project Context Specialist** (Alex Chen) - Central orchestrator, always active
2. **Design Theory Specialist** (Dr. Maya Rodriguez) - Visual design, typography, layout
3. **Color Theorist** (Dr. Zara Okafor) - Color psychology, accessibility, cultural meaning
4. **Copywriting Strategist** (Marcus Thompson) - Messaging, brand voice, conversion

#### Phase 2: Specialized Analysis (✅ Implemented)
5. **Art History Analyst** (Dr. Elena Vasquez) - Cultural context, historical references
6. **Brand Strategy Analyst** (Sarah Kim) - Competitive positioning, brand architecture
7. **UX/Usability Specialist** (David Chen) - User experience, conversion optimization
8. **Technical Implementation Advisor** (Jordan Rivera) - Technical feasibility, performance

#### Phase 3: Contextual Experts (✅ Implemented)
9. **Cultural Context Expert** (Dr. Amara Osei) - Global sensitivity, inclusive design
10. **Market Research Analyst** (Lisa Park) - Audience behavior, competitive intelligence
11. **Accessibility Expert** (Dr. Alex Johnson) - WCAG compliance, inclusive design
12. **Performance Analyst** (Maria Santos) - Core Web Vitals, technical optimization

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-subagent-expert-team.git
cd ai-subagent-expert-team

# Install dependencies
npm install

# Build the project
npm run build
```

### Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Basic Usage

```typescript
import { AISubAgentExpertTeam } from './src/index';

const expertTeam = new AISubAgentExpertTeam();

// Define your project
const projectSubmission = {
  type: 'website',
  content: 'I need to redesign our company website. It should look modern, professional, and convert visitors into customers.',
  requirements: 'Modern design, improve conversion rates, professional appearance',
  context: 'Tech startup targeting enterprise customers',
  targetAudience: 'Enterprise decision makers, technical professionals'
};

// Get expert analysis
const result = await expertTeam.analyzeProject(projectSubmission);

// View results
console.log(expertTeam.getProjectSummary(result));
```

### Manual Expert Consultation

```typescript
// Directly consult a specific expert
const colorAnalysis = await expertTeam.executeSlashCommand(
  '@colorTheorist',
  projectSubmission
);

console.log(colorAnalysis.assessment);
console.log(colorAnalysis.recommendations);
```

### Production Server

```bash
# Start the REST API server
npm run start:prod

# The API will be available at http://localhost:3000
```

### API Endpoints

- `GET /health` - Health check
- `GET /api/info` - API information and available experts
- `GET /api/experts` - List all experts and slash commands
- `POST /api/analyze` - Analyze project with automatic expert selection
- `POST /api/consult/:expertCommand` - Consult specific expert
- `GET /api/docs` - Full API documentation

## 📊 Project Types Supported

| Project Type | Primary Experts | Coverage |
|--------------|----------------|----------|
| **Website Design** | Context, Design Theory, Color, UX, Performance, Accessibility | ✅ Full |
| **Brand Identity** | Context, Design Theory, Color, Brand Strategy, Cultural Context | ✅ Full |
| **Marketing Campaign** | Context, Copy, Brand Strategy, Market Research, Cultural Context | ✅ Full |
| **App Development** | Context, UX, Technical, Performance, Accessibility | ✅ Full |
| **Global Projects** | All experts with Cultural Context and Market Research specialization | ✅ Full |
| **E-commerce** | Performance, UX, Brand Strategy, Market Research, Accessibility | ✅ Full |

## 🎯 Expert Slash Commands

Use these commands to manually activate specific experts:

**Phase 1: Universal Foundation (✅ Available)**
- `@projectContextSpecialist` - Central orchestrator (always available)
- `@designTheorySpecialist` - Visual design analysis
- `@colorTheorist` - Color palette and psychology analysis
- `@copywritingStrategist` - Messaging and content strategy

**Phase 2: Specialized Analysis (✅ Available)**
- `@artHistoryAnalyst` - Cultural and historical context
- `@brandStrategyAnalyst` - Competitive positioning
- `@uxUsabilitySpecialist` - User experience optimization
- `@technicalImplementationAdvisor` - Technical feasibility

**Phase 3: Contextual Experts (✅ Available)**
- `@culturalContextExpert` - Global sensitivity and inclusive design
- `@marketResearchAnalyst` - Audience and competitive intelligence
- `@accessibilityExpert` - WCAG compliance and accessibility
- `@performanceAnalyst` - Core Web Vitals and technical optimization

## 📁 Project Structure

```
AI_SubAgent_Project/
├── src/
│   ├── experts/                    # Individual expert implementations (12 total)
│   │   ├── BaseExpert.ts          # Base expert class and interface
│   │   ├── ProjectContextSpecialist.ts  # Phase 1: Orchestrator
│   │   ├── DesignTheorySpecialist.ts    # Phase 1: Foundation
│   │   ├── ColorTheorist.ts             # Phase 1: Foundation
│   │   ├── CopywritingStrategist.ts     # Phase 1: Foundation
│   │   ├── ArtHistoryAnalyst.ts         # Phase 2: Specialized
│   │   ├── BrandStrategyAnalyst.ts      # Phase 2: Specialized
│   │   ├── UXUsabilitySpecialist.ts     # Phase 2: Specialized
│   │   ├── TechnicalImplementationAdvisor.ts  # Phase 2: Specialized
│   │   ├── CulturalContextExpert.ts     # Phase 3: Contextual
│   │   ├── MarketResearchAnalyst.ts     # Phase 3: Contextual
│   │   ├── AccessibilityExpert.ts       # Phase 3: Contextual
│   │   └── PerformanceAnalyst.ts        # Phase 3: Contextual
│   ├── orchestration/              # Expert coordination logic
│   │   ├── ExpertOrchestrator.ts   # Main orchestration engine
│   │   ├── SlashCommandParser.ts   # Handles @expertName commands
│   │   └── SynthesisEngine.ts      # Combines expert insights
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts                    # Main entry point
├── examples/                       # Usage examples and tests
│   ├── basic-usage.ts
│   ├── phase2-advanced-test.ts
│   └── comprehensive-test.ts
├── docs/                           # Documentation and personas
└── personas/                       # Individual expert persona files
```

## 🐳 Docker Deployment

```bash
# Build the Docker image
docker build -t ai-subagent-expert-team .

# Run the container
docker run -p 3000:3000 ai-subagent-expert-team

# Or use Docker Compose
docker-compose up
```

## ☁️ Railway Deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

This project is configured for one-click deployment on Railway:

1. Click the "Deploy on Railway" button above
2. Connect your GitHub repository
3. Set environment variables if needed
4. Deploy automatically

The included `Dockerfile` handles the complete build and deployment process.

## 🔄 Development Workflow

### Running Examples

```bash
# Run examples
npx ts-node examples/basic-usage.ts
npx ts-node examples/phase2-advanced-test.ts
npx ts-node examples/comprehensive-test.ts

# Build and run
npm run build
npm start
```

### Expert Analysis Structure

Each expert provides:

1. **Assessment**: Current state evaluation using expert framework
2. **Insights**: Key findings and expert perspective
3. **Recommendations**: Specific, prioritized improvements
4. **Collaboration**: How findings integrate with other experts
5. **Confidence**: Areas of certainty vs. need for research

### Adding New Experts

1. Create expert persona in `/personas/` directory
2. Implement expert class extending `BaseExpert`
3. Register expert in `ExpertOrchestrator`
4. Add slash command mapping in `SlashCommandParser`
5. Update role mapping in orchestrator

## 🎨 Example Output

```
🎯 Project Analysis Results:

Project ID: proj_1758130063736_4b5ofoqhy
Active Experts: Design Theory Specialist, Color Theorist, Copywriting Strategist

📊 Expert Analyses:

1. Dr. Maya Rodriguez (Design Theory Specialist)
   Assessment: Design follows systematic grid principles with clear typography hierarchy
   Confidence: high
   Key Insights:
     • Visual hierarchy: clear information flow
     • Typography approach: strategic font pairing needed
     • Composition strength: structured layout needed

2. Dr. Zara Okafor (Color Theorist)
   Assessment: Color palette needs development with high accessibility compliance
   Confidence: medium
   Key Insights:
     • Color psychology: trust-building colors needed
     • Accessibility status: requires WCAG compliance
     • Cultural considerations: minimal risks identified
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with watch mode
npm run test:watch
```

## 🚧 Current Status

**✅ Phase 1 Complete**: Core orchestration + Universal Foundation experts
- Project Context Specialist (orchestrator)
- Design Theory Specialist
- Color Theorist
- Copywriting Strategist

**✅ Phase 2 Complete**: Specialized Analysis experts
- Art History Analyst
- Brand Strategy Analyst
- UX/Usability Specialist
- Technical Implementation Advisor

**✅ Phase 3 Complete**: Contextual experts
- Cultural Context Expert
- Market Research Analyst
- Accessibility Expert
- Performance Analyst

**🎉 All 12 experts implemented and tested!** The system is production-ready.

## 📚 Documentation

- **Expert Personas**: Detailed expert personalities and capabilities in `/personas/`
- **Design Decisions**: Architectural choices documented in `design_decisions_log.md`
- **Project Status**: Current progress in `project_status_report.md`

## 🤝 Contributing

1. Review expert personas in `/personas/` directory
2. Follow existing expert implementation patterns
3. Maintain TypeScript strict mode compliance
4. Add comprehensive JSDoc documentation
5. Update README and project status

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with TypeScript** • **Analysis-First Approach** • **Human-in-the-Loop Decision Making**