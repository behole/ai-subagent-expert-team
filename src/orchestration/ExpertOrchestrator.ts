import { BaseExpert } from '../experts/BaseExpert';
import { ProjectContextSpecialist } from '../experts/ProjectContextSpecialist';
import { SlashCommandParser, ParsedCommand } from './SlashCommandParser';
import { SynthesisEngine } from './SynthesisEngine';
import {
  ProjectSubmission,
  ExpertAnalysis,
  OrchestrationResult,
  ExpertConflict,
  ProjectSynthesis
} from '../types';

export class ExpertOrchestrator {
  private experts: Map<string, BaseExpert> = new Map();
  private projectContextSpecialist: ProjectContextSpecialist;
  private slashCommandParser: SlashCommandParser;
  private synthesisEngine: SynthesisEngine;

  constructor() {
    this.projectContextSpecialist = new ProjectContextSpecialist();
    this.slashCommandParser = new SlashCommandParser();
    this.synthesisEngine = new SynthesisEngine();

    this.experts.set('Alex Chen', this.projectContextSpecialist);
  }

  public registerExpert(expert: BaseExpert): void {
    const expertInfo = expert.getExpertInfo();
    this.experts.set(expertInfo.name, expert);
  }

  public async processProject(
    submission: ProjectSubmission,
    manualCommands?: string[]
  ): Promise<OrchestrationResult> {
    const projectId = this.generateProjectId();

    const contextAnalysis = await this.projectContextSpecialist.analyze(submission);

    let activeExperts = this.projectContextSpecialist.determineExpertTeam(submission);

    if (manualCommands && manualCommands.length > 0) {
      const manualExperts = this.parseManualCommands(manualCommands);
      activeExperts = [...new Set([...activeExperts, ...manualExperts])];
    }

    const analyses: ExpertAnalysis[] = [contextAnalysis];

    for (const expertName of activeExperts) {
      const expert = this.findExpertByName(expertName);
      if (expert && expert.shouldActivate(submission)) {
        try {
          const analysis = await expert.analyze(submission, analyses);
          analyses.push(analysis);
        } catch (error) {
          console.error(`Error analyzing with ${expertName}:`, error);
        }
      }
    }

    const synthesis = await this.synthesisEngine.synthesizeAnalyses(analyses);
    const conflicts = await this.synthesisEngine.identifyConflicts(analyses);

    return {
      projectId,
      activeExperts,
      analyses,
      synthesis,
      conflicts,
      nextSteps: this.generateNextSteps(synthesis, conflicts)
    };
  }

  public async processSlashCommand(
    command: string,
    submission: ProjectSubmission,
    existingAnalyses: ExpertAnalysis[] = []
  ): Promise<ExpertAnalysis | null> {
    const parsed = this.slashCommandParser.parseCommand(command);

    if (!parsed || !parsed.isValid) {
      throw new Error(parsed?.message || 'Invalid command');
    }

    const expert = this.findExpertByName(parsed.expert);
    if (!expert) {
      throw new Error(`Expert ${parsed.expert} not found or not implemented yet`);
    }

    return await expert.analyze(submission, existingAnalyses);
  }

  public getAvailableExperts(): Array<{ name: string; role: string; implemented: boolean }> {
    const availableCommands = this.slashCommandParser.getAvailableCommands();

    return availableCommands.map(cmd => ({
      name: cmd.expert,
      role: cmd.description,
      implemented: this.experts.has(cmd.expert)
    }));
  }

  public getProjectSummary(result: OrchestrationResult): string {
    const { analyses, synthesis, conflicts } = result;

    let summary = `## Project Analysis Summary\n\n`;
    summary += `**Active Experts:** ${result.activeExperts.join(', ')}\n\n`;

    if (synthesis.keyFindings.length > 0) {
      summary += `### Key Findings:\n`;
      synthesis.keyFindings.forEach(finding => {
        summary += `- ${finding}\n`;
      });
      summary += '\n';
    }

    if (synthesis.prioritizedRecommendations.length > 0) {
      summary += `### Priority Recommendations:\n`;
      synthesis.prioritizedRecommendations
        .filter(rec => rec.priority === 'critical' || rec.priority === 'high')
        .forEach(rec => {
          summary += `- **${rec.category}:** ${rec.description}\n`;
        });
      summary += '\n';
    }

    if (conflicts.length > 0) {
      summary += `### Expert Perspectives Requiring Decision:\n`;
      conflicts.forEach(conflict => {
        summary += `**${conflict.topic}:**\n`;
        conflict.perspectives.forEach(perspective => {
          summary += `- ${perspective.expertName}: ${perspective.position}\n`;
        });
        summary += '\n';
      });
    }

    return summary;
  }

  private parseManualCommands(commands: string[]): string[] {
    const experts: string[] = [];

    for (const command of commands) {
      const parsed = this.slashCommandParser.parseCommand(command);
      if (parsed && parsed.isValid) {
        experts.push(parsed.expert);
      }
    }

    return experts;
  }

  private findExpertByName(name: string): BaseExpert | undefined {
    // First try direct name match
    let expert = this.experts.get(name);
    if (expert) return expert;

    // Try role-based mapping
    const roleMapping: Record<string, string> = {
      'Design Theory Specialist': 'Dr. Maya Rodriguez',
      'Color Theorist': 'Dr. Zara Okafor',
      'Copywriting Strategist': 'Marcus Thompson',
      'Art History Analyst': 'Dr. Elena Vasquez',
      'Brand Strategy Analyst': 'Sarah Kim',
      'UX/Usability Specialist': 'David Chen',
      'Technical Implementation Advisor': 'Jordan Rivera',
      'Cultural Context Expert': 'Dr. Amara Osei',
      'Market Research Analyst': 'Lisa Park',
      'Accessibility Expert': 'Dr. Alex Johnson',
      'Performance Analyst': 'Maria Santos'
    };

    const expertName = roleMapping[name];
    if (expertName) {
      return this.experts.get(expertName);
    }

    return undefined;
  }

  private generateProjectId(): string {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateNextSteps(synthesis: ProjectSynthesis, conflicts: ExpertConflict[]): string[] {
    const steps: string[] = [];

    if (conflicts.length > 0) {
      steps.push('Review expert perspective conflicts and make strategic decisions');
    }

    if (synthesis.prioritizedRecommendations.some(rec => rec.priority === 'critical')) {
      steps.push('Address critical recommendations before proceeding');
    }

    steps.push('Implement high-priority recommendations');

    if (synthesis.requiresUserDecision.length > 0) {
      steps.push('Make decisions on flagged items requiring user input');
    }

    return steps;
  }
}