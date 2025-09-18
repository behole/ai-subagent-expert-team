import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class ColorTheorist extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'color', 'palette', 'brand', 'visual', 'design', 'accessibility',
        'contrast', 'psychology', 'emotion', 'cultural', 'international'
      ],
      projectTypes: ['website', 'app', 'design', 'brand', 'marketing'],
      contentTypes: ['visual', 'interface', 'print', 'digital']
    };

    super('Dr. Zara Okafor', 'Color Theorist', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const psychologicalImpact = this.assessPsychologicalImpact(submission);
    const accessibilityAnalysis = this.analyzeAccessibility(submission);
    const culturalConsiderations = this.evaluateCulturalContext(submission);
    const brandAlignment = this.assessBrandAlignment(submission);
    const technicalImplementation = this.analyzeTechnicalAspects(submission);

    const insights = [
      `Color psychology: ${psychologicalImpact.impact}`,
      `Accessibility status: ${accessibilityAnalysis.status}`,
      `Cultural considerations: ${culturalConsiderations.assessment}`,
      `Brand alignment: ${brandAlignment.alignment}`,
      `Technical implementation: ${technicalImplementation.feasibility}`
    ];

    const recommendations = [];

    if (psychologicalImpact.needsAdjustment) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Color Psychology',
          psychologicalImpact.recommendation || 'Adjust color palette to better align with intended emotional response',
          'Color psychology directly impacts user perception and brand trust',
          psychologicalImpact.implementation || 'Research target audience color preferences and adjust primary palette accordingly',
          'Improved emotional connection and brand perception'
        )
      );
    }

    if (accessibilityAnalysis.hasIssues) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Color Accessibility',
          accessibilityAnalysis.recommendation || 'Ensure WCAG contrast compliance for all color combinations',
          'Accessibility compliance is legally required and affects 15% of users',
          accessibilityAnalysis.implementation || 'Test all color combinations with contrast checker and adjust values to meet AA standards',
          'Legal compliance and inclusive user experience'
        )
      );
    }

    if (culturalConsiderations.hasRisks) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Cultural Color Sensitivity',
          culturalConsiderations.recommendation || 'Review color choices for cultural appropriateness in target markets',
          'Color cultural meanings can impact brand reception and market success',
          culturalConsiderations.implementation || 'Research color symbolism in target geographic markets and adjust palette if needed',
          'Avoiding cultural misunderstandings and improving market acceptance'
        )
      );
    }

    if (brandAlignment.needsRefinement) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Brand Color Strategy',
          brandAlignment.recommendation || 'Strengthen color palette alignment with brand personality and positioning',
          'Color is a primary brand differentiator and affects brand recall',
          brandAlignment.implementation || 'Develop comprehensive brand color guidelines with usage rules and applications',
          'Stronger brand recognition and competitive differentiation'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Color System Documentation',
        'Create comprehensive color system with hex values, usage guidelines, and accessibility notes',
        'Documented color systems ensure consistency and proper implementation',
        'Develop color style guide with technical specifications and application examples',
        'Consistent brand implementation and reduced design decision time'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Color palette ${brandAlignment.alignment} with ${accessibilityAnalysis.status} accessibility and ${culturalConsiderations.risk} cultural risk`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessPsychologicalImpact(submission: ProjectSubmission): {
    impact: string;
    needsAdjustment: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('trust') || content.includes('professional')) {
      if (content.includes('blue') || content.includes('navy')) {
        return {
          impact: 'strong trust-building potential with blue palette',
          needsAdjustment: false
        };
      }
      return {
        impact: 'trust-building colors needed',
        needsAdjustment: true,
        recommendation: 'Incorporate blue tones for trust and professionalism',
        implementation: 'Use blue as primary or accent color (hex: #1E3A8A or similar professional blue)'
      };
    }

    if (content.includes('energy') || content.includes('dynamic') || content.includes('action')) {
      if (content.includes('red') || content.includes('orange')) {
        return {
          impact: 'energetic color palette supports dynamic positioning',
          needsAdjustment: false
        };
      }
      return {
        impact: 'energetic colors would enhance dynamic positioning',
        needsAdjustment: true,
        recommendation: 'Add warm, energetic colors to support dynamic brand personality',
        implementation: 'Incorporate orange or red accents (hex: #EA580C for energy, #DC2626 for urgency)'
      };
    }

    if (content.includes('calm') || content.includes('peaceful') || content.includes('wellness')) {
      return {
        impact: 'calming color palette recommended for wellness positioning',
        needsAdjustment: !content.includes('green') && !content.includes('soft'),
        recommendation: 'Use green and soft blue tones for calming effect',
        implementation: 'Primary palette: soft greens (#10B981) and calming blues (#3B82F6)'
      };
    }

    if (submission.type === 'brand') {
      return {
        impact: 'psychological color strategy needed for brand development',
        needsAdjustment: true,
        recommendation: 'Define color psychology strategy based on brand personality',
        implementation: 'Research target audience color preferences and competitor color positioning'
      };
    }

    return {
      impact: 'neutral psychological positioning',
      needsAdjustment: false
    };
  }

  private analyzeAccessibility(submission: ProjectSubmission): {
    status: string;
    hasIssues: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('accessibility') || content.includes('wcag') || content.includes('contrast')) {
      if (content.includes('compliant') || content.includes('meets standards')) {
        return {
          status: 'accessibility-focused with compliance considerations',
          hasIssues: false
        };
      }
      return {
        status: 'accessibility requirements identified',
        hasIssues: true,
        recommendation: 'Verify all color combinations meet WCAG AA contrast standards',
        implementation: 'Test with WebAIM contrast checker and adjust colors to achieve 4.5:1 ratio minimum'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        status: 'accessibility compliance required for digital interfaces',
        hasIssues: true,
        recommendation: 'Implement WCAG-compliant color system',
        implementation: 'Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text, avoid color-only information'
      };
    }

    if (content.includes('public') || content.includes('government') || content.includes('education')) {
      return {
        status: 'high accessibility standards required',
        hasIssues: true,
        recommendation: 'Meet WCAG AAA standards for public-facing content',
        implementation: 'Achieve 7:1 contrast ratio and provide alternative indicators beyond color'
      };
    }

    return {
      status: 'standard accessibility considerations apply',
      hasIssues: false
    };
  }

  private evaluateCulturalContext(submission: ProjectSubmission): {
    assessment: string;
    risk: string;
    hasRisks: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('international') || content.includes('global') || content.includes('cultural')) {
      return {
        assessment: 'cultural sensitivity required for global audience',
        risk: 'medium',
        hasRisks: true,
        recommendation: 'Research color symbolism in target markets',
        implementation: 'Avoid problematic colors (red in China for text, white for mourning in some cultures)'
      };
    }

    if (content.includes('religious') || content.includes('spiritual')) {
      return {
        assessment: 'religious color considerations needed',
        risk: 'high',
        hasRisks: true,
        recommendation: 'Consult cultural context expert for religious color appropriateness',
        implementation: 'Research religious color symbolism and avoid potentially offensive combinations'
      };
    }

    if (submission.targetAudience && submission.targetAudience.includes('diverse')) {
      return {
        assessment: 'diverse audience requires inclusive color choices',
        risk: 'low',
        hasRisks: true,
        recommendation: 'Choose universally positive color associations',
        implementation: 'Focus on nature-based colors and avoid highly culturally-specific meanings'
      };
    }

    return {
      assessment: 'minimal cultural color risks identified',
      risk: 'low',
      hasRisks: false
    };
  }

  private assessBrandAlignment(submission: ProjectSubmission): {
    alignment: string;
    needsRefinement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (submission.type === 'brand' || content.includes('brand')) {
      if (content.includes('luxury') || content.includes('premium')) {
        return {
          alignment: 'luxury brand color strategy needed',
          needsRefinement: !content.includes('black') && !content.includes('gold'),
          recommendation: 'Implement sophisticated color palette for luxury positioning',
          implementation: 'Use black, white, and metallic accents with minimal color for premium feel'
        };
      }

      if (content.includes('tech') || content.includes('startup') || content.includes('innovation')) {
        return {
          alignment: 'modern tech brand color approach needed',
          needsRefinement: true,
          recommendation: 'Use contemporary color palette that signals innovation',
          implementation: 'Consider gradients, bright accents, or modern blues/purples for tech positioning'
        };
      }
    }

    if (content.includes('competitive') || content.includes('differentiation')) {
      return {
        alignment: 'competitive differentiation through color needed',
        needsRefinement: true,
        recommendation: 'Analyze competitor color positioning and differentiate strategically',
        implementation: 'Research competitor palettes and choose colors that stand out while staying appropriate'
      };
    }

    return {
      alignment: 'standard brand color principles apply',
      needsRefinement: false
    };
  }

  private analyzeTechnicalAspects(submission: ProjectSubmission): {
    feasibility: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('print') && content.includes('web')) {
      return {
        feasibility: 'cross-media color consistency requires careful planning'
      };
    }

    if (content.includes('app') || content.includes('mobile')) {
      return {
        feasibility: 'mobile color rendering and dark mode considerations needed'
      };
    }

    if (content.includes('system') || content.includes('component')) {
      return {
        feasibility: 'scalable color token system implementation required'
      };
    }

    return {
      feasibility: 'standard color implementation approaches sufficient'
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('cultural') && !this.hasCulturalExpertInput(collaborativeContext)) {
      uncertainties.push('Cultural context expert should review color symbolism for specific target markets');
    }

    if (submission.content.includes('technical') || submission.content.includes('implementation')) {
      uncertainties.push('Technical implementation advisor should confirm color rendering capabilities');
    }

    if (submission.content.includes('accessibility') && submission.content.includes('complex')) {
      uncertainties.push('Accessibility expert should review complete color implementation beyond basic contrast');
    }

    if (!submission.targetAudience) {
      uncertainties.push('Target audience definition needed for appropriate color psychology analysis');
    }

    return uncertainties;
  }

  private hasCulturalExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Cultural') || analysis.expertRole.includes('Cultural')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('international'),
      submission.content.includes('accessibility'),
      submission.content.includes('system'),
      submission.content.includes('complex'),
      submission.type === 'brand',
      !submission.targetAudience
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('backend') ||
           content.includes('database') ||
           content.includes('api') ||
           (content.includes('technical') && !content.includes('color') && !content.includes('design'));
  }
}