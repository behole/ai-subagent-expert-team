/**
 * Input validation utilities for production API
 */

import { z } from 'zod';
import { ProjectSubmission } from '../types';

// Zod schema for project submission validation
const ProjectSubmissionSchema = z.object({
  type: z.enum(['website', 'brand', 'marketing', 'app', 'design', 'copy', 'other']),
  content: z.string().min(10, 'Content must be at least 10 characters').max(50000, 'Content too large'),
  requirements: z.string().max(5000, 'Requirements too large').optional(),
  context: z.string().max(5000, 'Context too large').optional(),
  targetAudience: z.string().max(2000, 'Target audience description too large').optional(),
  files: z.array(z.string()).max(50, 'Too many files').optional(),
});

export interface ValidationResult {
  success: boolean;
  data?: ProjectSubmission;
  errors?: string[];
}

export function validateProjectSubmission(input: any): ValidationResult {
  try {
    const data = ProjectSubmissionSchema.parse(input) as ProjectSubmission;
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
      };
    }
    return {
      success: false,
      errors: ['Unknown validation error'],
    };
  }
}

// Additional validation for slash commands
export function validateSlashCommand(command: string): boolean {
  const validCommands = [
    '@projectContextSpecialist',
    '@designTheorySpecialist',
    '@colorTheorist',
    '@copywritingStrategist',
    '@artHistoryAnalyst',
    '@brandStrategyAnalyst',
    '@uxUsabilitySpecialist',
    '@technicalImplementationAdvisor',
    '@culturalContextExpert',
    '@marketResearchAnalyst',
    '@accessibilityExpert',
    '@performanceAnalyst',
  ];

  return validCommands.includes(command) ||
         validCommands.some(cmd => cmd.toLowerCase() === command.toLowerCase());
}

// Sanitize input to prevent XSS and injection attacks
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

// Rate limiting validation
export function isValidApiKey(apiKey: string): boolean {
  // In production, implement proper API key validation
  if (process.env.NODE_ENV === 'production') {
    return apiKey === process.env.API_KEY;
  }
  return true; // Allow all in development
}