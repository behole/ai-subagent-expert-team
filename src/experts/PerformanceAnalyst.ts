import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class PerformanceAnalyst extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'performance', 'speed', 'optimization', 'core web vitals', 'seo',
        'loading', 'fast', 'mobile', 'lighthouse', 'pagespeed', 'caching'
      ],
      projectTypes: ['website', 'app'],
      contentTypes: ['digital', 'web', 'mobile', 'performance']
    };

    super('Maria Santos', 'Performance Analyst', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const coreWebVitals = this.assessCoreWebVitals(submission);
    const performanceImpact = this.analyzePerformanceImpact(submission);
    const optimizationPriorities = this.evaluateOptimizationPriorities(submission);
    const monitoringNeeds = this.assessMonitoringNeeds(submission);
    const seoImpact = this.evaluateSEOImpact(submission);

    const insights = [
      `Core Web Vitals: ${coreWebVitals.status}`,
      `Performance impact: ${performanceImpact.businessImpact}`,
      `Optimization priority: ${optimizationPriorities.priority}`,
      `Monitoring needs: ${monitoringNeeds.requirements}`,
      `SEO impact: ${seoImpact.searchImpact}`
    ];

    const recommendations = [];

    if (coreWebVitals.needsOptimization) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Core Web Vitals Optimization',
          coreWebVitals.recommendation || 'Optimize Core Web Vitals for Google ranking and user experience',
          'Core Web Vitals directly affect Google rankings and user satisfaction metrics',
          coreWebVitals.implementation || 'Optimize images, improve server response times, eliminate render-blocking resources, and stabilize layout',
          'Improved search rankings, better user experience, and increased conversion rates'
        )
      );
    }

    if (performanceImpact.hasBusinessRisk) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Performance Business Impact',
          performanceImpact.recommendation || 'Address performance issues affecting business metrics',
          'Poor performance directly impacts conversion rates, user engagement, and revenue',
          performanceImpact.implementation || 'Prioritize critical user journey optimization, implement performance budgets',
          'Increased conversion rates, reduced bounce rates, and improved user satisfaction'
        )
      );
    }

    if (optimizationPriorities.hasHighImpactOpportunities) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'High-Impact Optimizations',
          optimizationPriorities.recommendation || 'Implement high-impact performance optimizations',
          'Strategic performance improvements provide maximum benefit for development effort',
          optimizationPriorities.implementation || 'Focus on image optimization, code splitting, caching, and critical resource prioritization',
          'Maximum performance improvement with efficient resource allocation'
        )
      );
    }

    if (monitoringNeeds.requiresSetup) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Performance Monitoring',
          monitoringNeeds.recommendation || 'Establish comprehensive performance monitoring and alerting',
          'Performance monitoring prevents regression and enables proactive optimization',
          monitoringNeeds.implementation || 'Set up Real User Monitoring, synthetic testing, and performance budgets with alerting',
          'Prevented performance regression and data-driven optimization decisions'
        )
      );
    }

    if (seoImpact.affectsRankings) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'SEO Performance Optimization',
          seoImpact.recommendation || 'Optimize performance factors affecting search engine rankings',
          'Performance is a significant Google ranking factor affecting organic visibility',
          seoImpact.implementation || 'Improve Core Web Vitals, optimize for mobile-first indexing, and enhance page speed',
          'Improved search engine rankings and organic traffic growth'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Performance Culture',
        'Establish performance-first development culture and processes',
        'Performance culture prevents issues before they impact users and business metrics',
        'Implement performance budgets, automated testing, and team performance training',
        'Sustainable performance excellence and reduced technical debt'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Performance analysis shows ${coreWebVitals.grade} Core Web Vitals with ${performanceImpact.severity} business impact and ${optimizationPriorities.urgency} optimization urgency`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessCoreWebVitals(submission: ProjectSubmission): {
    status: string;
    grade: string;
    needsOptimization: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('core web vitals') || content.includes('lighthouse score')) {
      if (content.includes('good') || content.includes('optimized') || content.includes('fast')) {
        return {
          status: 'Core Web Vitals optimized with good performance metrics',
          grade: 'good',
          needsOptimization: false
        };
      }
      return {
        status: 'Core Web Vitals monitoring in place but optimization needed',
        grade: 'needs-improvement',
        needsOptimization: true,
        recommendation: 'Optimize Core Web Vitals metrics to meet Google thresholds',
        implementation: 'Improve LCP under 2.5s, FID under 100ms, CLS under 0.1 through image optimization and code splitting'
      };
    }

    if (content.includes('slow') || content.includes('performance issues') || content.includes('loading problems')) {
      return {
        status: 'performance issues identified requiring Core Web Vitals optimization',
        grade: 'poor',
        needsOptimization: true,
        recommendation: 'Comprehensive Core Web Vitals optimization to address performance issues',
        implementation: 'Audit with Lighthouse, optimize images, eliminate render-blocking resources, improve server response'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        status: 'digital project requiring Core Web Vitals assessment and optimization',
        grade: 'unknown',
        needsOptimization: true,
        recommendation: 'Establish Core Web Vitals baseline and implement optimization strategy',
        implementation: 'Run Lighthouse audit, measure real user metrics, implement performance improvements'
      };
    }

    if (content.includes('mobile') || content.includes('responsive')) {
      return {
        status: 'mobile performance requiring Core Web Vitals optimization',
        grade: 'mobile-focused',
        needsOptimization: true,
        recommendation: 'Optimize Core Web Vitals for mobile-first performance',
        implementation: 'Prioritize mobile Core Web Vitals, optimize for 3G networks, implement progressive loading'
      };
    }

    return {
      status: 'performance considerations recommended',
      grade: 'baseline',
      needsOptimization: false
    };
  }

  private analyzePerformanceImpact(submission: ProjectSubmission): {
    businessImpact: string;
    severity: string;
    hasBusinessRisk: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('conversion') || content.includes('revenue') || content.includes('business critical')) {
      return {
        businessImpact: 'performance directly affects conversion and revenue metrics',
        severity: 'high',
        hasBusinessRisk: true,
        recommendation: 'Prioritize performance optimization for business-critical user journeys',
        implementation: 'Optimize checkout flows, landing pages, and key conversion paths with performance budgets'
      };
    }

    if (content.includes('e-commerce') || content.includes('shopping') || content.includes('purchase')) {
      return {
        businessImpact: 'e-commerce performance affecting purchase completion and revenue',
        severity: 'high',
        hasBusinessRisk: true,
        recommendation: 'Optimize e-commerce performance for maximum conversion impact',
        implementation: 'Focus on product pages, cart, checkout flow performance with 1-second improvement targets'
      };
    }

    if (content.includes('mobile') || content.includes('mobile-first')) {
      return {
        businessImpact: 'mobile performance affecting majority user experience',
        severity: 'medium',
        hasBusinessRisk: true,
        recommendation: 'Optimize mobile performance as primary user experience',
        implementation: 'Implement mobile-first performance optimization, progressive web app features'
      };
    }

    if (content.includes('seo') || content.includes('search') || content.includes('organic traffic')) {
      return {
        businessImpact: 'performance affecting search engine rankings and organic traffic',
        severity: 'medium',
        hasBusinessRisk: true,
        recommendation: 'Optimize performance for SEO ranking improvements',
        implementation: 'Focus on Core Web Vitals, mobile page speed, and technical SEO performance factors'
      };
    }

    return {
      businessImpact: 'standard performance impact on user experience',
      severity: 'low',
      hasBusinessRisk: false
    };
  }

  private evaluateOptimizationPriorities(submission: ProjectSubmission): {
    priority: string;
    urgency: string;
    hasHighImpactOpportunities: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('image-heavy') || content.includes('media-rich') || content.includes('graphics')) {
      return {
        priority: 'image optimization as primary performance improvement',
        urgency: 'high',
        hasHighImpactOpportunities: true,
        recommendation: 'Implement comprehensive image optimization strategy',
        implementation: 'Use WebP format, responsive images, lazy loading, and CDN optimization'
      };
    }

    if (content.includes('javascript') || content.includes('interactive') || content.includes('dynamic')) {
      return {
        priority: 'JavaScript optimization for improved interactivity',
        urgency: 'high',
        hasHighImpactOpportunities: true,
        recommendation: 'Optimize JavaScript loading and execution for better performance',
        implementation: 'Implement code splitting, lazy loading, and remove unused JavaScript'
      };
    }

    if (content.includes('global') || content.includes('international') || content.includes('worldwide')) {
      return {
        priority: 'global performance optimization with CDN strategy',
        urgency: 'medium',
        hasHighImpactOpportunities: true,
        recommendation: 'Implement global performance strategy with CDN optimization',
        implementation: 'Set up global CDN, optimize for different regions, implement edge caching'
      };
    }

    if (content.includes('complex') || content.includes('enterprise') || content.includes('large-scale')) {
      return {
        priority: 'enterprise performance optimization with systematic approach',
        urgency: 'medium',
        hasHighImpactOpportunities: true,
        recommendation: 'Develop systematic performance optimization strategy for complex system',
        implementation: 'Implement performance budgets, monitoring, and gradual optimization roadmap'
      };
    }

    return {
      priority: 'standard performance optimization opportunities',
      urgency: 'low',
      hasHighImpactOpportunities: false
    };
  }

  private assessMonitoringNeeds(submission: ProjectSubmission): {
    requirements: string;
    requiresSetup: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('monitoring') || content.includes('analytics') || content.includes('measurement')) {
      return {
        requirements: 'performance monitoring framework planned or in place',
        requiresSetup: false
      };
    }

    if (content.includes('business critical') || content.includes('high traffic') || content.includes('enterprise')) {
      return {
        requirements: 'comprehensive performance monitoring required for business-critical system',
        requiresSetup: true,
        recommendation: 'Implement comprehensive Real User Monitoring and synthetic testing',
        implementation: 'Set up RUM, synthetic monitoring, performance budgets, and automated alerting'
      };
    }

    if (submission.type === 'website' || submission.type === 'app') {
      return {
        requirements: 'digital project requiring performance monitoring setup',
        requiresSetup: true,
        recommendation: 'Establish performance monitoring and measurement framework',
        implementation: 'Implement Google Analytics Core Web Vitals, Lighthouse CI, and basic performance tracking'
      };
    }

    if (content.includes('optimization') || content.includes('improvement')) {
      return {
        requirements: 'performance optimization requiring measurement and monitoring',
        requiresSetup: true,
        recommendation: 'Set up monitoring to track optimization progress and prevent regression',
        implementation: 'Implement before/after measurement, ongoing monitoring, and performance regression alerts'
      };
    }

    return {
      requirements: 'basic performance monitoring recommended',
      requiresSetup: false
    };
  }

  private evaluateSEOImpact(submission: ProjectSubmission): {
    searchImpact: string;
    affectsRankings: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('seo') || content.includes('search rankings') || content.includes('organic traffic')) {
      return {
        searchImpact: 'performance optimization critical for SEO and search rankings',
        affectsRankings: true,
        recommendation: 'Optimize performance factors that directly affect search engine rankings',
        implementation: 'Focus on Core Web Vitals, mobile-first performance, and page speed optimization'
      };
    }

    if (content.includes('marketing') || content.includes('traffic') || content.includes('visibility')) {
      return {
        searchImpact: 'performance affecting marketing effectiveness and online visibility',
        affectsRankings: true,
        recommendation: 'Improve performance to support marketing goals and search visibility',
        implementation: 'Optimize landing pages, improve mobile performance, and enhance Core Web Vitals'
      };
    }

    if (submission.type === 'website' && content.includes('business')) {
      return {
        searchImpact: 'business website performance affecting search engine discovery',
        affectsRankings: true,
        recommendation: 'Optimize performance for better search engine rankings and user experience',
        implementation: 'Improve Core Web Vitals, optimize for mobile-first indexing, enhance page speed'
      };
    }

    if (content.includes('content') || content.includes('blog') || content.includes('publishing')) {
      return {
        searchImpact: 'content site performance affecting search engine visibility and user engagement',
        affectsRankings: true,
        recommendation: 'Optimize content delivery performance for SEO and user experience',
        implementation: 'Implement fast content loading, optimize images, and improve Core Web Vitals'
      };
    }

    return {
      searchImpact: 'minimal direct SEO impact from performance',
      affectsRankings: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('backend') || submission.content.includes('server-side')) {
      uncertainties.push('Technical implementation advisor should assess server-side performance optimization opportunities');
    }

    if (submission.content.includes('accessibility') && !this.hasAccessibilityExpertInput(collaborativeContext)) {
      uncertainties.push('Accessibility expert should review performance optimization impact on assistive technology');
    }

    if (submission.content.includes('international') && !this.hasCulturalExpertInput(collaborativeContext)) {
      uncertainties.push('Cultural context expert should provide insights on international performance expectations');
    }

    if (submission.content.includes('native app') || submission.content.includes('ios') || submission.content.includes('android')) {
      uncertainties.push('Native app performance optimization requires platform-specific expertise beyond web performance');
    }

    if (submission.content.includes('emerging technology') || submission.content.includes('cutting-edge')) {
      uncertainties.push('Emerging technology performance patterns may require specialized research and testing');
    }

    return uncertainties;
  }

  private hasAccessibilityExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Alex Johnson') || analysis.expertRole.includes('Accessibility')
    );
  }

  private hasCulturalExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Amara') || analysis.expertRole.includes('Cultural')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('enterprise'),
      submission.content.includes('global'),
      submission.content.includes('high traffic'),
      submission.content.includes('complex'),
      submission.content.includes('real-time'),
      submission.content.includes('media-rich')
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('print only') ||
           content.includes('offline only') ||
           (content.includes('design') && content.includes('concept only') && !content.includes('digital'));
  }
}