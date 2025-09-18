import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class DesignTheorySpecialist extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'design', 'layout', 'typography', 'composition', 'visual', 'grid',
        'hierarchy', 'font', 'typeface', 'spacing', 'alignment', 'balance'
      ],
      projectTypes: ['website', 'app', 'design', 'brand'],
      contentTypes: ['visual', 'interface', 'print', 'digital']
    };

    super('Dr. Maya Rodriguez', 'Design Theory Specialist', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const visualHierarchy = this.assessVisualHierarchy(submission);
    const typographyAnalysis = this.analyzeTypography(submission);
    const compositionEvaluation = this.evaluateComposition(submission);
    const systemScalability = this.assessSystemScalability(submission);

    const insights = [
      `Visual hierarchy: ${visualHierarchy.assessment}`,
      `Typography approach: ${typographyAnalysis.approach}`,
      `Composition strength: ${compositionEvaluation.strength}`,
      `Design system scalability: ${systemScalability}`
    ];

    const recommendations = [];

    if (visualHierarchy.needsImprovement) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Visual Hierarchy',
          visualHierarchy.recommendation || 'Improve visual hierarchy and information flow',
          'Clear visual hierarchy improves user comprehension and task completion',
          visualHierarchy.implementation || 'Apply systematic hierarchy principles',
          'Improved user scanning efficiency and information processing'
        )
      );
    }

    if (typographyAnalysis.needsRefinement) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Typography System',
          typographyAnalysis.recommendation || 'Optimize typography system and hierarchy',
          'Typography affects readability and brand perception',
          typographyAnalysis.implementation || 'Establish clear typography scale and hierarchy',
          'Enhanced readability and brand consistency'
        )
      );
    }

    if (compositionEvaluation.hasIssues) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Composition Balance',
          compositionEvaluation.recommendation || 'Improve composition balance and visual structure',
          'Balanced composition creates visual stability and professional appearance',
          compositionEvaluation.implementation || 'Apply grid system and balanced layout principles',
          'Improved visual appeal and user trust'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Design System Documentation',
        'Create comprehensive design system documentation for consistency',
        'Documented design systems ensure consistency across team members and future development',
        'Develop style guide with components, spacing rules, and typography specifications',
        'Reduced design debt and faster development cycles'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Design follows ${compositionEvaluation.principle} principles with ${typographyAnalysis.clarity} typography hierarchy`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessVisualHierarchy(submission: ProjectSubmission): {
    assessment: string;
    needsImprovement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('confusing') || content.includes('unclear')) {
      return {
        assessment: 'unclear information flow detected',
        needsImprovement: true,
        recommendation: 'Establish clear visual hierarchy using size, weight, and spacing principles',
        implementation: 'Apply 3-level hierarchy: Primary (largest/boldest), Secondary (medium), Tertiary (smallest/lightest)'
      };
    }

    if (content.includes('hierarchy') || content.includes('organize')) {
      return {
        assessment: 'hierarchy considerations identified',
        needsImprovement: true,
        recommendation: 'Implement systematic hierarchy using typography scale and visual weight',
        implementation: 'Create clear heading structure with consistent size ratios (e.g., 1.5x scale factor)'
      };
    }

    return {
      assessment: 'appears organized with logical flow',
      needsImprovement: false
    };
  }

  private analyzeTypography(submission: ProjectSubmission): {
    approach: string;
    clarity: string;
    needsRefinement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('font') || content.includes('typography') || content.includes('typeface')) {
      if (content.includes('readable') || content.includes('clear')) {
        return {
          approach: 'readability-focused selection needed',
          clarity: 'clear',
          needsRefinement: false
        };
      }

      return {
        approach: 'strategic font pairing needed',
        clarity: 'moderate',
        needsRefinement: true,
        recommendation: 'Establish typography system with complementary font pairing',
        implementation: 'Use geometric sans-serif for headlines, humanist sans-serif for body text'
      };
    }

    if (submission.type === 'brand' || submission.type === 'website') {
      return {
        approach: 'systematic typography approach recommended',
        clarity: 'needs definition',
        needsRefinement: true,
        recommendation: 'Define complete typography scale and hierarchy system',
        implementation: 'Create 5-level hierarchy with clear size, weight, and spacing relationships'
      };
    }

    return {
      approach: 'standard typography principles applicable',
      clarity: 'adequate',
      needsRefinement: false
    };
  }

  private evaluateComposition(submission: ProjectSubmission): {
    strength: string;
    principle: string;
    hasIssues: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('balanced') || content.includes('clean')) {
      return {
        strength: 'strong visual balance',
        principle: 'balanced composition',
        hasIssues: false
      };
    }

    if (content.includes('cluttered') || content.includes('messy') || content.includes('unorganized')) {
      return {
        strength: 'needs compositional structure',
        principle: 'unclear composition',
        hasIssues: true,
        recommendation: 'Apply grid system and white space principles for better organization',
        implementation: 'Implement 12-column grid with consistent gutters and establish clear content zones'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        strength: 'structured layout needed',
        principle: 'systematic grid',
        hasIssues: true,
        recommendation: 'Establish responsive grid system for consistent layout structure',
        implementation: 'Use flexbox/grid CSS with consistent breakpoints and spacing scale'
      };
    }

    return {
      strength: 'adequate visual structure',
      principle: 'conventional layout',
      hasIssues: false
    };
  }

  private assessSystemScalability(submission: ProjectSubmission): string {
    const content = submission.content.toLowerCase();

    if (content.includes('system') || content.includes('component') || content.includes('scale')) {
      return 'requires modular design system approach';
    }

    if (submission.type === 'brand' || submission.type === 'website') {
      return 'benefits from scalable design framework';
    }

    return 'standard design principles sufficient';
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('accessibility') || submission.content.includes('compliance')) {
      uncertainties.push('Accessibility compliance requires specialist review beyond visual design');
    }

    if (submission.content.includes('color') && !this.hasColorExpertInput(collaborativeContext)) {
      uncertainties.push('Color theory specialist should review palette and contrast relationships');
    }

    if (submission.content.includes('technical') || submission.content.includes('implementation')) {
      uncertainties.push('Technical implementation constraints need specialist assessment');
    }

    if (submission.content.includes('international') || submission.content.includes('cultural')) {
      uncertainties.push('Cultural context expert should review design elements for global appropriateness');
    }

    return uncertainties;
  }

  private hasColorExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Color') || analysis.expertRole.includes('Color')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('system'),
      submission.content.includes('component'),
      submission.content.includes('responsive'),
      submission.content.includes('multiple platform'),
      submission.type === 'app',
      !submission.context || submission.context.length < 50
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('backend') ||
           content.includes('database') ||
           content.includes('api') ||
           (content.includes('technical') && !content.includes('design'));
  }
}