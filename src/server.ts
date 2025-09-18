/**
 * Production Server for AI SubAgent Expert Team
 * Provides REST API endpoints for expert analysis
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';
import { AISubAgentExpertTeam } from './index';
import { ProjectSubmission } from './types';
import { logger } from './utils/logger';
import { validateProjectSubmission } from './utils/validation';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize expert team
const expertTeam = new AISubAgentExpertTeam();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Compression and parsing
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: NODE_ENV,
    experts: expertTeam.getAvailableExperts().length,
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  const experts = expertTeam.getAvailableExperts();
  res.json({
    name: 'AI SubAgent Expert Team API',
    version: '1.0.0',
    environment: NODE_ENV,
    experts: {
      total: experts.length,
      available: experts.filter(e => e.implemented).length,
      phases: {
        'Phase 1 (Foundation)': experts.filter(e =>
          e.role.includes('Context') || e.role.includes('Design Theory') ||
          e.role.includes('Color') || e.role.includes('Copywriting')
        ).length,
        'Phase 2 (Specialized)': experts.filter(e =>
          e.role.includes('UX') || e.role.includes('Technical') ||
          e.role.includes('Brand') || e.role.includes('Art History')
        ).length,
        'Phase 3 (Contextual)': experts.filter(e =>
          e.role.includes('Cultural') || e.role.includes('Market') ||
          e.role.includes('Accessibility') || e.role.includes('Performance')
        ).length,
      },
    },
    endpoints: [
      'GET /health - Health check',
      'GET /api/info - API information',
      'GET /api/experts - List available experts',
      'POST /api/analyze - Analyze project with auto-expert selection',
      'POST /api/consult/:expertName - Consult specific expert',
      'GET /api/docs - API documentation',
    ],
  });
});

// List available experts
app.get('/api/experts', (req, res) => {
  try {
    const experts = expertTeam.getAvailableExperts();
    res.json({
      experts,
      slashCommands: experts.map(expert => ({
        command: `@${expert.name.toLowerCase().replace(/\s+/g, '')}`,
        expert: expert.name,
        role: expert.role,
        available: expert.implemented,
      })),
    });
  } catch (error) {
    logger.error('Error listing experts:', error);
    res.status(500).json({ error: 'Failed to retrieve expert list' });
  }
});

// Analyze project with automatic expert selection
app.post('/api/analyze', async (req, res) => {
  try {
    const startTime = Date.now();

    // Validate input
    const validationResult = validateProjectSubmission(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        error: 'Invalid project submission',
        details: validationResult.errors,
      });
      return;
    }

    const projectSubmission: ProjectSubmission = validationResult.data!;

    logger.info('Starting project analysis', {
      projectType: projectSubmission.type,
      contentLength: projectSubmission.content?.length || 0,
      hasTargetAudience: !!projectSubmission.targetAudience,
    });

    // Perform analysis
    const result = await expertTeam.analyzeProject(projectSubmission);

    const analysisTime = Date.now() - startTime;

    logger.info('Project analysis completed', {
      analysisTime,
      expertsActivated: result.activeExperts.length,
      recommendationsCount: result.analyses.reduce((sum, analysis) => sum + analysis.recommendations.length, 0),
      conflictsDetected: result.conflicts.length,
    });

    res.json({
      success: true,
      analysisTime,
      result,
      metadata: {
        timestamp: new Date().toISOString(),
        expertsActivated: result.activeExperts.length,
        totalRecommendations: result.analyses.reduce((sum, analysis) => sum + analysis.recommendations.length, 0),
        conflictsDetected: result.conflicts.length,
      },
    });

  } catch (error) {
    logger.error('Analysis error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Consult specific expert
app.post('/api/consult/:expertCommand', async (req, res) => {
  try {
    const startTime = Date.now();
    const { expertCommand } = req.params;

    // Validate input
    const validationResult = validateProjectSubmission(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        error: 'Invalid project submission',
        details: validationResult.errors,
      });
      return;
    }

    const projectSubmission: ProjectSubmission = validationResult.data!;
    const command = expertCommand.startsWith('@') ? expertCommand : `@${expertCommand}`;

    logger.info('Starting expert consultation', {
      command,
      projectType: projectSubmission.type,
      contentLength: projectSubmission.content?.length || 0,
    });

    // Perform consultation
    const result = await expertTeam.executeSlashCommand(command, projectSubmission);

    const consultationTime = Date.now() - startTime;

    logger.info('Expert consultation completed', {
      consultationTime,
      expert: result?.expertName || 'unknown',
      recommendationsCount: result?.recommendations?.length || 0,
    });

    if (!result) {
      res.status(404).json({
        error: 'Expert not found or consultation failed',
        command,
      });
      return;
    }

    res.json({
      success: true,
      consultationTime,
      result,
      metadata: {
        timestamp: new Date().toISOString(),
        expertConsulted: result.expertName,
        recommendationsCount: result.recommendations.length,
      },
    });

  } catch (error) {
    logger.error('Consultation error:', error);
    res.status(500).json({
      error: 'Consultation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    title: 'AI SubAgent Expert Team API Documentation',
    version: '1.0.0',
    description: 'REST API for analyzing creative projects with 12 specialized AI experts',
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: {
      'GET /health': {
        description: 'Health check endpoint',
        response: 'Server status and basic info',
      },
      'GET /api/info': {
        description: 'API information and capabilities',
        response: 'API details, expert counts, available endpoints',
      },
      'GET /api/experts': {
        description: 'List all available experts and their slash commands',
        response: 'Array of experts with names, roles, and availability',
      },
      'POST /api/analyze': {
        description: 'Analyze project with automatic expert selection',
        requestBody: {
          type: 'string (website|brand|marketing|app|design|copy|other)',
          content: 'string (project description)',
          requirements: 'string (optional)',
          context: 'string (optional)',
          targetAudience: 'string (optional)',
          files: 'string[] (optional)',
        },
        response: 'Complete project analysis with expert insights and recommendations',
      },
      'POST /api/consult/:expertCommand': {
        description: 'Consult specific expert (use slash command format)',
        parameters: {
          expertCommand: 'Expert slash command (e.g., @colorTheorist, @uxUsabilitySpecialist)',
        },
        requestBody: 'Same as /api/analyze',
        response: 'Analysis from the specified expert only',
      },
    },
    examples: {
      projectSubmission: {
        type: 'website',
        content: 'We need to redesign our company website to look more modern and professional. The current site feels outdated and we\'re not getting enough conversions.',
        requirements: 'Modern design, improve conversion rates, mobile-friendly',
        context: 'Tech startup targeting enterprise customers',
        targetAudience: 'Enterprise decision makers, technical professionals',
      },
    },
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: ['/health', '/api/info', '/api/experts', '/api/analyze', '/api/consult/:expertCommand', '/api/docs'],
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 AI SubAgent Expert Team API server started`, {
    port: PORT,
    environment: NODE_ENV,
    experts: expertTeam.getAvailableExperts().length,
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export { app };