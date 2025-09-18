import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class AccessibilityExpert extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'accessibility', 'wcag', 'inclusive', 'disability', 'screen reader',
        'keyboard', 'contrast', 'alternative', 'assistive', 'compliance'
      ],
      projectTypes: ['website', 'app', 'design'],
      contentTypes: ['digital', 'web', 'mobile', 'interface']
    };

    super('Dr. Alex Johnson', 'Accessibility Expert', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const wcagCompliance = this.assessWCAGCompliance(submission);
    const userImpactAnalysis = this.analyzeUserImpact(submission);
    const implementationFeasibility = this.evaluateImplementationFeasibility(submission);
    const assistiveTechnology = this.assessAssistiveTechnologySupport(submission);
    const legalCompliance = this.evaluateLegalCompliance(submission);

    const insights = [
      `WCAG compliance: ${wcagCompliance.level}`,
      `User impact: ${userImpactAnalysis.impact}`,
      `Implementation feasibility: ${implementationFeasibility.feasibility}`,
      `Assistive technology support: ${assistiveTechnology.support}`,
      `Legal compliance: ${legalCompliance.status}`
    ];

    const recommendations = [];

    if (wcagCompliance.hasViolations) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'WCAG Compliance',
          wcagCompliance.recommendation || 'Address WCAG compliance violations for accessibility standards',
          'WCAG compliance is legally required and ensures equal access for all users',
          wcagCompliance.implementation || 'Fix color contrast, add alt text, implement keyboard navigation, and ensure screen reader compatibility',
          'Legal compliance, expanded user base, and inclusive user experience'
        )
      );
    }

    if (userImpactAnalysis.hasBarriers) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'User Experience Barriers',
          userImpactAnalysis.recommendation || 'Remove accessibility barriers affecting user experience',
          'Accessibility barriers prevent users from completing tasks and accessing information',
          userImpactAnalysis.implementation || 'Improve navigation, simplify interactions, and provide alternative access methods',
          'Improved user task completion and satisfaction for disabled users'
        )
      );
    }

    if (assistiveTechnology.needsOptimization) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Assistive Technology Optimization',
          assistiveTechnology.recommendation || 'Optimize for screen readers and assistive technology compatibility',
          'Assistive technology optimization ensures effective use by disabled users',
          assistiveTechnology.implementation || 'Implement ARIA labels, improve heading structure, and test with screen readers',
          'Effective assistive technology interaction and user independence'
        )
      );
    }

    if (implementationFeasibility.hasComplexity) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Implementation Strategy',
          implementationFeasibility.recommendation || 'Develop phased accessibility implementation plan',
          'Strategic implementation ensures accessibility improvements are sustainable and effective',
          implementationFeasibility.implementation || 'Prioritize high-impact fixes, integrate accessibility into development workflow',
          'Systematic accessibility improvement and reduced implementation complexity'
        )
      );
    }

    if (legalCompliance.hasRisk) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Legal Compliance Risk',
          legalCompliance.recommendation || 'Address legal compliance risks through comprehensive accessibility measures',
          'Accessibility lawsuits are increasing and can result in significant financial and reputational damage',
          legalCompliance.implementation || 'Conduct accessibility audit, implement compliance measures, and establish ongoing monitoring',
          'Reduced legal risk and regulatory compliance'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Accessibility Testing Framework',
        'Establish automated and user testing for ongoing accessibility validation',
        'Regular accessibility testing prevents regression and ensures continuous compliance',
        'Implement automated accessibility testing, conduct user testing with disabled users',
        'Maintained accessibility standards and early issue detection'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Accessibility analysis shows ${wcagCompliance.compliance} WCAG compliance with ${userImpactAnalysis.barriers} user barriers and ${legalCompliance.risk} legal risk`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessWCAGCompliance(submission: ProjectSubmission): {
    level: string;
    compliance: string;
    hasViolations: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('wcag compliant') || content.includes('accessibility compliant')) {
      return {
        level: 'WCAG compliance actively considered',
        compliance: 'compliant',
        hasViolations: false
      };
    }

    if (content.includes('accessibility') || content.includes('inclusive')) {
      if (content.includes('testing') || content.includes('audit')) {
        return {
          level: 'accessibility testing planned with compliance validation',
          compliance: 'validating',
          hasViolations: false
        };
      }
      return {
        level: 'accessibility awareness but compliance needs verification',
        compliance: 'needs-verification',
        hasViolations: true,
        recommendation: 'Conduct WCAG compliance audit and address identified violations',
        implementation: 'Use accessibility testing tools, fix contrast issues, add alt text, ensure keyboard navigation'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        level: 'digital project requiring WCAG compliance assessment',
        compliance: 'unknown',
        hasViolations: true,
        recommendation: 'Implement WCAG 2.1 AA compliance standards',
        implementation: 'Ensure color contrast ratios, keyboard accessibility, screen reader compatibility, and proper heading structure'
      };
    }

    if (content.includes('public') || content.includes('government') || content.includes('education')) {
      return {
        level: 'public-facing project with mandatory accessibility requirements',
        compliance: 'required',
        hasViolations: true,
        recommendation: 'Implement comprehensive WCAG 2.1 AA compliance for public sector requirements',
        implementation: 'Full accessibility audit, remediation plan, and ongoing compliance monitoring'
      };
    }

    return {
      level: 'accessibility considerations recommended',
      compliance: 'baseline',
      hasViolations: false
    };
  }

  private analyzeUserImpact(submission: ProjectSubmission): {
    impact: string;
    barriers: string;
    hasBarriers: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('complex') || content.includes('overwhelming') || content.includes('confusing')) {
      return {
        impact: 'complexity creating barriers for users with cognitive disabilities',
        barriers: 'cognitive',
        hasBarriers: true,
        recommendation: 'Simplify interface and reduce cognitive load for better accessibility',
        implementation: 'Use clear language, logical flow, consistent navigation, and provide help text'
      };
    }

    if (content.includes('visual') || content.includes('image-heavy') || content.includes('graphics')) {
      return {
        impact: 'visual content requiring alternative access methods',
        barriers: 'visual',
        hasBarriers: true,
        recommendation: 'Provide alternative text and non-visual access to visual content',
        implementation: 'Add descriptive alt text, provide text alternatives, ensure content works without images'
      };
    }

    if (content.includes('interactive') || content.includes('dynamic') || content.includes('animation')) {
      return {
        impact: 'interactive elements requiring accessible interaction methods',
        barriers: 'interaction',
        hasBarriers: true,
        recommendation: 'Ensure all interactive elements are accessible via keyboard and assistive technology',
        implementation: 'Implement keyboard navigation, ARIA labels, and provide motion controls'
      };
    }

    if (content.includes('mobile') || submission.type === 'app') {
      return {
        impact: 'mobile interface requiring touch and gesture accessibility',
        barriers: 'mobile',
        hasBarriers: true,
        recommendation: 'Optimize mobile accessibility for touch and assistive technology',
        implementation: 'Ensure adequate touch targets, voice control compatibility, and screen reader optimization'
      };
    }

    return {
      impact: 'standard accessibility considerations for inclusive access',
      barriers: 'minimal',
      hasBarriers: false
    };
  }

  private evaluateImplementationFeasibility(submission: ProjectSubmission): {
    feasibility: string;
    hasComplexity: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('complex') || content.includes('enterprise') || content.includes('large-scale')) {
      return {
        feasibility: 'complex implementation requiring strategic planning',
        hasComplexity: true,
        recommendation: 'Develop phased accessibility implementation strategy',
        implementation: 'Prioritize high-impact accessibility improvements, train development team, integrate into workflow'
      };
    }

    if (content.includes('existing') || content.includes('legacy') || content.includes('retrofit')) {
      return {
        feasibility: 'retrofit implementation with potential challenges',
        hasComplexity: true,
        recommendation: 'Plan accessibility retrofit with priority-based approach',
        implementation: 'Audit existing issues, prioritize by user impact, implement gradual improvements'
      };
    }

    if (content.includes('new') || content.includes('greenfield') || content.includes('from scratch')) {
      return {
        feasibility: 'new development with accessibility-first opportunity',
        hasComplexity: false
      };
    }

    if (content.includes('tight budget') || content.includes('limited resources')) {
      return {
        feasibility: 'resource-constrained implementation requiring efficiency',
        hasComplexity: true,
        recommendation: 'Focus on high-impact, low-cost accessibility improvements',
        implementation: 'Prioritize critical violations, use automated testing, implement basic compliance measures'
      };
    }

    return {
      feasibility: 'standard implementation complexity with manageable requirements',
      hasComplexity: false
    };
  }

  private assessAssistiveTechnologySupport(submission: ProjectSubmission): {
    support: string;
    needsOptimization: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('screen reader') || content.includes('assistive technology')) {
      return {
        support: 'assistive technology compatibility actively considered',
        needsOptimization: false
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        support: 'digital interface requiring assistive technology optimization',
        needsOptimization: true,
        recommendation: 'Optimize for screen readers and assistive technology compatibility',
        implementation: 'Implement proper heading structure, ARIA labels, keyboard navigation, and test with screen readers'
      };
    }

    if (content.includes('forms') || content.includes('input') || content.includes('interactive')) {
      return {
        support: 'interactive elements requiring assistive technology support',
        needsOptimization: true,
        recommendation: 'Ensure form elements and interactions work with assistive technology',
        implementation: 'Add proper labels, error messages, instructions, and test with screen readers'
      };
    }

    if (content.includes('multimedia') || content.includes('video') || content.includes('audio')) {
      return {
        support: 'multimedia content requiring accessibility features',
        needsOptimization: true,
        recommendation: 'Provide captions, transcripts, and audio descriptions for multimedia',
        implementation: 'Add closed captions, provide transcripts, ensure media player accessibility'
      };
    }

    return {
      support: 'basic assistive technology considerations sufficient',
      needsOptimization: false
    };
  }

  private evaluateLegalCompliance(submission: ProjectSubmission): {
    status: string;
    risk: string;
    hasRisk: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('public') || content.includes('government') || content.includes('federal')) {
      return {
        status: 'public sector with mandatory accessibility compliance',
        risk: 'high',
        hasRisk: true,
        recommendation: 'Ensure full Section 508 and ADA compliance for public sector requirements',
        implementation: 'Comprehensive accessibility audit, full WCAG 2.1 AA compliance, ongoing monitoring'
      };
    }

    if (content.includes('commerce') || content.includes('business') || content.includes('customer-facing')) {
      return {
        status: 'commercial entity with ADA compliance requirements',
        risk: 'medium',
        hasRisk: true,
        recommendation: 'Implement ADA compliance measures to reduce lawsuit risk',
        implementation: 'WCAG 2.1 AA compliance, accessibility statement, user testing with disabled users'
      };
    }

    if (content.includes('education') || content.includes('healthcare') || content.includes('finance')) {
      return {
        status: 'regulated industry with specific accessibility requirements',
        risk: 'high',
        hasRisk: true,
        recommendation: 'Research industry-specific accessibility requirements and implement comprehensive compliance',
        implementation: 'Industry-specific accessibility standards, comprehensive testing, legal compliance review'
      };
    }

    if (content.includes('international') || content.includes('global')) {
      return {
        status: 'international scope with multiple jurisdiction requirements',
        risk: 'medium',
        hasRisk: true,
        recommendation: 'Research accessibility laws in target markets and implement appropriate compliance',
        implementation: 'Multi-jurisdiction compliance research, WCAG 2.1 AA as baseline, local adaptations'
      };
    }

    return {
      status: 'standard accessibility practices recommended',
      risk: 'low',
      hasRisk: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('emerging technology') || submission.content.includes('ar') || submission.content.includes('vr')) {
      uncertainties.push('Emerging technology accessibility patterns require specialized research and testing');
    }

    if (submission.content.includes('ai') || submission.content.includes('machine learning')) {
      uncertainties.push('AI interface accessibility is evolving and may require cutting-edge accessibility research');
    }

    if (submission.content.includes('international') && !this.hasCulturalExpertInput(collaborativeContext)) {
      uncertainties.push('Cultural context expert should review international accessibility expectations and practices');
    }

    if (submission.content.includes('industry-specific') || submission.content.includes('specialized')) {
      uncertainties.push('Industry-specific accessibility requirements may need specialized regulatory research');
    }

    if (submission.content.includes('performance') && !this.hasPerformanceExpertInput(collaborativeContext)) {
      uncertainties.push('Performance analyst should assess accessibility feature impact on loading and performance');
    }

    return uncertainties;
  }

  private hasCulturalExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Amara') || analysis.expertRole.includes('Cultural')
    );
  }

  private hasPerformanceExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Maria') || analysis.expertRole.includes('Performance')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('complex'),
      submission.content.includes('enterprise'),
      submission.content.includes('multimedia'),
      submission.content.includes('interactive'),
      submission.content.includes('public'),
      submission.content.includes('international')
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('print only') ||
           content.includes('internal documentation') ||
           (content.includes('design') && content.includes('concept only') && !content.includes('digital'));
  }
}