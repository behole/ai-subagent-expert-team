import { BaseExpert } from './BaseExpert';
import { ProjectSubmission, ExpertAnalysis, ExpertActivationTrigger } from '../types';

export class CulturalContextExpert extends BaseExpert {
  constructor() {
    const activationTriggers: ExpertActivationTrigger = {
      keywords: [
        'cultural', 'international', 'global', 'diverse', 'inclusive', 'multicultural',
        'religious', 'spiritual', 'traditional', 'ethnic', 'demographic', 'generational'
      ],
      projectTypes: ['brand', 'marketing', 'website', 'app'],
      contentTypes: ['global', 'cultural', 'international', 'inclusive']
    };

    super('Dr. Amara Osei', 'Cultural Context Expert', activationTriggers);
  }

  public async analyze(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis> {
    const culturalSensitivity = this.assessCulturalSensitivity(submission);
    const globalMarketReadiness = this.evaluateGlobalMarketReadiness(submission);
    const inclusiveDesign = this.analyzeInclusiveDesign(submission);
    const appropriationRisk = this.evaluateAppropriationRisk(submission);
    const demographicConsiderations = this.assessDemographicConsiderations(submission);

    const insights = [
      `Cultural sensitivity: ${culturalSensitivity.level}`,
      `Global market readiness: ${globalMarketReadiness.readiness}`,
      `Inclusive design: ${inclusiveDesign.inclusivity}`,
      `Appropriation risk: ${appropriationRisk.risk}`,
      `Demographic considerations: ${demographicConsiderations.awareness}`
    ];

    const recommendations = [];

    if (culturalSensitivity.needsImprovement) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Cultural Sensitivity',
          culturalSensitivity.recommendation || 'Address cultural sensitivity concerns for respectful representation',
          'Cultural insensitivity can damage brand reputation and alienate entire communities',
          culturalSensitivity.implementation || 'Conduct cultural review with community representatives and modify problematic elements',
          'Respectful cultural representation and expanded market acceptance'
        )
      );
    }

    if (appropriationRisk.needsAttention) {
      recommendations.push(
        this.createRecommendation(
          'critical',
          'Cultural Appropriation Prevention',
          appropriationRisk.recommendation || 'Prevent cultural appropriation and ensure respectful cultural engagement',
          'Cultural appropriation causes community harm and significant brand reputation damage',
          appropriationRisk.implementation || 'Remove appropriated elements, consult cultural experts, and develop respectful alternatives',
          'Ethical cultural engagement and community trust'
        )
      );
    }

    if (globalMarketReadiness.needsAdaptation) {
      recommendations.push(
        this.createRecommendation(
          'high',
          'Global Market Adaptation',
          globalMarketReadiness.recommendation || 'Adapt design and messaging for international markets',
          'Cultural adaptation is essential for successful global expansion and market acceptance',
          globalMarketReadiness.implementation || 'Research target markets, modify culturally-specific elements, and test with local audiences',
          'Successful international market entry and cultural acceptance'
        )
      );
    }

    if (inclusiveDesign.hasOpportunities) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Inclusive Design Enhancement',
          inclusiveDesign.recommendation || 'Enhance inclusive design for diverse audiences',
          'Inclusive design expands audience reach and demonstrates social responsibility',
          inclusiveDesign.implementation || 'Implement universal design principles, diverse representation, and accessibility considerations',
          'Broader audience appeal and inclusive brand positioning'
        )
      );
    }

    if (demographicConsiderations.needsResearch) {
      recommendations.push(
        this.createRecommendation(
          'medium',
          'Demographic Research',
          demographicConsiderations.recommendation || 'Conduct demographic research for targeted cultural adaptation',
          'Understanding demographic differences enables more effective and respectful communication',
          demographicConsiderations.implementation || 'Research target demographics, test messaging with diverse groups, and adapt for generational preferences',
          'More effective audience connection and reduced cultural barriers'
        )
      );
    }

    recommendations.push(
      this.createRecommendation(
        'low',
        'Cultural Education Framework',
        'Develop ongoing cultural competency and awareness for team members',
        'Cultural education prevents future missteps and builds authentic cultural engagement',
        'Create cultural training programs, establish community relationships, and implement cultural review processes',
        'Sustainable cultural competency and authentic community relationships'
      )
    );

    const uncertaintyAreas = this.identifyUncertaintyAreas(submission, collaborativeContext);
    const confidenceLevel = this.assessConfidenceLevel(submission, this.getAnalysisComplexity(submission));

    return {
      expertName: this.expertName,
      expertRole: this.expertRole,
      assessment: `Cultural analysis shows ${culturalSensitivity.level} sensitivity with ${globalMarketReadiness.adaptation} global adaptation and ${appropriationRisk.risk} appropriation risk`,
      insights,
      recommendations,
      collaborativeNotes: this.buildCollaborativeNotes(collaborativeContext),
      confidenceLevel,
      uncertaintyAreas,
      timestamp: new Date()
    };
  }

  private assessCulturalSensitivity(submission: ProjectSubmission): {
    level: string;
    needsImprovement: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('sensitive') || content.includes('inclusive') || content.includes('respectful')) {
      return {
        level: 'high awareness of cultural sensitivity needs',
        needsImprovement: false
      };
    }

    if (content.includes('traditional') || content.includes('cultural') || content.includes('heritage')) {
      if (content.includes('respectful') || content.includes('authentic')) {
        return {
          level: 'cultural awareness with respect for traditions',
          needsImprovement: false
        };
      }
      return {
        level: 'cultural elements present requiring sensitivity review',
        needsImprovement: true,
        recommendation: 'Ensure cultural elements are represented respectfully and authentically',
        implementation: 'Consult cultural experts, validate representations, and ensure community consent'
      };
    }

    if (content.includes('international') || content.includes('global')) {
      return {
        level: 'global scope requiring cultural sensitivity planning',
        needsImprovement: true,
        recommendation: 'Develop cultural sensitivity guidelines for international markets',
        implementation: 'Research target markets, identify cultural sensitivities, and adapt messaging accordingly'
      };
    }

    if (content.includes('religious') || content.includes('spiritual') || content.includes('sacred')) {
      return {
        level: 'religious elements requiring extreme cultural sensitivity',
        needsImprovement: true,
        recommendation: 'Exercise extreme caution with religious and spiritual elements',
        implementation: 'Consult religious scholars, avoid sacred symbols, and ensure respectful treatment'
      };
    }

    return {
      level: 'standard cultural considerations apply',
      needsImprovement: false
    };
  }

  private evaluateGlobalMarketReadiness(submission: ProjectSubmission): {
    readiness: string;
    adaptation: string;
    needsAdaptation: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('global') || content.includes('international') || content.includes('worldwide')) {
      return {
        readiness: 'global expansion planned requiring cultural adaptation',
        adaptation: 'extensive',
        needsAdaptation: true,
        recommendation: 'Develop comprehensive global adaptation strategy',
        implementation: 'Research target markets, adapt visuals and messaging, test with local focus groups'
      };
    }

    if (content.includes('multicultural') || content.includes('diverse audience')) {
      return {
        readiness: 'multicultural audience requiring inclusive approach',
        adaptation: 'moderate',
        needsAdaptation: true,
        recommendation: 'Ensure inclusive representation and culturally-neutral design choices',
        implementation: 'Use diverse imagery, avoid cultural assumptions, and test with diverse user groups'
      };
    }

    if (content.includes('export') || content.includes('overseas') || content.includes('foreign')) {
      return {
        readiness: 'international business requiring market-specific adaptations',
        adaptation: 'targeted',
        needsAdaptation: true,
        recommendation: 'Adapt for specific international markets and business cultures',
        implementation: 'Research business cultures, adapt communication styles, and localize content'
      };
    }

    if (submission.targetAudience && submission.targetAudience.includes('international')) {
      return {
        readiness: 'international audience identified requiring cultural consideration',
        adaptation: 'moderate',
        needsAdaptation: true,
        recommendation: 'Research and adapt for international audience cultural preferences',
        implementation: 'Study target audience cultures, adapt design elements, and validate cultural appropriateness'
      };
    }

    return {
      readiness: 'domestic market focus with minimal adaptation needs',
      adaptation: 'minimal',
      needsAdaptation: false
    };
  }

  private analyzeInclusiveDesign(submission: ProjectSubmission): {
    inclusivity: string;
    hasOpportunities: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('inclusive') || content.includes('accessibility') || content.includes('universal')) {
      return {
        inclusivity: 'inclusive design principles actively considered',
        hasOpportunities: false
      };
    }

    if (content.includes('diverse') || content.includes('representation') || content.includes('community')) {
      return {
        inclusivity: 'diversity awareness with inclusive design potential',
        hasOpportunities: true,
        recommendation: 'Enhance inclusive design for broader community representation',
        implementation: 'Include diverse imagery, consider accessibility needs, and ensure inclusive language'
      };
    }

    if (submission.targetAudience && submission.targetAudience.includes('diverse')) {
      return {
        inclusivity: 'diverse audience requiring inclusive design approach',
        hasOpportunities: true,
        recommendation: 'Implement comprehensive inclusive design strategy',
        implementation: 'Research audience diversity, implement universal design principles, and test accessibility'
      };
    }

    if (content.includes('public') || content.includes('community') || content.includes('social')) {
      return {
        inclusivity: 'public-facing project with inclusive design opportunity',
        hasOpportunities: true,
        recommendation: 'Consider inclusive design for broad public accessibility',
        implementation: 'Apply universal design principles, ensure accessibility, and consider diverse user needs'
      };
    }

    return {
      inclusivity: 'standard design approach with basic inclusive considerations',
      hasOpportunities: false
    };
  }

  private evaluateAppropriationRisk(submission: ProjectSubmission): {
    risk: string;
    needsAttention: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('tribal') || content.includes('indigenous') || content.includes('native')) {
      return {
        risk: 'high - indigenous cultural elements present',
        needsAttention: true,
        recommendation: 'Extremely careful review of indigenous cultural elements required',
        implementation: 'Consult indigenous cultural leaders, remove unauthorized elements, seek community approval'
      };
    }

    if (content.includes('sacred') || content.includes('spiritual') || content.includes('religious symbols')) {
      return {
        risk: 'high - sacred or religious elements requiring careful consideration',
        needsAttention: true,
        recommendation: 'Review sacred and religious elements for appropriation concerns',
        implementation: 'Consult religious leaders, avoid sacred symbols, ensure respectful representation'
      };
    }

    if (content.includes('traditional patterns') || content.includes('cultural motifs')) {
      return {
        risk: 'medium - traditional cultural patterns requiring verification',
        needsAttention: true,
        recommendation: 'Verify traditional patterns are not culturally protected or sacred',
        implementation: 'Research pattern origins, consult cultural experts, obtain appropriate permissions'
      };
    }

    if (content.includes('folk') || content.includes('ethnic') || content.includes('traditional art')) {
      return {
        risk: 'medium - folk and traditional art elements needing cultural verification',
        needsAttention: true,
        recommendation: 'Ensure folk and traditional art elements are used respectfully',
        implementation: 'Research cultural significance, consult community representatives, ensure appropriate usage'
      };
    }

    return {
      risk: 'low - minimal cultural appropriation concerns identified',
      needsAttention: false
    };
  }

  private assessDemographicConsiderations(submission: ProjectSubmission): {
    awareness: string;
    needsResearch: boolean;
    recommendation?: string;
    implementation?: string;
  } {
    const content = submission.content.toLowerCase();

    if (content.includes('generational') || content.includes('age groups') || content.includes('demographics')) {
      return {
        awareness: 'demographic awareness present requiring targeted research',
        needsResearch: true,
        recommendation: 'Research specific demographic cultural preferences and communication styles',
        implementation: 'Study generational differences, test with target demographics, adapt messaging accordingly'
      };
    }

    if (content.includes('young') || content.includes('millennial') || content.includes('gen z')) {
      return {
        awareness: 'younger demographic focus with cultural considerations',
        needsResearch: true,
        recommendation: 'Research younger generation cultural values and communication preferences',
        implementation: 'Study digital culture, social media preferences, and generational values'
      };
    }

    if (content.includes('professional') || content.includes('business') || content.includes('enterprise')) {
      return {
        awareness: 'professional demographic with cultural business considerations',
        needsResearch: true,
        recommendation: 'Consider professional cultural norms and business communication styles',
        implementation: 'Research professional cultural expectations, adapt formality levels, consider international business norms'
      };
    }

    if (!submission.targetAudience) {
      return {
        awareness: 'target audience undefined requiring demographic research',
        needsResearch: true,
        recommendation: 'Define target audience demographics for cultural adaptation',
        implementation: 'Conduct audience research, identify cultural characteristics, and adapt accordingly'
      };
    }

    return {
      awareness: 'basic demographic considerations identified',
      needsResearch: false
    };
  }

  private identifyUncertaintyAreas(
    submission: ProjectSubmission,
    collaborativeContext: ExpertAnalysis[]
  ): string[] {
    const uncertainties: string[] = [];

    if (submission.content.includes('specific regional') || submission.content.includes('local customs')) {
      uncertainties.push('Local cultural expert consultation needed for specific regional customs and practices');
    }

    if (submission.content.includes('legal') || submission.content.includes('regulatory')) {
      uncertainties.push('Legal expert consultation needed for cultural representation laws and regulations');
    }

    if (submission.content.includes('emerging') || submission.content.includes('youth culture')) {
      uncertainties.push('Contemporary culture research needed for emerging trends and subcultures');
    }

    if (submission.content.includes('art') && !this.hasArtHistoryExpertInput(collaborativeContext)) {
      uncertainties.push('Art history expert should review cultural and historical art references');
    }

    if (submission.content.includes('technology') && submission.content.includes('global')) {
      uncertainties.push('Technology adoption patterns vary culturally and may require specialized research');
    }

    return uncertainties;
  }

  private hasArtHistoryExpertInput(collaborativeContext: ExpertAnalysis[]): boolean {
    return collaborativeContext.some(analysis =>
      analysis.expertName.includes('Elena') || analysis.expertRole.includes('Art History')
    );
  }

  private getAnalysisComplexity(submission: ProjectSubmission): 'low' | 'medium' | 'high' {
    const complexityIndicators = [
      submission.content.includes('international'),
      submission.content.includes('multicultural'),
      submission.content.includes('religious'),
      submission.content.includes('traditional'),
      submission.content.includes('indigenous'),
      !submission.targetAudience
    ];

    const score = complexityIndicators.filter(Boolean).length;
    return score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low';
  }

  protected isOutsideCoreDomain(submission: ProjectSubmission): boolean {
    const content = submission.content.toLowerCase();

    return content.includes('technical only') ||
           content.includes('backend only') ||
           (content.includes('domestic only') && !content.includes('diverse') && !content.includes('inclusive'));
  }
}