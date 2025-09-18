import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger, Recommendation } from '../types';

export abstract class BaseExpert {
  protected expertName: string;
  protected expertRole: string;
  protected activationTriggers: ExpertActivationTrigger;

  constructor(
    expertName: string,
    expertRole: string,
    activationTriggers: ExpertActivationTrigger
  ) {
    this.expertName = expertName;
    this.expertRole = expertRole;
    this.activationTriggers = activationTriggers;
  }

  public shouldActivate(submission: ProjectSubmission): boolean {
    if (this.activationTriggers.alwaysActive) {
      return true;
    }

    const contentLower = submission.content.toLowerCase();
    const typeLower = submission.type.toLowerCase();

    const keywordMatch = this.activationTriggers.keywords.some(keyword =>
      contentLower.includes(keyword.toLowerCase())
    );

    const projectTypeMatch = this.activationTriggers.projectTypes.some(type =>
      typeLower.includes(type.toLowerCase())
    );

    const contentTypeMatch = this.activationTriggers.contentTypes.length === 0 ||
      this.activationTriggers.contentTypes.some(type =>
        contentLower.includes(type.toLowerCase())
      );

    const customCondition = this.activationTriggers.conditions
      ? this.activationTriggers.conditions(submission)
      : true;

    return (keywordMatch || projectTypeMatch || contentTypeMatch) && customCondition;
  }

  public abstract analyze(
    submission: ProjectSubmission,
    collaborativeContext?: ExpertAnalysis[]
  ): Promise<ExpertAnalysis>;

  protected createRecommendation(
    priority: 'critical' | 'high' | 'medium' | 'low',
    category: string,
    description: string,
    reasoning: string,
    implementation: string,
    impact: string
  ): Recommendation {
    return {
      priority,
      category,
      description,
      reasoning,
      implementation,
      impact
    };
  }

  protected buildCollaborativeNotes(
    collaborativeContext: ExpertAnalysis[] = []
  ): string[] {
    const notes: string[] = [];

    collaborativeContext.forEach(analysis => {
      if (analysis.expertName !== this.expertName) {
        notes.push(`Building on ${analysis.expertName}'s insights regarding ${analysis.assessment}`);
      }
    });

    return notes;
  }

  protected assessConfidenceLevel(
    submission: ProjectSubmission,
    analysisComplexity: 'low' | 'medium' | 'high'
  ): 'high' | 'medium' | 'low' {
    const hasInsufficientInfo = !submission.context || !submission.requirements;
    const isOutsideExpertise = this.isOutsideCoreDomain(submission);

    if (hasInsufficientInfo || isOutsideExpertise) {
      return 'low';
    }

    if (analysisComplexity === 'high') {
      return 'medium';
    }

    return 'high';
  }

  protected abstract isOutsideCoreDomain(submission: ProjectSubmission): boolean;

  public getExpertInfo() {
    return {
      name: this.expertName,
      role: this.expertRole,
      triggers: this.activationTriggers
    };
  }
}