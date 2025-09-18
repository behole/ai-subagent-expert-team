import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class UXUsabilitySpecialist extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'ux', 'usability', 'user experience', 'user interface', 'ui', 'conversion',
        'navigation', 'user journey', 'interaction', 'mobile', 'responsive', 'flow'
      ],
      projectTypes: ['website', 'app', 'marketing'],
      contentTypes: ['digital', 'interface', 'mobile', 'web']
    };

    super('David Chen', 'UX/Usability Specialist', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const usabilityEvaluation = this.assessUsability(submission);
    const userJourneyAnalysis = this.analyzeUserJourney(submission);
    const conversionOptimization = this.evaluateConversionPotential(submission);
    const mobileExperience = this.assessMobileUX(submission);
    const accessibilityConsiderations = this.evaluateBasicAccessibility(submission);

    const insights = [
      `Usability assessment: ${usabilityEvaluation.assessment}`,
      `User journey: ${userJourneyAnalysis.journey}`,
      `Conversion potential: ${conversionOptimization.potential}`,
      `Mobile experience: ${mobileExperience.assessment}`,
      `Accessibility considerations: ${accessibilityConsiderations.status}`
    ];

    const recommendations = [];

    if (usabilityEvaluation.hasIssues) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Usability Enhancement',
          usabilityEvaluation.recommendation || 'Improve core usability and user experience',
          'Poor usability directly impacts user satisfaction and task completion rates',
          usabilityEvaluation.implementation || 'Apply usability heuristics and user-centered design principles',
          'Reduced user frustration and improved task completion rates'
        )
      );
    }

    if (userJourneyAnalysis.needsOptimization) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'User Journey Optimization',
          userJourneyAnalysis.recommendation || 'Streamline user journey and reduce friction points',
          'Optimized user journeys increase conversion and user satisfaction',
          userJourneyAnalysis.implementation || 'Map user flows and eliminate unnecessary steps',
          'Improved conversion rates and user engagement'
        )
      );
    }

    if (conversionOptimization.hasOpportunities) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Conversion Rate Optimization',
          conversionOptimization.recommendation || 'Optimize conversion funnel and user decision points',
          'CRO improvements directly impact business objectives and ROI',
          conversionOptimization.implementation || 'A/B test key conversion elements and optimize based on user behavior',
          'Increased conversion rates and business outcomes'
        )
      );
    }

    if (mobileExperience.needsImprovement) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Mobile Experience',
          mobileExperience.recommendation || 'Enhance mobile user experience and responsive design',
          'Mobile users represent majority of traffic and have different interaction patterns',
          mobileExperience.implementation || 'Implement mobile-first design with touch-optimized interactions',
          'Improved mobile engagement and reduced bounce rates'
        )
      );
    }

    if (accessibilityConsiderations.needsAttention) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Basic Accessibility',
          accessibilityConsiderations.recommendation || 'Address basic accessibility and inclusive design considerations',
          'Accessible design improves usability for all users and ensures legal compliance',
          accessibilityConsiderations.implementation || 'Implement keyboard navigation, proper focus states, and clear labels',
          'Inclusive user experience and compliance with accessibility standards'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'User Testing Framework',
        'Establish user testing and feedback collection system',
        'Continuous user feedback enables data-driven UX improvements',
        'Set up user testing sessions, analytics tracking, and feedback collection mechanisms',
        'Evidence-based UX optimization and improved user satisfaction'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `UX shows ${usabilityEvaluation.level} usability with ${conversionOptimization.optimization} conversion optimization and ${mobileExperience.readiness} mobile readiness`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessUsability(submission: ProjectSubmission): {
    assessment: string;
    level: string;
    hasIssues: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('confusing') || content.includes('difficult') || content.includes('frustrating')) {
      return {
        assessment: 'significant usability challenges identified',
        level: 'poor',
        hasIssues: true,
        recommendation: 'Redesign with user-centered approach and clear navigation',
        implementation: 'Conduct user research, simplify navigation, and improve information architecture'
      };
    }

    if (content.includes('complex') || content.includes('overwhelming')) {
      return {
        assessment: 'complexity needs simplification',
        level: 'moderate',
        hasIssues: true,
        recommendation: 'Reduce cognitive load and implement progressive disclosure',
        implementation: 'Simplify interface, group related functions, and use clear visual hierarchy'
      };
    }

    if (content.includes('intuitive') || content.includes('easy') || content.includes('user-friendly')) {
      return {
        assessment: 'good usability foundation',
        level: 'good',
        hasIssues: false
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        assessment: 'usability optimization opportunities available',
        level: 'baseline',
        hasIssues: true,
        recommendation: 'Apply usability heuristics and user testing insights',
        implementation: 'Conduct heuristic evaluation and user testing to identify improvement areas'
      };
    }

    return {
      assessment: 'standard usability considerations apply',
      level: 'adequate',
      hasIssues: false
    };
  }

  private analyzeUserJourney(submission: ProjectSubmission): {
    journey: string;
    needsOptimization: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('conversion') || content.includes('funnel') || content.includes('customer journey')) {
      if (content.includes('optimize') || content.includes('improve')) {
        return {
          journey: 'conversion-focused optimization needed',
          needsOptimization: true,
          recommendation: 'Map and optimize conversion funnel',
          implementation: 'Identify friction points, streamline checkout/signup, and optimize call-to-actions'
        };
      }
      return {
        journey: 'conversion-aware design approach',
        needsOptimization: false
      };
    }

    if (content.includes('onboarding') || content.includes('first-time user')) {
      return {
        journey: 'onboarding experience needs attention',
        needsOptimization: true,
        recommendation: 'Design comprehensive onboarding experience',
        implementation: 'Create guided tour, progressive feature introduction, and clear value demonstration'
      };
    }

    if (submission.type === 'app') {
      return {
        journey: 'app user journey requires optimization',
        needsOptimization: true,
        recommendation: 'Design intuitive app navigation and task flows',
        implementation: 'Map core user tasks, minimize steps to value, and ensure clear navigation patterns'
      };
    }

    if (submission.type === 'website' && content.includes('business')) {
      return {
        journey: 'business website user flow needs structure',
        needsOptimization: true,
        recommendation: 'Create clear user pathways to business objectives',
        implementation: 'Define primary user goals, create clear CTAs, and optimize landing page flows'
      };
    }

    return {
      journey: 'standard user journey principles apply',
      needsOptimization: false
    };
  }

  private evaluateConversionPotential(submission: ProjectSubmission): {
    potential: string;
    optimization: string;
    hasOpportunities: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('convert') || content.includes('sales') || content.includes('leads')) {
      return {
        potential: 'high conversion focus identified',
        optimization: 'active',
        hasOpportunities: true,
        recommendation: 'Implement conversion rate optimization strategy',
        implementation: 'A/B test headlines, CTAs, and forms; optimize page load speed; reduce form friction'
      };
    }

    if (submission.type === 'marketing') {
      return {
        potential: 'marketing conversion optimization critical',
        optimization: 'needed',
        hasOpportunities: true,
        recommendation: 'Focus on conversion-driven design elements',
        implementation: 'Optimize landing pages, create compelling CTAs, and minimize conversion friction'
      };
    }

    if (submission.type === 'website' && content.includes('business')) {
      return {
        potential: 'business website conversion opportunities',
        optimization: 'moderate',
        hasOpportunities: true,
        recommendation: 'Align user experience with business goals',
        implementation: 'Create clear value propositions, optimize contact forms, and improve trust signals'
      };
    }

    if (content.includes('engagement') || content.includes('retention')) {
      return {
        potential: 'engagement-focused optimization',
        optimization: 'moderate',
        hasOpportunities: true,
        recommendation: 'Optimize for user engagement and retention',
        implementation: 'Improve content discovery, personalization, and user feedback loops'
      };
    }

    return {
      potential: 'standard optimization principles apply',
      optimization: 'baseline',
      hasOpportunities: false
    };
  }

  private assessMobileUX(submission: ProjectSubmission): {
    assessment: string;
    readiness: string;
    needsImprovement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('mobile') || content.includes('responsive')) {
      if (content.includes('mobile-first') || content.includes('optimized')) {
        return {
          assessment: 'mobile-first approach identified',
          readiness: 'good',
          needsImprovement: false
        };
      }
      return {
        assessment: 'mobile considerations present but needs optimization',
        readiness: 'moderate',
        needsImprovement: true,
        recommendation: 'Enhance mobile user experience and touch interactions',
        implementation: 'Optimize touch targets, improve mobile navigation, and ensure fast loading'
      };
    }

    if (submission.type === 'app') {
      return {
        assessment: 'mobile-native experience critical',
        readiness: 'requires-focus',
        needsImprovement: true,
        recommendation: 'Design for mobile-native interaction patterns',
        implementation: 'Implement platform-specific UI patterns, optimize for one-handed use, and ensure smooth animations'
      };
    }

    if (submission.type === 'website') {
      return {
        assessment: 'responsive design essential for modern web',
        readiness: 'needs-attention',
        needsImprovement: true,
        recommendation: 'Implement comprehensive responsive design strategy',
        implementation: 'Design mobile-first, optimize images for different screens, and ensure touch-friendly interactions'
      };
    }

    return {
      assessment: 'mobile considerations apply',
      readiness: 'baseline',
      needsImprovement: false
    };
  }

  private evaluateBasicAccessibility(submission: ProjectSubmission): {
    status: string;
    needsAttention: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('accessibility') || content.includes('inclusive') || content.includes('wcag')) {
      return {
        status: 'accessibility focus identified',
        needsAttention: false
      };
    }

    if (content.includes('public') || content.includes('government') || content.includes('education')) {
      return {
        status: 'accessibility compliance likely required',
        needsAttention: true,
        recommendation: 'Implement comprehensive accessibility features',
        implementation: 'Ensure keyboard navigation, screen reader compatibility, and proper ARIA labels'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        status: 'basic accessibility improvements recommended',
        needsAttention: true,
        recommendation: 'Address fundamental accessibility requirements',
        implementation: 'Implement proper focus management, alt text for images, and logical tab order'
      };
    }

    return {
      status: 'standard accessibility practices apply',
      needsAttention: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('accessibility') && !this.hasAccessibilityExpertInput(collaborativeContext)) {
      uncertainties.push('Accessibility expert should review comprehensive WCAG compliance requirements');
    }

    if (submission.content.includes('technical') || submission.content.includes('performance')) {
      uncertainties.push('Technical implementation advisor should assess UX impact on performance and feasibility');
    }

    if (submission.content.includes('international') || submission.content.includes('global')) {
      uncertainties.push('Cultural context expert should review UX patterns for international markets');
    }

    if (!submission.targetAudience) {
      uncertainties.push('Target audience definition needed for precise UX recommendations');
    }

    if (submission.content.includes('complex') && submission.content.includes('workflow')) {
      uncertainties.push('Advanced user research needed for complex workflow optimization');
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
      submission.content.includes('complex'),
      submission.content.includes('enterprise'),
      submission.content.includes('integration'),
      submission.content.includes('multi-platform'),
      submission.type === 'app',
      !submission.targetAudience
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('backend') ||
           content.includes('database') ||
           content.includes('server') ||
           (content.includes('technical') && !content.includes('ux') && !content.includes('user'));
  }
}