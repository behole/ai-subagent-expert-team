import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class BrandStrategyAnalyst extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'brand', 'branding', 'positioning', 'strategy', 'competitive', 'market',
        'identity', 'differentiation', 'value proposition', 'messaging', 'audience'
      ],
      projectTypes: ['brand', 'marketing', 'website'],
      contentTypes: ['brand', 'marketing', 'strategy']
    };

    super('Sarah Kim', 'Brand Strategy Analyst', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const brandPositioning = this.assessBrandPositioning(submission);
    const competitiveAnalysis = this.analyzeCompetitiveContext(submission);
    const brandArchitecture = this.evaluateBrandArchitecture(submission);
    const marketOpportunity = this.assessMarketOpportunity(submission);
    const brandEquity = this.evaluateBrandEquityPotential(submission);

    const insights = [
      `Brand positioning: ${brandPositioning.position}`,
      `Competitive context: ${competitiveAnalysis.context}`,
      `Brand architecture: ${brandArchitecture.structure}`,
      `Market opportunity: ${marketOpportunity.opportunity}`,
      `Brand equity potential: ${brandEquity.potential}`
    ];

    const recommendations = [];

    if (brandPositioning.needsDevelopment) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Brand Positioning',
          brandPositioning.recommendation || 'Develop clear, differentiated brand positioning strategy',
          'Strong positioning is fundamental to all other brand and marketing decisions',
          brandPositioning.implementation || 'Conduct positioning workshops, competitive analysis, and stakeholder alignment sessions',
          'Clear strategic direction and competitive differentiation'
        )
      );
    }

    if (competitiveAnalysis.hasThreats) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Competitive Strategy',
          competitiveAnalysis.recommendation || 'Develop competitive differentiation and defense strategy',
          'Competitive threats can erode market position and brand value',
          competitiveAnalysis.implementation || 'Map competitive landscape, identify white space opportunities, and develop defensive strategies',
          'Sustainable competitive advantage and market position protection'
        )
      );
    }

    if (brandArchitecture.needsStructure) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Brand Architecture',
          brandArchitecture.recommendation || 'Design scalable brand architecture and system',
          'Clear brand architecture enables growth and prevents brand confusion',
          brandArchitecture.implementation || 'Define brand hierarchy, naming conventions, and relationship structures',
          'Scalable brand system and reduced brand management complexity'
        )
      );
    }

    if (marketOpportunity.hasGrowthPotential) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Market Opportunity',
          marketOpportunity.recommendation || 'Develop strategy to capture identified market opportunities',
          'Market opportunities provide growth potential and competitive advantage',
          marketOpportunity.implementation || 'Create market entry strategy, audience targeting, and growth roadmap',
          'Accelerated growth and market share expansion'
        )
      );
    }

    if (brandEquity.needsInvestment) {
      recommendations.push(
        this.createRecommendation(
          'low',
          'Brand Equity Building',
          brandEquity.recommendation || 'Develop long-term brand equity building strategy',
          'Brand equity drives pricing power, customer loyalty, and business value',
          brandEquity.implementation || 'Create brand measurement framework, invest in consistent brand experiences',
          'Increased brand value and customer lifetime value'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Brand Performance Measurement',
        'Establish brand health metrics and tracking system',
        'Brand measurement enables optimization and demonstrates marketing ROI',
        'Implement brand tracking surveys, awareness metrics, and perception studies',
        'Data-driven brand optimization and strategic decision making'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Brand strategy shows ${brandPositioning.clarity} positioning with ${competitiveAnalysis.advantage} competitive advantage and ${marketOpportunity.growth} growth potential`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessBrandPositioning(submission: ProjectSubmission): {
    position: string;
    clarity: string;
    needsDevelopment: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('positioning') || content.includes('differentiation')) {
      if (content.includes('unclear') || content.includes('confused') || content.includes('similar')) {
        return {
          position: 'positioning requires clarification and differentiation',
          clarity: 'unclear',
          needsDevelopment: true,
          recommendation: 'Develop distinctive brand positioning that differentiates from competitors',
          implementation: 'Conduct positioning exercises, define unique value proposition, and test with target audience'
        };
      }
      if (content.includes('strong') || content.includes('clear') || content.includes('unique')) {
        return {
          position: 'strong positioning foundation identified',
          clarity: 'clear',
          needsDevelopment: false
        };
      }
      return {
        position: 'positioning development in progress',
        clarity: 'developing',
        needsDevelopment: true,
        recommendation: 'Refine and strengthen brand positioning strategy',
        implementation: 'Test positioning concepts, validate differentiation, and align stakeholders'
      };
    }

    if (submission.type === 'brand' || content.includes('brand strategy')) {
      return {
        position: 'brand positioning strategy needed',
        clarity: 'undefined',
        needsDevelopment: true,
        recommendation: 'Develop comprehensive brand positioning framework',
        implementation: 'Create positioning statement, define target audience, and establish competitive differentiation'
      };
    }

    if (content.includes('competitive') || content.includes('market')) {
      return {
        position: 'market-driven positioning approach needed',
        clarity: 'market-focused',
        needsDevelopment: true,
        recommendation: 'Position brand based on competitive analysis and market opportunities',
        implementation: 'Map competitive landscape, identify white space, and position in uncontested territory'
      };
    }

    return {
      position: 'positioning considerations apply',
      clarity: 'baseline',
      needsDevelopment: false
    };
  }

  private analyzeCompetitiveContext(submission: ProjectSubmission): {
    context: string;
    advantage: string;
    hasThreats: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('competitive') || content.includes('competitors') || content.includes('competition')) {
      if (content.includes('crowded') || content.includes('saturated') || content.includes('intense')) {
        return {
          context: 'highly competitive market requiring strategic differentiation',
          advantage: 'challenging',
          hasThreats: true,
          recommendation: 'Develop blue ocean strategy to escape competitive pressures',
          implementation: 'Identify uncontested market space, create new demand, and build category leadership'
        };
      }
      if (content.includes('advantage') || content.includes('leading') || content.includes('differentiated')) {
        return {
          context: 'competitive advantage position identified',
          advantage: 'strong',
          hasThreats: false
        };
      }
      return {
        context: 'competitive analysis and strategy needed',
        advantage: 'developing',
        hasThreats: true,
        recommendation: 'Conduct comprehensive competitive analysis and develop differentiation strategy',
        implementation: 'Map competitor positions, identify strengths/weaknesses, and develop competitive response plan'
      };
    }

    if (content.includes('market leader') || content.includes('innovative') || content.includes('disruptive')) {
      return {
        context: 'market leadership or innovation positioning',
        advantage: 'strong',
        hasThreats: false
      };
    }

    if (content.includes('new market') || content.includes('emerging') || content.includes('startup')) {
      return {
        context: 'emerging market with category creation opportunity',
        advantage: 'opportunity',
        hasThreats: false,
        recommendation: 'Consider category creation and thought leadership strategy',
        implementation: 'Define new market category, establish thought leadership, and educate market'
      };
    }

    return {
      context: 'standard competitive considerations',
      advantage: 'baseline',
      hasThreats: false
    };
  }

  private evaluateBrandArchitecture(submission: ProjectSubmission): {
    structure: string;
    needsStructure: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('product line') || content.includes('multiple products') || content.includes('portfolio')) {
      return {
        structure: 'multi-product brand architecture needed',
        needsStructure: true,
        recommendation: 'Design brand architecture for product portfolio management',
        implementation: 'Define master brand strategy, sub-brand relationships, and naming conventions'
      };
    }

    if (content.includes('expansion') || content.includes('growth') || content.includes('new market')) {
      return {
        structure: 'scalable brand architecture for growth',
        needsStructure: true,
        recommendation: 'Create flexible brand system that supports expansion',
        implementation: 'Design extensible brand framework with clear guidelines for new offerings'
      };
    }

    if (content.includes('complex') || content.includes('enterprise') || content.includes('b2b')) {
      return {
        structure: 'enterprise brand architecture considerations',
        needsStructure: true,
        recommendation: 'Develop B2B-focused brand architecture with stakeholder clarity',
        implementation: 'Create clear brand hierarchy for complex buying processes and multiple touchpoints'
      };
    }

    if (submission.type === 'brand') {
      return {
        structure: 'foundational brand architecture needed',
        needsStructure: true,
        recommendation: 'Establish core brand architecture and system',
        implementation: 'Define brand elements, relationships, and application guidelines'
      };
    }

    return {
      structure: 'simple brand structure sufficient',
      needsStructure: false
    };
  }

  private assessMarketOpportunity(submission: ProjectSubmission): {
    opportunity: string;
    growth: string;
    hasGrowthPotential: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('growth') || content.includes('opportunity') || content.includes('expansion')) {
      return {
        opportunity: 'significant growth opportunities identified',
        growth: 'high',
        hasGrowthPotential: true,
        recommendation: 'Develop market expansion and growth strategy',
        implementation: 'Prioritize opportunities, create market entry plans, and allocate brand investment'
      };
    }

    if (content.includes('emerging') || content.includes('new market') || content.includes('untapped')) {
      return {
        opportunity: 'emerging market opportunity for category leadership',
        growth: 'emerging',
        hasGrowthPotential: true,
        recommendation: 'Position for thought leadership in emerging category',
        implementation: 'Create educational content, establish expertise, and shape market perception'
      };
    }

    if (content.includes('niche') || content.includes('specialized') || content.includes('targeted')) {
      return {
        opportunity: 'niche market specialization opportunity',
        growth: 'focused',
        hasGrowthPotential: true,
        recommendation: 'Develop deep expertise and dominance in niche market',
        implementation: 'Focus resources on niche excellence and become the category expert'
      };
    }

    if (content.includes('international') || content.includes('global')) {
      return {
        opportunity: 'international expansion potential',
        growth: 'geographic',
        hasGrowthPotential: true,
        recommendation: 'Assess global market opportunities and localization needs',
        implementation: 'Research international markets, adapt brand for local relevance, plan market entry'
      };
    }

    return {
      opportunity: 'standard market dynamics',
      growth: 'stable',
      hasGrowthPotential: false
    };
  }

  private evaluateBrandEquityPotential(submission: ProjectSubmission): {
    potential: string;
    needsInvestment: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('premium') || content.includes('luxury') || content.includes('high-end')) {
      return {
        potential: 'premium brand equity development opportunity',
        needsInvestment: true,
        recommendation: 'Invest in premium brand positioning and experiences',
        implementation: 'Focus on quality perception, exclusive experiences, and premium touchpoints'
      };
    }

    if (content.includes('trusted') || content.includes('reliable') || content.includes('established')) {
      return {
        potential: 'trust-based brand equity foundation',
        needsInvestment: false
      };
    }

    if (content.includes('innovative') || content.includes('cutting-edge') || content.includes('disruptive')) {
      return {
        potential: 'innovation-driven brand equity potential',
        needsInvestment: true,
        recommendation: 'Build brand equity through innovation leadership',
        implementation: 'Demonstrate thought leadership, showcase innovation, and lead market trends'
      };
    }

    if (submission.type === 'brand' || content.includes('long-term')) {
      return {
        potential: 'foundational brand equity building needed',
        needsInvestment: true,
        recommendation: 'Establish brand equity measurement and building framework',
        implementation: 'Create consistent brand experiences, measure brand health, and invest in brand building'
      };
    }

    return {
      potential: 'standard brand value considerations',
      needsInvestment: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('cultural') || submission.content.includes('international')) {
      uncertainties.push('Cultural context expert should review brand strategy for international market appropriateness');
    }

    if (submission.content.includes('consumer research') || submission.content.includes('audience data')) {
      uncertainties.push('Market research analyst should provide detailed consumer insights and behavior data');
    }

    if (submission.content.includes('technical') || submission.content.includes('implementation costs')) {
      uncertainties.push('Technical implementation advisor should assess feasibility and costs of brand strategy execution');
    }

    if (!submission.targetAudience) {
      uncertainties.push('Target audience definition critical for brand positioning and strategy development');
    }

    if (submission.content.includes('regulatory') || submission.content.includes('compliance')) {
      uncertainties.push('Industry-specific regulatory constraints need research for brand strategy compliance');
    }

    return uncertainties;
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('portfolio'),
      submission.content.includes('international'),
      submission.content.includes('competitive'),
      submission.content.includes('enterprise'),
      submission.content.includes('complex'),
      !submission.targetAudience
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('technical only') ||
           content.includes('development only') ||
           (content.includes('design') && !content.includes('brand') && !content.includes('strategy'));
  }
}