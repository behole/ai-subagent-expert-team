import { ExpertSlashCommand } from '../types';

export interface ParsedCommand {
  command: ExpertSlashCommand;
  expert: string;
  isValid: boolean;
  message?: string;
}

export class SlashCommandParser {
  private readonly validCommands: ExpertSlashCommand[] = [
    '@projectContextSpecialist',
    '@designTheorySpecialist',
    '@colorTheorist',
    '@copywritingStrategist',
    '@artHistoryAnalyst',
    '@brandStrategyAnalyst',
    '@uxUsabilitySpecialist',
    '@technicalImplementationAdvisor',
    '@culturalContextExpert',
    '@marketResearchAnalyst',
    '@accessibilityExpert',
    '@performanceAnalyst'
  ];

  private readonly expertMapping: Record<ExpertSlashCommand, string> = {
    '@projectContextSpecialist': 'Alex Chen',
    '@designTheorySpecialist': 'Dr. Maya Rodriguez',
    '@colorTheorist': 'Dr. Zara Okafor',
    '@copywritingStrategist': 'Marcus Thompson',
    '@artHistoryAnalyst': 'Dr. Elena Vasquez',
    '@brandStrategyAnalyst': 'Sarah Kim',
    '@uxUsabilitySpecialist': 'David Chen',
    '@technicalImplementationAdvisor': 'Jordan Rivera',
    '@culturalContextExpert': 'Dr. Amara Osei',
    '@marketResearchAnalyst': 'Lisa Park',
    '@accessibilityExpert': 'Dr. Alex Johnson',
    '@performanceAnalyst': 'Maria Santos'
  };

  public parseCommand(input: string): ParsedCommand | null {
    const trimmedInput = input.trim();

    if (!trimmedInput.startsWith('@')) {
      return null;
    }

    const commandMatch = this.validCommands.find(cmd =>
      trimmedInput.toLowerCase().startsWith(cmd.toLowerCase())
    );

    if (!commandMatch) {
      const suggestion = this.findClosestCommand(trimmedInput);
      return {
        command: '@projectContextSpecialist',
        expert: '',
        isValid: false,
        message: `Invalid command: ${trimmedInput}. Did you mean ${suggestion}?`
      };
    }

    return {
      command: commandMatch,
      expert: this.expertMapping[commandMatch],
      isValid: true,
      message: `Activating ${this.expertMapping[commandMatch]}`
    };
  }

  public extractCommandsFromText(text: string): ParsedCommand[] {
    const commands: ParsedCommand[] = [];
    const words = text.split(/\s+/);

    for (const word of words) {
      const parsed = this.parseCommand(word);
      if (parsed) {
        commands.push(parsed);
      }
    }

    return commands;
  }

  public getAvailableCommands(): { command: ExpertSlashCommand; expert: string; description: string }[] {
    return [
      {
        command: '@projectContextSpecialist',
        expert: 'Alex Chen',
        description: 'Central orchestrator for project coordination and expert team management'
      },
      {
        command: '@designTheorySpecialist',
        expert: 'Dr. Maya Rodriguez',
        description: 'Visual design, typography, layout, and composition analysis'
      },
      {
        command: '@colorTheorist',
        expert: 'Dr. Zara Okafor',
        description: 'Color psychology, accessibility, and cultural color associations'
      },
      {
        command: '@copywritingStrategist',
        expert: 'Marcus Thompson',
        description: 'Messaging strategy, brand voice, and conversion optimization'
      },
      {
        command: '@artHistoryAnalyst',
        expert: 'Dr. Elena Vasquez',
        description: 'Cultural context, historical references, and appropriation prevention'
      },
      {
        command: '@brandStrategyAnalyst',
        expert: 'Sarah Kim',
        description: 'Competitive positioning, brand architecture, and strategic differentiation'
      },
      {
        command: '@uxUsabilitySpecialist',
        expert: 'David Chen',
        description: 'User experience optimization, conversion improvement, and mobile UX'
      },
      {
        command: '@technicalImplementationAdvisor',
        expert: 'Jordan Rivera',
        description: 'Technical feasibility, performance optimization, and integration planning'
      },
      {
        command: '@culturalContextExpert',
        expert: 'Dr. Amara Osei',
        description: 'Global sensitivity, inclusive design, and cultural adaptation'
      },
      {
        command: '@marketResearchAnalyst',
        expert: 'Lisa Park',
        description: 'Audience behavior, competitive intelligence, and market validation'
      },
      {
        command: '@accessibilityExpert',
        expert: 'Dr. Alex Johnson',
        description: 'WCAG compliance, inclusive design, and assistive technology optimization'
      },
      {
        command: '@performanceAnalyst',
        expert: 'Maria Santos',
        description: 'Core Web Vitals, site speed optimization, and technical SEO'
      }
    ];
  }

  private findClosestCommand(input: string): ExpertSlashCommand {
    const inputLower = input.toLowerCase();
    let closestCommand: ExpertSlashCommand = '@projectContextSpecialist';
    let minDistance = Infinity;

    for (const command of this.validCommands) {
      const distance = this.levenshteinDistance(inputLower, command.toLowerCase());
      if (distance < minDistance) {
        minDistance = distance;
        closestCommand = command;
      }
    }

    return closestCommand;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) {
      matrix[0]![i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j]![0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j]![i] = Math.min(
          matrix[j]![i - 1]! + 1,
          matrix[j - 1]![i]! + 1,
          matrix[j - 1]![i - 1]! + indicator
        );
      }
    }

    return matrix[str2.length]![str1.length]!;
  }

  public isValidCommand(command: string): boolean {
    return this.validCommands.includes(command as ExpertSlashCommand);
  }
}