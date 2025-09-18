import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class ProjectContextSpecialist extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [],
      projectTypes: [],
      contentTypes: [],
      alwaysActive: true
    };

    super('Alex Chen', 'Project Context Specialist', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const projectScope = this.assessProjectScope(submission);
    const recommendedExperts = this.determineExpertTeam(submission);
    const timelineFeasibility = this.assessTimelineFeasibility(submission);
    const riskFactors = this.identifyRiskFactors(submission);

    const insights = [
      `Project Type: ${projectScope.type} with ${projectScope.complexity} complexity`,
      `Recommended Expert Team: ${recommendedExperts.join(', ')}`,
      `Timeline Assessment: ${timelineFeasibility}`,
      ...riskFactors.map(risk => `Risk Factor: ${risk}`)
    ];

    const recommendations = [
      this.createRecommendation(
        'high',
        'Expert Team Activation',
        `Activate the following experts for optimal analysis: ${recommendedExperts.join(', ')}`,
        'Based on project type, scope, and requirements analysis',
        'Use slash commands to manually activate specific experts or allow auto-activation',
        'Ensures comprehensive analysis from all relevant domain experts'
      ),
      this.createRecommendation(
        'medium',
        'Scope Clarification',
        'Define clear success metrics and deliverable specifications',
        'Current brief contains ambiguous elements that could lead to scope creep',
        'Schedule stakeholder alignment session to clarify expectations',
        'Reduces project risk and improves delivery quality'
      )
    ];

    if (this.requiresAdditionalContext(submission)) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Information Gathering',
          'Collect additional project context and constraints',
          'Insufficient information to provide confident timeline and resource estimates',
          'Conduct detailed requirements gathering session',
          'Enables accurate project planning and expert analysis'
        )
      );
    }

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission);
    const confidenceLevel = this.assessConfidenceLevel(submission, 'medium');

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Project requires ${projectScope.complexity} coordination with ${recommendedExperts.length} specialist experts`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessProjectScope(submission: ProjectSubmission): {
    type: string;
    complexity: 'low' | 'medium' | 'high';
  } {
    const complexityIndicators = [
      submission.content.includes('integration'),
      submission.content.includes('multiple platforms'),
      submission.content.includes('database'),
      submission.content.includes('api'),
      submission.content.includes('responsive'),
      submission.content.includes('accessibility'),
      !submission.requirements || submission.requirements.length < 50
    ];

    const complexityScore = complexityIndicators.filter(Boolean).length;

    return {
      type: submission.type,
      complexity: complexityScore >= 4 ? 'high' : complexityScore >= 2 ? 'medium' : 'low'
    };
  }

  public determineExpertTeam(submission: ProjectSubmission): string[] {
    const experts: string[] = [];
    const content = submission.content.toLowerCase();
    const type = submission.type.toLowerCase();

    if (['website', 'app', 'design'].some(t => type.includes(t))) {
      experts.push('Design Theory Specialist');
    }

    if (content.includes('color') || ['brand', 'design'].some(t => type.includes(t))) {
      experts.push('Color Theorist');
    }

    if (content.includes('copy') || content.includes('content') || content.includes('messaging')) {
      experts.push('Copywriting Strategist');
    }

    if (['website', 'app'].some(t => type.includes(t))) {
      experts.push('UX/Usability Specialist');
      experts.push('Technical Implementation Advisor');
    }

    if (content.includes('brand') || type.includes('brand')) {
      experts.push('Brand Strategy Analyst');
    }

    if (content.includes('accessibility') || content.includes('inclusive')) {
      experts.push('Accessibility Expert');
    }

    if (content.includes('performance') || content.includes('speed')) {
      experts.push('Performance Analyst');
    }

    if (content.includes('cultural') || content.includes('international')) {
      experts.push('Cultural Context Expert');
    }

    if (content.includes('audience') || content.includes('market')) {
      experts.push('Market Research Analyst');
    }

    if (content.includes('historical') || content.includes('heritage')) {
      experts.push('Art History Analyst');
    }

    return [...new Set(experts)];
  }

  private assessTimelineFeasibility(submission: ProjectSubmission): string {
    if (!submission.requirements || !submission.requirements.includes('timeline')) {
      return 'Timeline not specified - recommend defining realistic milestones';
    }

    return 'Timeline assessment requires detailed scope clarification';
  }

  private identifyRiskFactors(submission: ProjectSubmission): string[] {
    const risks: string[] = [];

    if (!submission.context) {
      risks.push('Insufficient project context provided');
    }

    if (!submission.requirements) {
      risks.push('Requirements not clearly defined');
    }

    if (!submission.targetAudience) {
      risks.push('Target audience not specified');
    }

    if (submission.content.length < 100) {
      risks.push('Brief lacks sufficient detail for accurate assessment');
    }

    return risks;
  }

  private requiresAdditionalContext(submission: ProjectSubmission): boolean {
    return !submission.context || !submission.requirements || !submission.targetAudience;
  }

  private identifyUncertaintyAreas(submission: ProjectSubmission): string[] {
    const uncertainties: string[] = [];

    if (!submission.requirements) {
      uncertainties.push('Technical complexity assessment requires detailed requirements');
    }

    if (!submission.context) {
      uncertainties.push('Resource allocation uncertain without business context');
    }

    if (submission.content.includes('integration') || submission.content.includes('api')) {
      uncertainties.push('Technical implementation complexity needs specialist review');
    }

    return uncertainties;
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    return false;
  }
}