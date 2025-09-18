import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class ArtHistoryAnalyst extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'art', 'artistic', 'heritage', 'historical', 'cultural', 'traditional',
        'classic', 'vintage', 'retro', 'movement', 'style', 'reference', 'influence'
      ],
      projectTypes: ['brand', 'design', 'marketing'],
      contentTypes: ['visual', 'cultural', 'artistic', 'heritage']
    };

    super('Dr. Elena Vasquez', 'Art History Analyst', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const historicalReferences = this.identifyHistoricalReferences(submission);
    const culturalContext = this.analyzeCulturalContext(submission);
    const visualSemiotics = this.assessVisualSemiotics(submission);
    const appropriationRisk = this.evaluateAppropriationRisk(submission);
    const heritageOpportunity = this.assessHeritageOpportunity(submission);

    const insights = [
      `Historical references: ${historicalReferences.identification}`,
      `Cultural context: ${culturalContext.significance}`,
      `Visual semiotics: ${visualSemiotics.meaning}`,
      `Appropriation risk: ${appropriationRisk.level}`,
      `Heritage opportunity: ${heritageOpportunity.potential}`
    ];

    const recommendations = [];

    if (historicalReferences.needsResearch) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Historical Research',
          historicalReferences.recommendation || 'Research and validate historical references for accuracy and appropriateness',
          'Accurate historical context enhances authenticity and prevents cultural missteps',
          historicalReferences.implementation || 'Conduct art historical research and validate references with cultural experts',
          'Authentic cultural storytelling and reduced risk of historical inaccuracy'
        )
      );
    }

    if (appropriationRisk.needsAttention) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Cultural Appropriation Prevention',
          appropriationRisk.recommendation || 'Address potential cultural appropriation concerns',
          'Cultural appropriation can damage brand reputation and alienate communities',
          appropriationRisk.implementation || 'Consult cultural experts, modify problematic elements, and ensure respectful representation',
          'Culturally respectful brand image and community trust'
        )
      );
    }

    if (culturalContext.hasDepth) {
      recommendations.push(
        this.createRecommendation(
          'low',
          'Cultural Storytelling',
          culturalContext.recommendation || 'Leverage cultural depth for authentic brand storytelling',
          'Rich cultural context creates emotional connection and brand differentiation',
          culturalContext.implementation || 'Develop narrative content that honors and explains cultural heritage',
          'Deeper audience connection and brand authenticity'
        )
      );
    }

    if (visualSemiotics.hasSymbolism) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Visual Symbolism',
          visualSemiotics.recommendation || 'Optimize visual symbolism for intended cultural communication',
          'Visual symbols carry cultural meanings that affect brand perception',
          visualSemiotics.implementation || 'Ensure symbolic elements align with brand message and cultural sensitivity',
          'Clear cultural communication and avoided symbolic misunderstandings'
        )
      );
    }

    if (heritageOpportunity.canDevelop) {
      recommendations.push(
        this.createRecommendation(
          'low',
          'Heritage Development',
          heritageOpportunity.recommendation || 'Develop brand heritage narrative based on cultural foundations',
          'Brand heritage creates emotional depth and competitive differentiation',
          heritageOpportunity.implementation || 'Research cultural connections, develop heritage story, and integrate into brand narrative',
          'Distinctive brand positioning and emotional audience connection'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Cultural Education',
        'Create educational content that shares cultural context and artistic influences',
        'Educational approach builds brand authority and audience appreciation',
        'Develop content that explains artistic choices and cultural significance',
        'Brand thought leadership and deeper cultural engagement'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Cultural analysis reveals ${historicalReferences.richness} historical context with ${appropriationRisk.level} appropriation risk and ${heritageOpportunity.strength} heritage potential`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private identifyHistoricalReferences(submission: ProjectSubmission): {
    identification: string;
    richness: string;
    needsResearch: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('classical') || content.includes('renaissance') || content.includes('baroque')) {
      return {
        identification: 'classical European art movement references detected',
        richness: 'high',
        needsResearch: true,
        recommendation: 'Research specific classical references to ensure accurate representation',
        implementation: 'Study period-appropriate elements, validate historical accuracy, and maintain stylistic integrity'
      };
    }

    if (content.includes('modern') || content.includes('bauhaus') || content.includes('art deco')) {
      return {
        identification: 'modernist design movement influences identified',
        richness: 'moderate',
        needsResearch: true,
        recommendation: 'Explore modernist principles and ensure authentic application',
        implementation: 'Reference key modernist works, apply movement principles authentically'
      };
    }

    if (content.includes('vintage') || content.includes('retro') || content.includes('nostalgic')) {
      return {
        identification: 'nostalgic period references with potential cultural significance',
        richness: 'moderate',
        needsResearch: true,
        recommendation: 'Identify specific historical periods and validate cultural appropriateness',
        implementation: 'Research target historical periods, ensure respectful interpretation'
      };
    }

    if (content.includes('traditional') || content.includes('folk') || content.includes('heritage')) {
      return {
        identification: 'traditional cultural heritage elements present',
        richness: 'high',
        needsResearch: true,
        recommendation: 'Thoroughly research cultural traditions to ensure respectful representation',
        implementation: 'Consult cultural experts, validate traditional elements, ensure authentic usage'
      };
    }

    if (content.includes('contemporary') || content.includes('modern art')) {
      return {
        identification: 'contemporary art influences identified',
        richness: 'developing',
        needsResearch: false
      };
    }

    return {
      identification: 'minimal historical art references detected',
      richness: 'low',
      needsResearch: false
    };
  }

  private analyzeCulturalContext(submission: ProjectSubmission): {
    significance: string;
    hasDepth: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('cultural') || content.includes('heritage') || content.includes('tradition')) {
      return {
        significance: 'strong cultural context with storytelling potential',
        hasDepth: true,
        recommendation: 'Develop authentic cultural narrative that honors heritage',
        implementation: 'Research cultural background, create respectful storytelling, validate with community'
      };
    }

    if (content.includes('international') || content.includes('global') || content.includes('multicultural')) {
      return {
        significance: 'cross-cultural context requiring sensitivity',
        hasDepth: true,
        recommendation: 'Navigate cross-cultural elements with appropriate research and sensitivity',
        implementation: 'Study multiple cultural perspectives, ensure inclusive representation'
      };
    }

    if (content.includes('artistic') || content.includes('creative') || content.includes('expressive')) {
      return {
        significance: 'artistic expression with cultural resonance',
        hasDepth: true,
        recommendation: 'Connect artistic choices to broader cultural movements',
        implementation: 'Research artistic traditions, place work in cultural context'
      };
    }

    if (content.includes('historical') || content.includes('period') || content.includes('era')) {
      return {
        significance: 'historical period context with educational potential',
        hasDepth: true,
        recommendation: 'Leverage historical context for educational brand storytelling',
        implementation: 'Research historical accuracy, create educational content'
      };
    }

    return {
      significance: 'contemporary cultural context',
      hasDepth: false
    };
  }

  private assessVisualSemiotics(submission: ProjectSubmission): {
    meaning: string;
    hasSymbolism: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('symbol') || content.includes('symbolic') || content.includes('meaning')) {
      return {
        meaning: 'symbolic elements requiring cultural interpretation',
        hasSymbolism: true,
        recommendation: 'Analyze symbolic meanings across cultural contexts',
        implementation: 'Research symbol meanings, test cultural interpretations, ensure appropriate usage'
      };
    }

    if (content.includes('icon') || content.includes('iconic') || content.includes('archetype')) {
      return {
        meaning: 'iconic visual elements with cultural significance',
        hasSymbolism: true,
        recommendation: 'Validate iconic references and their cultural appropriateness',
        implementation: 'Study iconographic traditions, ensure respectful interpretation'
      };
    }

    if (content.includes('religious') || content.includes('spiritual') || content.includes('sacred')) {
      return {
        meaning: 'religious or spiritual visual elements requiring careful consideration',
        hasSymbolism: true,
        recommendation: 'Approach religious imagery with extreme cultural sensitivity',
        implementation: 'Consult religious scholars, avoid appropriation, ensure respectful treatment'
      };
    }

    if (content.includes('color meaning') || content.includes('color symbol')) {
      return {
        meaning: 'color symbolism with cultural significance',
        hasSymbolism: true,
        recommendation: 'Research color meanings across target cultural contexts',
        implementation: 'Study color psychology, validate cultural meanings, test interpretations'
      };
    }

    return {
      meaning: 'contemporary visual communication',
      hasSymbolism: false
    };
  }

  private evaluateAppropriationRisk(submission: ProjectSubmission): {
    level: string;
    needsAttention: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('tribal') || content.includes('indigenous') || content.includes('native')) {
      return {
        level: 'high - indigenous cultural elements detected',
        needsAttention: true,
        recommendation: 'Extremely careful review needed for indigenous cultural elements',
        implementation: 'Consult indigenous cultural experts, consider alternative approaches, ensure community consent'
      };
    }

    if (content.includes('spiritual') || content.includes('sacred') || content.includes('religious')) {
      return {
        level: 'high - sacred or religious elements present',
        needsAttention: true,
        recommendation: 'Review religious elements for appropriation concerns',
        implementation: 'Consult religious scholars, avoid sacred symbols, ensure respectful treatment'
      };
    }

    if (content.includes('traditional') && (content.includes('pattern') || content.includes('motif'))) {
      return {
        level: 'medium - traditional patterns requiring verification',
        needsAttention: true,
        recommendation: 'Verify traditional patterns are not culturally protected',
        implementation: 'Research pattern origins, consult cultural experts, ensure appropriate usage'
      };
    }

    if (content.includes('cultural') || content.includes('heritage') || content.includes('ethnic')) {
      return {
        level: 'medium - cultural elements needing sensitivity review',
        needsAttention: true,
        recommendation: 'Review cultural elements for appropriation sensitivity',
        implementation: 'Research cultural significance, ensure respectful representation'
      };
    }

    return {
      level: 'low - minimal appropriation concerns',
      needsAttention: false
    };
  }

  private assessHeritageOpportunity(submission: ProjectSubmission): {
    potential: string;
    strength: string;
    canDevelop: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('heritage') || content.includes('legacy') || content.includes('established')) {
      return {
        potential: 'strong heritage foundation for brand storytelling',
        strength: 'high',
        canDevelop: true,
        recommendation: 'Develop comprehensive heritage narrative',
        implementation: 'Research brand history, create timeline, develop heritage-based marketing'
      };
    }

    if (content.includes('traditional') || content.includes('craftsmanship') || content.includes('artisan')) {
      return {
        potential: 'artisanal heritage potential with authentic roots',
        strength: 'moderate',
        canDevelop: true,
        recommendation: 'Highlight traditional craftsmanship and artisanal values',
        implementation: 'Document traditional processes, celebrate artisan skills, create heritage content'
      };
    }

    if (content.includes('family') || content.includes('generational') || content.includes('founder')) {
      return {
        potential: 'family or founder heritage story opportunity',
        strength: 'moderate',
        canDevelop: true,
        recommendation: 'Develop authentic founder or family heritage narrative',
        implementation: 'Research family history, create founder story, develop generational narrative'
      };
    }

    if (content.includes('innovative') || content.includes('pioneering') || content.includes('first')) {
      return {
        potential: 'innovation heritage with industry leadership',
        strength: 'emerging',
        canDevelop: true,
        recommendation: 'Document innovation history and industry firsts',
        implementation: 'Create innovation timeline, highlight industry contributions, build thought leadership'
      };
    }

    return {
      potential: 'limited heritage development opportunity',
      strength: 'low',
      canDevelop: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('specific cultural') || submission.content.includes('regional tradition')) {
      uncertainties.push('Cultural context expert should provide detailed regional cultural analysis');
    }

    if (submission.content.includes('legal') || submission.content.includes('copyright')) {
      uncertainties.push('Legal expert consultation needed for artistic reference and copyright implications');
    }

    if (submission.content.includes('contemporary art') || submission.content.includes('emerging movement')) {
      uncertainties.push('Contemporary art expert needed for current movement analysis and validation');
    }

    if (submission.content.includes('global') && !this.hasCulturalExpertInput(collaborativeContext)) {
      uncertainties.push('Cultural context expert should review global cultural implications');
    }

    if (submission.content.includes('museum') || submission.content.includes('exhibition')) {
      uncertainties.push('Museum professional consultation recommended for exhibition and curatorial context');
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
      submission.content.includes('cultural'),
      submission.content.includes('traditional'),
      submission.content.includes('religious'),
      submission.content.includes('indigenous'),
      submission.content.includes('international'),
      submission.content.includes('historical')
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('technical only') ||
           content.includes('pure functionality') ||
           (content.includes('modern') && content.includes('minimalist') && !content.includes('art') && !content.includes('heritage'));
  }
}