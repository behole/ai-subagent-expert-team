import {
  ExpertAnalysis,
  ProjectSynthesis,
  ExpertConflict,
  Recommendation
} from '../types';

export class SynthesisEngine {
  public async synthesizeAnalyses(analyses: ExpertAnalysis[]): Promise<ProjectSynthesis> {
    const keyFindings = this.extractKeyFindings(analyses);
    const prioritizedRecommendations = this.prioritizeRecommendations(analyses);
    const consensusAreas = this.identifyConsensusAreas(analyses);
    const requiresUserDecision = this.identifyUserDecisionPoints(analyses);

    const summary = this.generateSummary(analyses, keyFindings);

    return {
      summary,
      keyFindings,
      prioritizedRecommendations,
      consensusAreas,
      requiresUserDecision
    };
  }

  public async identifyConflicts(analyses: ExpertAnalysis[]): Promise<ExpertConflict[]> {
    const conflicts: ExpertConflict[] = [];

    const recommendationsByCategory = this.groupRecommendationsByCategory(analyses);

    for (const [category, categoryRecs] of Object.entries(recommendationsByCategory)) {
      if (categoryRecs.length > 1) {
        const conflict = this.analyzeRecommendationConflict(category, categoryRecs);
        if (conflict) {
          conflicts.push(conflict);
        }
      }
    }

    return conflicts;
  }

  private extractKeyFindings(analyses: ExpertAnalysis[]): string[] {
    const findings: string[] = [];

    analyses.forEach(analysis => {
      if (analysis.insights.length > 0) {
        const topInsight = analysis.insights[0]!;
        findings.push(`${analysis.expertName}: ${topInsight}`);
      }

      const criticalRecs = analysis.recommendations.filter(rec => rec.priority === 'critical');
      if (criticalRecs.length > 0) {
        findings.push(`Critical from ${analysis.expertName}: ${criticalRecs[0]!.description}`);
      }
    });

    return findings;
  }

  private prioritizeRecommendations(analyses: ExpertAnalysis[]): Recommendation[] {
    const allRecommendations: Recommendation[] = [];

    analyses.forEach(analysis => {
      allRecommendations.push(...analysis.recommendations);
    });

    return allRecommendations.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private identifyConsensusAreas(analyses: ExpertAnalysis[]): string[] {
    const consensusAreas: string[] = [];

    const categoryConsensus = this.groupRecommendationsByCategory(analyses);

    for (const [category, recommendations] of Object.entries(categoryConsensus)) {
      if (recommendations.length > 1) {
        const priorities = recommendations.map(rec => rec.priority);
        const uniquePriorities = [...new Set(priorities)];

        if (uniquePriorities.length === 1) {
          consensusAreas.push(`All experts agree on ${category} priority level`);
        }
      }
    }

    const confidenceConsensus = analyses.filter(analysis => analysis.confidenceLevel === 'high');
    if (confidenceConsensus.length >= analyses.length * 0.7) {
      consensusAreas.push('High confidence across most expert analyses');
    }

    return consensusAreas;
  }

  private identifyUserDecisionPoints(analyses: ExpertAnalysis[]): string[] {
    const decisionPoints: string[] = [];

    const lowConfidenceAnalyses = analyses.filter(analysis => analysis.confidenceLevel === 'low');
    if (lowConfidenceAnalyses.length > 0) {
      decisionPoints.push(
        `Low confidence areas requiring additional research: ${lowConfidenceAnalyses.map(a => a.expertName).join(', ')}`
      );
    }

    const uncertaintyAreas = analyses.flatMap(analysis => analysis.uncertaintyAreas);
    if (uncertaintyAreas.length > 0) {
      decisionPoints.push('Expert uncertainty areas require stakeholder input or additional research');
    }

    return decisionPoints;
  }

  private generateSummary(analyses: ExpertAnalysis[], keyFindings: string[]): string {
    const expertCount = analyses.length;
    const highConfidenceCount = analyses.filter(a => a.confidenceLevel === 'high').length;
    const criticalRecsCount = analyses.flatMap(a => a.recommendations)
      .filter(rec => rec.priority === 'critical').length;

    let summary = `Analysis complete with ${expertCount} expert${expertCount > 1 ? 's' : ''}. `;

    if (highConfidenceCount === expertCount) {
      summary += 'All experts expressed high confidence in their assessments. ';
    } else if (highConfidenceCount > 0) {
      summary += `${highConfidenceCount} expert${highConfidenceCount > 1 ? 's' : ''} expressed high confidence. `;
    }

    if (criticalRecsCount > 0) {
      summary += `${criticalRecsCount} critical recommendation${criticalRecsCount > 1 ? 's' : ''} identified. `;
    }

    if (keyFindings.length > 0) {
      summary += `Primary focus areas: ${keyFindings.slice(0, 2).join('; ')}.`;
    }

    return summary;
  }

  private groupRecommendationsByCategory(analyses: ExpertAnalysis[]): Record<string, Array<Recommendation & { expertName: string }>> {
    const grouped: Record<string, Array<Recommendation & { expertName: string }>> = {};

    analyses.forEach(analysis => {
      analysis.recommendations.forEach(rec => {
        if (!grouped[rec.category]) {
          grouped[rec.category] = [];
        }
        grouped[rec.category]!.push({
          ...rec,
          expertName: analysis.expertName
        });
      });
    });

    return grouped;
  }

  private analyzeRecommendationConflict(
    category: string,
    recommendations: Array<Recommendation & { expertName: string }>
  ): ExpertConflict | null {
    const uniquePriorities = [...new Set(recommendations.map(rec => rec.priority))];
    const uniqueDescriptions = [...new Set(recommendations.map(rec => rec.description))];

    if (uniquePriorities.length > 1 || uniqueDescriptions.length > 1) {
      const perspectives = recommendations.map(rec => ({
        expertName: rec.expertName,
        position: rec.description,
        reasoning: rec.reasoning
      }));

      return {
        topic: category,
        conflictingExperts: recommendations.map(rec => rec.expertName),
        perspectives,
        resolutionRequired: uniquePriorities.includes('critical') || uniquePriorities.includes('high')
      };
    }

    return null;
  }
}