import { ExpertOrchestrator } from './orchestration/ExpertOrchestrator';
import { DesignTheorySpecialist } from './experts/DesignTheorySpecialist';
import { ColorTheorist } from './experts/ColorTheorist';
import { CopywritingStrategist } from './experts/CopywritingStrategist';
import { UXUsabilitySpecialist } from './experts/UXUsabilitySpecialist';
import { TechnicalImplementationAdvisor } from './experts/TechnicalImplementationAdvisor';
import { BrandStrategyAnalyst } from './experts/BrandStrategyAnalyst';
import { ArtHistoryAnalyst } from './experts/ArtHistoryAnalyst';
import { CulturalContextExpert } from './experts/CulturalContextExpert';
import { MarketResearchAnalyst } from './experts/MarketResearchAnalyst';
import { AccessibilityExpert } from './experts/AccessibilityExpert';
import { PerformanceAnalyst } from './experts/PerformanceAnalyst';
import { ProjectSubmission, OrchestrationResult } from './types';

export class AISubAgentExpertTeam {
  private orchestrator: ExpertOrchestrator;

  constructor() {
    this.orchestrator = new ExpertOrchestrator();
    this.initializeExperts();
  }

  private initializeExperts(): void {
    // Phase 1: Universal Foundation Experts
    this.orchestrator.registerExpert(new DesignTheorySpecialist());
    this.orchestrator.registerExpert(new ColorTheorist());
    this.orchestrator.registerExpert(new CopywritingStrategist());

    // Phase 2: Specialized Analysis Experts
    this.orchestrator.registerExpert(new UXUsabilitySpecialist());
    this.orchestrator.registerExpert(new TechnicalImplementationAdvisor());
    this.orchestrator.registerExpert(new BrandStrategyAnalyst());
    this.orchestrator.registerExpert(new ArtHistoryAnalyst());

    // Phase 3: Contextual Experts
    this.orchestrator.registerExpert(new CulturalContextExpert());
    this.orchestrator.registerExpert(new MarketResearchAnalyst());
    this.orchestrator.registerExpert(new AccessibilityExpert());
    this.orchestrator.registerExpert(new PerformanceAnalyst());
  }

  public async analyzeProject(
    submission: ProjectSubmission,
    manualCommands?: string[]
  ): Promise<OrchestrationResult> {
    return await this.orchestrator.processProject(submission, manualCommands);
  }

  public async executeSlashCommand(
    command: string,
    submission: ProjectSubmission,
    existingAnalyses?: any[]
  ): Promise<any> {
    return await this.orchestrator.processSlashCommand(command, submission, existingAnalyses);
  }

  public getAvailableExperts(): Array<{ name: string; role: string; implemented: boolean }> {
    return this.orchestrator.getAvailableExperts();
  }

  public getProjectSummary(result: OrchestrationResult): string {
    return this.orchestrator.getProjectSummary(result);
  }
}

export { ProjectSubmission, OrchestrationResult, ExpertAnalysis, Recommendation } from './types';
export default AISubAgentExpertTeam;