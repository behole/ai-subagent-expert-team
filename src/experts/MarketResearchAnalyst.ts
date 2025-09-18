import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class MarketResearchAnalyst extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'market', 'audience', 'research', 'competitive', 'consumer', 'customer',
        'target', 'demographic', 'survey', 'analytics', 'behavior', 'segment'
      ],
      projectTypes: ['marketing', 'brand', 'website', 'app'],
      contentTypes: ['market', 'research', 'audience', 'competitive']
    };

    super('Lisa Park', 'Market Research Analyst', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const audienceResearch = this.assessAudienceResearch(submission);
    const competitiveAnalysis = this.analyzeCompetitiveLandscape(submission);
    const marketValidation = this.evaluateMarketValidation(submission);
    const trendAnalysis = this.analyzeTrends(submission);
    const researchNeeds = this.identifyResearchNeeds(submission);

    const insights = [
      `Audience research: ${audienceResearch.clarity}`,
      `Competitive landscape: ${competitiveAnalysis.landscape}`,
      `Market validation: ${marketValidation.validation}`,
      `Trend analysis: ${trendAnalysis.trends}`,
      `Research needs: ${researchNeeds.priority}`
    ];

    const recommendations = [];

    if (audienceResearch.needsResearch) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Audience Research',
          audienceResearch.recommendation || 'Conduct comprehensive audience research and segmentation',
          'Understanding target audience is fundamental to effective marketing and product development',
          audienceResearch.implementation || 'Design and execute audience research study with surveys, interviews, and behavioral analysis',
          'Clear audience targeting and improved marketing effectiveness'
        )
      );
    }

    if (competitiveAnalysis.hasGaps) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Competitive Intelligence',
          competitiveAnalysis.recommendation || 'Develop comprehensive competitive analysis and positioning strategy',
          'Competitive intelligence enables strategic positioning and identifies market opportunities',
          competitiveAnalysis.implementation || 'Map competitive landscape, analyze positioning, and identify white space opportunities',
          'Strategic competitive advantage and market positioning'
        )
      );
    }

    if (marketValidation.needsValidation) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Market Validation',
          marketValidation.recommendation || 'Validate market demand and concept viability',
          'Market validation reduces risk and ensures product-market fit',
          marketValidation.implementation || 'Test concepts with target audience, measure demand signals, and validate pricing',
          'Reduced market risk and validated product-market fit'
        )
      );
    }

    if (trendAnalysis.hasOpportunities) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Trend Analysis',
          trendAnalysis.recommendation || 'Leverage identified market trends for strategic advantage',
          'Early trend identification enables first-mover advantage and strategic positioning',
          trendAnalysis.implementation || 'Monitor trend developments, assess implications, and develop trend-based strategies',
          'First-mover advantage and trend-driven growth opportunities'
        )
      );
    }

    if (researchNeeds.hasDataGaps) {
      recommendations.push(
        this.createRecommendation(
          'low',
          'Research Framework',
          researchNeeds.recommendation || 'Establish ongoing market research and intelligence framework',
          'Continuous market intelligence enables data-driven decision making and competitive advantage',
          researchNeeds.implementation || 'Set up analytics tracking, establish research cadence, and create insight reporting',
          'Data-driven decision making and continuous market intelligence'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Performance Measurement',
        'Implement market performance tracking and brand health metrics',
        'Market measurement enables optimization and demonstrates business impact',
        'Set up brand tracking, market share monitoring, and customer satisfaction measurement',
        'Measurable market performance and optimization insights'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Market analysis shows ${audienceResearch.definition} audience definition with ${competitiveAnalysis.position} competitive position and ${marketValidation.strength} market validation`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessAudienceResearch(submission: ProjectSubmission): {
    clarity: string;
    definition: string;
    needsResearch: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (!submission.targetAudience || submission.targetAudience.length < 20) {
      return {
        clarity: 'undefined target audience requiring comprehensive research',
        definition: 'undefined',
        needsResearch: true,
        recommendation: 'Define target audience through primary research and segmentation',
        implementation: 'Conduct audience surveys, interviews, and behavioral analysis to create detailed personas'
      };
    }

    if (content.includes('audience research') || content.includes('customer research')) {
      if (content.includes('comprehensive') || content.includes('detailed')) {
        return {
          clarity: 'comprehensive audience research planned or completed',
          definition: 'well-defined',
          needsResearch: false
        };
      }
      return {
        clarity: 'audience research initiated but needs depth',
        definition: 'developing',
        needsResearch: true,
        recommendation: 'Expand audience research for deeper behavioral insights',
        implementation: 'Add qualitative interviews, behavioral tracking, and psychographic analysis'
      };
    }

    if (submission.targetAudience.includes('broad') || submission.targetAudience.includes('everyone')) {
      return {
        clarity: 'overly broad audience definition requiring segmentation',
        definition: 'too-broad',
        needsResearch: true,
        recommendation: 'Segment broad audience into actionable target groups',
        implementation: 'Conduct segmentation research to identify distinct audience clusters and priorities'
      };
    }

    if (content.includes('demographic') || content.includes('age') || content.includes('income')) {
      return {
        clarity: 'demographic information available but behavioral insights needed',
        definition: 'basic',
        needsResearch: true,
        recommendation: 'Expand beyond demographics to behavioral and psychographic insights',
        implementation: 'Research motivations, decision-making patterns, and usage behaviors'
      };
    }

    return {
      clarity: 'basic audience definition with research potential',
      definition: 'baseline',
      needsResearch: true,
      recommendation: 'Conduct audience research to validate and expand understanding',
      implementation: 'Design research study to validate assumptions and uncover deeper insights'
    };
  }

  private analyzeCompetitiveLandscape(submission: ProjectSubmission): {
    landscape: string;
    position: string;
    hasGaps: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('competitive analysis') || content.includes('competitor research')) {
      if (content.includes('comprehensive') || content.includes('detailed')) {
        return {
          landscape: 'competitive analysis completed with strategic insights',
          position: 'informed',
          hasGaps: false
        };
      }
      return {
        landscape: 'basic competitive analysis needs strategic depth',
        position: 'developing',
        hasGaps: true,
        recommendation: 'Expand competitive analysis for strategic positioning insights',
        implementation: 'Analyze competitor positioning, pricing, messaging, and customer feedback'
      };
    }

    if (content.includes('competitive') || content.includes('competitors')) {
      return {
        landscape: 'competitive awareness present but analysis needed',
        position: 'aware',
        hasGaps: true,
        recommendation: 'Conduct systematic competitive analysis and positioning study',
        implementation: 'Map competitive landscape, analyze strengths/weaknesses, and identify opportunities'
      };
    }

    if (content.includes('market leader') || content.includes('first to market')) {
      return {
        landscape: 'market leadership position with competitive monitoring needed',
        position: 'leading',
        hasGaps: true,
        recommendation: 'Monitor competitive responses and protect market position',
        implementation: 'Establish competitive intelligence monitoring and response planning'
      };
    }

    if (content.includes('crowded market') || content.includes('saturated')) {
      return {
        landscape: 'highly competitive market requiring differentiation strategy',
        position: 'challenging',
        hasGaps: true,
        recommendation: 'Develop competitive differentiation strategy based on market gaps',
        implementation: 'Identify underserved segments and develop unique positioning strategy'
      };
    }

    return {
      landscape: 'competitive landscape analysis needed for strategic positioning',
      position: 'undefined',
      hasGaps: true,
      recommendation: 'Conduct competitive landscape analysis and positioning research',
      implementation: 'Map competitors, analyze positioning, and identify strategic opportunities'
    };
  }

  private evaluateMarketValidation(submission: ProjectSubmission): {
    validation: string;
    strength: string;
    needsValidation: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('market validation') || content.includes('concept testing')) {
      return {
        validation: 'market validation planned or in progress',
        strength: 'validated',
        needsValidation: false
      };
    }

    if (content.includes('proven demand') || content.includes('validated concept')) {
      return {
        validation: 'market demand validated through research',
        strength: 'strong',
        needsValidation: false
      };
    }

    if (content.includes('new market') || content.includes('innovative') || content.includes('first-time')) {
      return {
        validation: 'new market concept requiring validation research',
        strength: 'unvalidated',
        needsValidation: true,
        recommendation: 'Validate market demand and concept viability with target audience',
        implementation: 'Test concept with potential customers, measure intent, and validate pricing acceptance'
      };
    }

    if (content.includes('assumption') || content.includes('believe') || content.includes('think')) {
      return {
        validation: 'market assumptions present requiring validation',
        strength: 'assumed',
        needsValidation: true,
        recommendation: 'Test market assumptions with primary research',
        implementation: 'Design experiments to validate key assumptions about demand and behavior'
      };
    }

    if (submission.type === 'brand' || submission.type === 'marketing') {
      return {
        validation: 'marketing concept requiring audience validation',
        strength: 'needs-testing',
        needsValidation: true,
        recommendation: 'Test marketing concepts and messaging with target audience',
        implementation: 'Conduct message testing, concept evaluation, and audience response measurement'
      };
    }

    return {
      validation: 'market validation recommended for concept optimization',
      strength: 'baseline',
      needsValidation: false
    };
  }

  private analyzeTrends(submission: ProjectSubmission): {
    trends: string;
    hasOpportunities: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('trend') || content.includes('emerging') || content.includes('future')) {
      return {
        trends: 'trend awareness with strategic opportunity potential',
        hasOpportunities: true,
        recommendation: 'Research and leverage relevant market trends for competitive advantage',
        implementation: 'Analyze trend implications, assess applicability, and develop trend-based strategies'
      };
    }

    if (content.includes('innovative') || content.includes('cutting-edge') || content.includes('next-generation')) {
      return {
        trends: 'innovation focus aligning with market trends',
        hasOpportunities: true,
        recommendation: 'Position innovation within broader market trend context',
        implementation: 'Research innovation trends, validate market readiness, and develop trend narratives'
      };
    }

    if (content.includes('traditional') || content.includes('established') || content.includes('classic')) {
      return {
        trends: 'traditional approach with trend modernization opportunity',
        hasOpportunities: true,
        recommendation: 'Explore how market trends can modernize traditional approaches',
        implementation: 'Research trend adaptations for traditional markets and evaluate modernization opportunities'
      };
    }

    if (content.includes('young') || content.includes('millennial') || content.includes('gen z')) {
      return {
        trends: 'younger demographic alignment with cultural trends',
        hasOpportunities: true,
        recommendation: 'Research generational trends and cultural shifts affecting target audience',
        implementation: 'Monitor social media trends, generational values, and cultural movements'
      };
    }

    return {
      trends: 'standard market dynamics with trend monitoring recommended',
      hasOpportunities: false
    };
  }

  private identifyResearchNeeds(submission: ProjectSubmission): {
    priority: string;
    hasDataGaps: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();
    const dataGaps = [
      !submission.targetAudience,
      !content.includes('research'),
      !content.includes('data'),
      !content.includes('analytics'),
      !content.includes('measurement')
    ];

    const gapCount = dataGaps.filter(Boolean).length;

    if (gapCount >= 4) {
      return {
        priority: 'high - comprehensive research framework needed',
        hasDataGaps: true,
        recommendation: 'Establish comprehensive market research and analytics framework',
        implementation: 'Set up audience research, competitive monitoring, and performance measurement systems'
      };
    }

    if (gapCount >= 2) {
      return {
        priority: 'medium - targeted research needs identified',
        hasDataGaps: true,
        recommendation: 'Address specific research gaps for better decision making',
        implementation: 'Focus research on key data gaps and establish basic measurement framework'
      };
    }

    return {
      priority: 'low - basic research considerations',
      hasDataGaps: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('international') && !this.hasCulturalExpertInput(collaborativeContext)) {
      uncertainties.push('Cultural context expert should provide international market insights and cultural considerations');
    }

    if (submission.content.includes('technical') || submission.content.includes('platform')) {
      uncertainties.push('Technical implementation advisor should assess research tool requirements and analytics setup');
    }

    if (submission.content.includes('brand') && !this.hasBrandExpertInput(collaborativeContext)) {
      uncertainties.push('Brand strategy analyst should provide brand positioning insights to guide research priorities');
    }

    if (submission.content.includes('specialized industry') || submission.content.includes('niche market')) {
      uncertainties.push('Industry-specific research expertise needed for specialized market analysis');
    }

    if (submission.content.includes('b2b') || submission.content.includes('enterprise')) {
      uncertainties.push('B2B research methodologies differ from consumer research and may require specialized approach');
    }

    return uncertainties;
  }

  private hasCulturalExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Amara') || analysis.expertRole.includes('Cultural')
    );
  }

  private hasBrandExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Sarah') || analysis.expertRole.includes('Brand')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      !submission.targetAudience,
      submission.content.includes('international'),
      submission.content.includes('competitive'),
      submission.content.includes('new market'),
      submission.content.includes('complex'),
      submission.content.includes('enterprise')
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('technical only') ||
           content.includes('internal only') ||
           (content.includes('design') && !content.includes('audience') && !content.includes('market'));
  }
}