import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class TechnicalImplementationAdvisor extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'technical', 'implementation', 'development', 'performance', 'api', 'integration',
        'responsive', 'mobile', 'web', 'app', 'backend', 'frontend', 'database'
      ],
      projectTypes: ['website', 'app'],
      contentTypes: ['digital', 'web', 'mobile', 'technical']
    };

    super('Jordan Rivera', 'Technical Implementation Advisor', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const feasibilityAssessment = this.assessTechnicalFeasibility(submission);
    const performanceAnalysis = this.analyzePerformanceRequirements(submission);
    const implementationStrategy = this.evaluateImplementationStrategy(submission);
    const integrationConsiderations = this.assessIntegrationNeeds(submission);
    const securityAndCompliance = this.evaluateSecurityRequirements(submission);

    const insights = [
      `Technical feasibility: ${feasibilityAssessment.assessment}`,
      `Performance requirements: ${performanceAnalysis.requirements}`,
      `Implementation complexity: ${implementationStrategy.complexity}`,
      `Integration needs: ${integrationConsiderations.needs}`,
      `Security considerations: ${securityAndCompliance.level}`
    ];

    const recommendations = [];

    if (feasibilityAssessment.hasConstraints) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Technical Feasibility',
          feasibilityAssessment.recommendation || 'Address technical constraints and implementation challenges',
          'Technical constraints directly impact project timeline, budget, and user experience',
          feasibilityAssessment.implementation || 'Evaluate alternative approaches and optimize technical requirements',
          'Realistic project scope and successful technical delivery'
        )
      );
    }

    if (performanceAnalysis.needsOptimization) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Performance Optimization',
          performanceAnalysis.recommendation || 'Implement performance optimization strategy',
          'Performance directly affects user experience, SEO rankings, and conversion rates',
          performanceAnalysis.implementation || 'Optimize critical rendering path, implement caching, and minimize resource loading',
          'Improved Core Web Vitals, user experience, and search engine visibility'
        )
      );
    }

    if (implementationStrategy.needsPlanning) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Implementation Strategy',
          implementationStrategy.recommendation || 'Develop comprehensive technical implementation plan',
          'Clear implementation strategy reduces development risk and ensures maintainable solutions',
          implementationStrategy.implementation || 'Define technology stack, architecture patterns, and development workflow',
          'Efficient development process and maintainable codebase'
        )
      );
    }

    if (integrationConsiderations.hasComplexity) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'System Integration',
          integrationConsiderations.recommendation || 'Plan and optimize system integrations',
          'Integration complexity affects performance, reliability, and maintenance overhead',
          integrationConsiderations.implementation || 'Design robust APIs, implement error handling, and plan for integration testing',
          'Reliable system performance and reduced integration maintenance'
        )
      );
    }

    if (securityAndCompliance.needsAttention) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Security and Compliance',
          securityAndCompliance.recommendation || 'Implement security best practices and compliance requirements',
          'Security vulnerabilities can compromise user data and business reputation',
          securityAndCompliance.implementation || 'Implement HTTPS, input validation, security headers, and compliance frameworks',
          'Protected user data, regulatory compliance, and reduced security risk'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Technical Documentation',
        'Create comprehensive technical documentation and deployment procedures',
        'Proper documentation ensures maintainability and reduces development overhead',
        'Document architecture decisions, API specifications, and deployment procedures',
        'Improved team efficiency and reduced technical debt'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Technical implementation shows ${implementationStrategy.complexity} complexity with ${performanceAnalysis.optimization} performance requirements and ${feasibilityAssessment.feasibility} feasibility`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessTechnicalFeasibility(submission: ProjectSubmission): {
    assessment: string;
    feasibility: string;
    hasConstraints: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('complex') || content.includes('enterprise') || content.includes('integration')) {
      return {
        assessment: 'high complexity requiring careful technical planning',
        feasibility: 'challenging',
        hasConstraints: true,
        recommendation: 'Break down complexity and plan phased implementation',
        implementation: 'Create technical architecture plan, identify risk areas, and plan incremental delivery'
      };
    }

    if (content.includes('api') || content.includes('database') || content.includes('backend')) {
      return {
        assessment: 'backend integration requirements identified',
        feasibility: 'moderate',
        hasConstraints: true,
        recommendation: 'Plan API architecture and data flow carefully',
        implementation: 'Design RESTful APIs, implement proper error handling, and plan database schema'
      };
    }

    if (content.includes('real-time') || content.includes('live') || content.includes('dynamic')) {
      return {
        assessment: 'real-time features require advanced technical implementation',
        feasibility: 'complex',
        hasConstraints: true,
        recommendation: 'Evaluate real-time technology options and performance impact',
        implementation: 'Consider WebSocket connections, server-sent events, or third-party real-time services'
      };
    }

    if (submission.type === 'app') {
      return {
        assessment: 'mobile app development requires platform-specific considerations',
        feasibility: 'moderate',
        hasConstraints: true,
        recommendation: 'Choose appropriate mobile development approach',
        implementation: 'Evaluate native vs. hybrid vs. PWA based on requirements and resources'
      };
    }

    if (submission.type === 'website' && content.includes('modern')) {
      return {
        assessment: 'modern web development with current best practices',
        feasibility: 'good',
        hasConstraints: false
      };
    }

    return {
      assessment: 'standard technical implementation',
      feasibility: 'straightforward',
      hasConstraints: false
    };
  }

  private analyzePerformanceRequirements(submission: ProjectSubmission): {
    requirements: string;
    optimization: string;
    needsOptimization: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('fast') || content.includes('speed') || content.includes('performance')) {
      return {
        requirements: 'high performance explicitly required',
        optimization: 'critical',
        needsOptimization: true,
        recommendation: 'Implement comprehensive performance optimization strategy',
        implementation: 'Optimize images, implement lazy loading, use CDN, minimize JavaScript bundles'
      };
    }

    if (content.includes('mobile') || submission.type === 'app') {
      return {
        requirements: 'mobile performance optimization essential',
        optimization: 'high',
        needsOptimization: true,
        recommendation: 'Optimize for mobile devices and slower network connections',
        implementation: 'Implement progressive loading, optimize for 3G networks, minimize battery usage'
      };
    }

    if (content.includes('e-commerce') || content.includes('conversion')) {
      return {
        requirements: 'conversion-critical performance optimization',
        optimization: 'high',
        needsOptimization: true,
        recommendation: 'Prioritize Core Web Vitals for conversion optimization',
        implementation: 'Optimize LCP, FID, and CLS; implement performance monitoring and alerting'
      };
    }

    if (submission.type === 'website') {
      return {
        requirements: 'web performance best practices apply',
        optimization: 'standard',
        needsOptimization: true,
        recommendation: 'Implement basic web performance optimizations',
        implementation: 'Optimize images, enable gzip compression, minimize CSS/JS, implement caching'
      };
    }

    return {
      requirements: 'standard performance considerations',
      optimization: 'baseline',
      needsOptimization: false
    };
  }

  private evaluateImplementationStrategy(submission: ProjectSubmission): {
    complexity: string;
    needsPlanning: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('system') || content.includes('platform') || content.includes('enterprise')) {
      return {
        complexity: 'high - enterprise system requirements',
        needsPlanning: true,
        recommendation: 'Develop enterprise-grade architecture and implementation plan',
        implementation: 'Plan microservices architecture, implement proper logging, monitoring, and deployment pipelines'
      };
    }

    if (content.includes('multiple') || content.includes('integration') || content.includes('third-party')) {
      return {
        complexity: 'moderate - multiple system integration',
        needsPlanning: true,
        recommendation: 'Plan integration architecture and data flow',
        implementation: 'Design API contracts, implement error handling, and plan integration testing'
      };
    }

    if (submission.type === 'app') {
      return {
        complexity: 'moderate - mobile app development',
        needsPlanning: true,
        recommendation: 'Plan mobile app architecture and deployment strategy',
        implementation: 'Choose development framework, plan app store deployment, implement analytics'
      };
    }

    if (content.includes('cms') || content.includes('content management')) {
      return {
        complexity: 'moderate - content management requirements',
        needsPlanning: true,
        recommendation: 'Plan content architecture and management workflow',
        implementation: 'Choose appropriate CMS, design content types, plan editorial workflow'
      };
    }

    return {
      complexity: 'low - standard implementation',
      needsPlanning: false
    };
  }

  private assessIntegrationNeeds(submission: ProjectSubmission): {
    needs: string;
    hasComplexity: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('api') || content.includes('integration') || content.includes('third-party')) {
      return {
        needs: 'multiple API and third-party integrations required',
        hasComplexity: true,
        recommendation: 'Plan robust integration architecture',
        implementation: 'Implement API rate limiting, error handling, fallback strategies, and monitoring'
      };
    }

    if (content.includes('payment') || content.includes('e-commerce')) {
      return {
        needs: 'payment processing integration required',
        hasComplexity: true,
        recommendation: 'Implement secure payment processing with compliance',
        implementation: 'Use established payment processors, implement PCI compliance, plan fraud prevention'
      };
    }

    if (content.includes('analytics') || content.includes('tracking')) {
      return {
        needs: 'analytics and tracking integration needed',
        hasComplexity: false,
        recommendation: 'Implement comprehensive analytics strategy',
        implementation: 'Set up Google Analytics, implement conversion tracking, ensure privacy compliance'
      };
    }

    if (content.includes('social') || content.includes('sharing')) {
      return {
        needs: 'social media integration features',
        hasComplexity: false
      };
    }

    return {
      needs: 'minimal integration requirements',
      hasComplexity: false
    };
  }

  private evaluateSecurityRequirements(submission: ProjectSubmission): {
    level: string;
    needsAttention: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('secure') || content.includes('security') || content.includes('data protection')) {
      return {
        level: 'high security requirements identified',
        needsAttention: true,
        recommendation: 'Implement comprehensive security framework',
        implementation: 'Use HTTPS, implement CSP headers, secure authentication, input validation, and security monitoring'
      };
    }

    if (content.includes('login') || content.includes('user') || content.includes('account')) {
      return {
        level: 'user authentication security needed',
        needsAttention: true,
        recommendation: 'Implement secure authentication and authorization',
        implementation: 'Use secure password hashing, implement 2FA options, secure session management'
      };
    }

    if (content.includes('payment') || content.includes('financial')) {
      return {
        level: 'financial data security critical',
        needsAttention: true,
        recommendation: 'Implement financial-grade security measures',
        implementation: 'PCI DSS compliance, encrypted data transmission, secure payment processing'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        level: 'standard web security practices apply',
        needsAttention: true,
        recommendation: 'Implement basic web security measures',
        implementation: 'HTTPS, secure headers, input validation, and regular security updates'
      };
    }

    return {
      level: 'minimal security considerations',
      needsAttention: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('accessibility') && !this.hasAccessibilityExpertInput(collaborativeContext)) {
      uncertainties.push('Accessibility expert should review technical implementation requirements for WCAG compliance');
    }

    if (submission.content.includes('performance') && !this.hasPerformanceExpertInput(collaborativeContext)) {
      uncertainties.push('Performance analyst should provide detailed Core Web Vitals optimization strategy');
    }

    if (submission.content.includes('ai') || submission.content.includes('machine learning')) {
      uncertainties.push('AI/ML integration requires specialized research for current best practices and performance implications');
    }

    if (submission.content.includes('blockchain') || submission.content.includes('crypto')) {
      uncertainties.push('Blockchain integration requires specialized expertise and regulatory compliance research');
    }

    if (!submission.requirements || submission.requirements.length < 50) {
      uncertainties.push('Detailed technical requirements needed for accurate feasibility assessment');
    }

    return uncertainties;
  }

  private hasAccessibilityExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Accessibility') || analysis.expertRole.includes('Accessibility')
    );
  }

  private hasPerformanceExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Performance') || analysis.expertRole.includes('Performance')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('enterprise'),
      submission.content.includes('integration'),
      submission.content.includes('real-time'),
      submission.content.includes('complex'),
      submission.content.includes('api'),
      !submission.requirements
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('print only') ||
           content.includes('offline only') ||
           (content.includes('design') && !content.includes('web') && !content.includes('app') && !content.includes('digital'));
  }
}