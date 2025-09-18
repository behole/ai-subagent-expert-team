import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class CopywritingStrategist extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'copy', 'content', 'messaging', 'text', 'headline', 'call-to-action', 'cta',
        'voice', 'tone', 'brand', 'conversion', 'persuasion', 'writing'
      ],
      projectTypes: ['website', 'marketing', 'brand', 'app'],
      contentTypes: ['copy', 'content', 'messaging', 'text']
    };

    super('Marcus Thompson', 'Copywriting Strategist', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const messageEffectiveness = this.assessMessageEffectiveness(submission);
    const audienceConnection = this.evaluateAudienceConnection(submission);
    const conversionImpact = this.analyzeConversionImpact(submission);
    const brandVoiceAlignment = this.assessBrandVoiceAlignment(submission);
    const contentStrategy = this.evaluateContentStrategy(submission);

    const insights = [
      `Message clarity: ${messageEffectiveness.clarity}`,
      `Audience connection: ${audienceConnection.connection}`,
      `Conversion potential: ${conversionImpact.potential}`,
      `Brand voice: ${brandVoiceAlignment.alignment}`,
      `Content strategy: ${contentStrategy.approach}`
    ];

    const recommendations = [];

    if (messageEffectiveness.needsImprovement) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Message Clarity',
          messageEffectiveness.recommendation || 'Improve message clarity and directness',
          'Clear messaging reduces cognitive load and improves user comprehension',
          messageEffectiveness.implementation || 'Simplify language, use active voice, and lead with benefits',
          'Increased user engagement and action completion'
        )
      );
    }

    if (conversionImpact.hasIssues) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Conversion Optimization',
          conversionImpact.recommendation || 'Strengthen conversion-focused copy elements',
          'Conversion-optimized copy directly impacts business goals and ROI',
          conversionImpact.implementation || 'Optimize headlines, CTAs, and value propositions for action',
          'Improved conversion rates and business outcomes'
        )
      );
    }

    if (brandVoiceAlignment.needsDevelopment) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Brand Voice Development',
          brandVoiceAlignment.recommendation || 'Develop consistent brand voice and tone guidelines',
          'Consistent brand voice builds trust and recognition across touchpoints',
          brandVoiceAlignment.implementation || 'Create voice and tone guide with specific examples and applications',
          'Stronger brand identity and customer connection'
        )
      );
    }

    if (audienceConnection.needsRefinement) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Audience Alignment',
          audienceConnection.recommendation || 'Better align messaging with target audience needs and language',
          'Audience-aligned copy improves relevance and emotional connection',
          audienceConnection.implementation || 'Research audience language patterns and pain points, adjust tone accordingly',
          'Increased audience engagement and brand affinity'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Content Testing Framework',
        'Implement A/B testing for key messaging elements to optimize performance',
        'Data-driven copy optimization leads to continuous improvement',
        'Set up tests for headlines, CTAs, and value propositions with success metrics',
        'Evidence-based messaging improvements and performance optimization'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Messaging shows ${messageEffectiveness.clarity} clarity with ${conversionImpact.potential} conversion potential and ${brandVoiceAlignment.consistency} brand voice consistency`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessMessageEffectiveness(submission: ProjectSubmission): {
    clarity: string;
    needsImprovement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('confusing') || content.includes('unclear') || content.includes('complex')) {
      return {
        clarity: 'low - requires simplification',
        needsImprovement: true,
        recommendation: 'Simplify messaging for better comprehension',
        implementation: 'Use shorter sentences, common vocabulary, and lead with primary benefits'
      };
    }

    if (content.includes('jargon') || content.includes('technical') && !content.includes('audience')) {
      return {
        clarity: 'moderate - may need audience adjustment',
        needsImprovement: true,
        recommendation: 'Adjust technical language for target audience comprehension level',
        implementation: 'Replace jargon with plain language and provide context for necessary technical terms'
      };
    }

    if (content.includes('clear') || content.includes('simple') || content.includes('direct')) {
      return {
        clarity: 'good - maintains clear communication',
        needsImprovement: false
      };
    }

    if (submission.type === 'marketing' || submission.type === 'website') {
      return {
        clarity: 'needs optimization for conversion',
        needsImprovement: true,
        recommendation: 'Optimize messaging for clarity and action',
        implementation: 'Use benefit-focused headlines and clear, action-oriented language'
      };
    }

    return {
      clarity: 'standard - baseline clarity achieved',
      needsImprovement: false
    };
  }

  private evaluateAudienceConnection(submission: ProjectSubmission): {
    connection: string;
    needsRefinement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (!submission.targetAudience) {
      return {
        connection: 'undefined - target audience needs definition',
        needsRefinement: true,
        recommendation: 'Define target audience to tailor messaging appropriately',
        implementation: 'Research audience demographics, psychographics, and communication preferences'
      };
    }

    if (content.includes('tone') || content.includes('voice') || content.includes('personality')) {
      if (content.includes('appropriate') || content.includes('aligned')) {
        return {
          connection: 'well-aligned with audience expectations',
          needsRefinement: false
        };
      }
      return {
        connection: 'tone adjustment needed for audience fit',
        needsRefinement: true,
        recommendation: 'Align tone and voice with target audience preferences',
        implementation: 'Research audience communication style and adjust formality, energy, and terminology'
      };
    }

    if (content.includes('professional') || content.includes('business')) {
      return {
        connection: 'professional tone appropriate for business audience',
        needsRefinement: false
      };
    }

    if (content.includes('young') || content.includes('casual') || content.includes('social')) {
      return {
        connection: 'conversational tone needed for younger demographics',
        needsRefinement: true,
        recommendation: 'Adopt more conversational, relatable messaging style',
        implementation: 'Use contemporary language, contractions, and authentic brand personality'
      };
    }

    return {
      connection: 'standard audience alignment',
      needsRefinement: false
    };
  }

  private analyzeConversionImpact(submission: ProjectSubmission): {
    potential: string;
    hasIssues: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('conversion') || content.includes('cta') || content.includes('call-to-action')) {
      if (content.includes('strong') || content.includes('effective')) {
        return {
          potential: 'high - conversion-focused approach',
          hasIssues: false
        };
      }
      return {
        potential: 'moderate - conversion elements need optimization',
        hasIssues: true,
        recommendation: 'Strengthen conversion elements and calls-to-action',
        implementation: 'Use action verbs, create urgency, and clearly state value proposition'
      };
    }

    if (submission.type === 'marketing' || content.includes('sales') || content.includes('purchase')) {
      return {
        potential: 'needs conversion optimization',
        hasIssues: true,
        recommendation: 'Implement conversion-focused messaging strategy',
        implementation: 'Add compelling headlines, clear CTAs, and benefit-driven copy'
      };
    }

    if (content.includes('awareness') || content.includes('education') || content.includes('information')) {
      return {
        potential: 'informational focus - conversion secondary',
        hasIssues: false
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        potential: 'moderate - user action needed',
        hasIssues: true,
        recommendation: 'Include clear user guidance and action prompts',
        implementation: 'Add directional copy, progress indicators, and next-step guidance'
      };
    }

    return {
      potential: 'baseline - standard messaging approach',
      hasIssues: false
    };
  }

  private assessBrandVoiceAlignment(submission: ProjectSubmission): {
    alignment: string;
    consistency: string;
    needsDevelopment: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('brand voice') || content.includes('brand personality')) {
      if (content.includes('consistent') || content.includes('aligned')) {
        return {
          alignment: 'strong brand voice consistency',
          consistency: 'high',
          needsDevelopment: false
        };
      }
      return {
        alignment: 'brand voice needs refinement',
        consistency: 'inconsistent',
        needsDevelopment: true,
        recommendation: 'Develop comprehensive brand voice guidelines',
        implementation: 'Create voice and tone guide with personality traits, do/don\'t examples'
      };
    }

    if (submission.type === 'brand' || content.includes('branding')) {
      return {
        alignment: 'brand voice development required',
        consistency: 'undefined',
        needsDevelopment: true,
        recommendation: 'Establish distinctive brand voice and personality',
        implementation: 'Define brand archetypes, communication principles, and tone variations'
      };
    }

    if (content.includes('formal') || content.includes('professional')) {
      return {
        alignment: 'professional voice established',
        consistency: 'moderate',
        needsDevelopment: false
      };
    }

    return {
      alignment: 'standard voice approach',
      consistency: 'baseline',
      needsDevelopment: false
    };
  }

  private evaluateContentStrategy(submission: ProjectSubmission): {
    approach: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('content strategy') || content.includes('editorial')) {
      return {
        approach: 'strategic content planning needed'
      };
    }

    if (content.includes('storytelling') || content.includes('narrative')) {
      return {
        approach: 'narrative-driven content approach'
      };
    }

    if (submission.type === 'marketing') {
      return {
        approach: 'campaign-focused messaging strategy'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        approach: 'user-focused content architecture'
      };
    }

    return {
      approach: 'standard content approach'
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('cultural') || submission.content.includes('international')) {
      uncertainties.push('Cultural context expert should review messaging for global appropriateness');
    }

    if (submission.content.includes('technical') || submission.content.includes('compliance')) {
      uncertainties.push('Technical implementation advisor should verify regulatory language requirements');
    }

    if (submission.content.includes('seo') || submission.content.includes('search')) {
      uncertainties.push('Performance analyst should review SEO impact of copy choices');
    }

    if (submission.content.includes('accessibility') && !this.hasAccessibilityExpertInput(collaborativeContext)) {
      uncertainties.push('Accessibility expert should review content structure and readability');
    }

    if (!submission.targetAudience) {
      uncertainties.push('Target audience research needed for precise messaging strategy');
    }

    return uncertainties;
  }

  private hasAccessibilityExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Accessibility') || analysis.expertRole.includes('Accessibility')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('international'),
      submission.content.includes('technical'),
      submission.content.includes('compliance'),
      submission.content.includes('complex'),
      submission.type === 'marketing',
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
           (content.includes('technical') && !content.includes('writing') && !content.includes('copy'));
  }
}