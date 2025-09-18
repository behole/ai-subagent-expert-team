export interface ProjectSubmission {
  type: 'website' | 'brand' | 'marketing' | 'app' | 'design' | 'copy' | 'other';
  content: string;
  files?: string[];
  requirements?: string;
  context?: string;
  targetAudience?: string;
}

export interface ExpertAnalysis {
  expertName: string;
  expertRole: string;
  assessment: string;
  insights: string[];
  recommendations: Recommendation[];
  collaborativeNotes: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
  uncertaintyAreas: string[];
  timestamp: Date;
}

export interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  reasoning: string;
  implementation: string;
  impact: string;
}

export interface OrchestrationResult {
  projectId: string;
  activeExperts: string[];
  analyses: ExpertAnalysis[];
  synthesis: ProjectSynthesis;
  conflicts: ExpertConflict[];
  nextSteps: string[];
}

export interface ProjectSynthesis {
  summary: string;
  keyFindings: string[];
  prioritizedRecommendations: Recommendation[];
  consensusAreas: string[];
  requiresUserDecision: string[];
}

export interface ExpertConflict {
  topic: string;
  conflictingExperts: string[];
  perspectives: Array<{
    expertName: string;
    position: string;
    reasoning: string;
  }>;
  resolutionRequired: boolean;
}

export interface ExpertActivationTrigger {
  keywords: string[];
  projectTypes: string[];
  contentTypes: string[];
  alwaysActive?: boolean;
  conditions?: (submission: ProjectSubmission) => boolean;
}

export type ExpertSlashCommand =
  | '@projectContextSpecialist'
  | '@designTheorySpecialist'
  | '@colorTheorist'
  | '@copywritingStrategist'
  | '@artHistoryAnalyst'
  | '@brandStrategyAnalyst'
  | '@uxUsabilitySpecialist'
  | '@technicalImplementationAdvisor'
  | '@culturalContextExpert'
  | '@marketResearchAnalyst'
  | '@accessibilityExpert'
  | '@performanceAnalyst';