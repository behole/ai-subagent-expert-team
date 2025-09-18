#!/usr/bin/env node

/**
 * Claude Code CLI Integration for AI SubAgent Expert Team
 * Usage: npx expert-cli [command] [options]
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_BASE = process.env.EXPERT_API_URL || 'http://localhost:3000';

// Color coding for better output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function formatExpertAnalysis(analysis) {
  let output = '\n';
  output += colorize(`📋 ${analysis.expertName}`, 'cyan') + '\n';
  output += colorize(`Role: ${analysis.expertRole}`, 'blue') + '\n';
  output += colorize(`Confidence: ${(analysis.confidence || 'medium').toUpperCase()}`,
    analysis.confidence === 'high' ? 'green' :
    analysis.confidence === 'medium' ? 'yellow' : 'red') + '\n';
  output += '\n';

  output += colorize('Assessment:', 'bright') + '\n';
  output += `${analysis.assessment}\n\n`;

  if (analysis.insights) {
    output += colorize('Key Insights:', 'bright') + '\n';
    output += `${analysis.insights}\n\n`;
  }

  if (analysis.recommendations && analysis.recommendations.length > 0) {
    output += colorize('Recommendations:', 'bright') + '\n';
    analysis.recommendations.forEach((rec, index) => {
      const title = rec.title || `Recommendation ${index + 1}`;
      const desc = rec.description || rec;
      output += colorize(`${index + 1}. ${title}:`, 'green') + ` ${desc}\n`;
    });
    output += '\n';
  }

  output += colorize('─'.repeat(60), 'blue') + '\n';
  return output;
}

async function analyzeProject(projectData) {
  try {
    console.log(colorize('🔍 Analyzing project with AI experts...', 'yellow'));

    const response = await axios.post(`${API_BASE}/api/analyze`, projectData, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data.result;

    console.log(colorize('\n🎯 Analysis Complete!', 'green'));
    console.log(colorize(`Experts Consulted: ${result.activeExperts.join(', ')}`, 'blue'));
    console.log(colorize(`Analysis Time: ${response.data.analysisTime}ms`, 'blue'));

    if (result.analyses && result.analyses.length > 0) {
      console.log(colorize('\n📊 Expert Analyses:', 'bright'));
      result.analyses.forEach(analysis => {
        console.log(formatExpertAnalysis(analysis));
      });
    }

    if (result.conflicts && result.conflicts.length > 0) {
      console.log(colorize('⚠️ Expert Conflicts Detected:', 'yellow'));
      result.conflicts.forEach(conflict => {
        console.log(`• ${conflict}`);
      });
    }

  } catch (error) {
    console.error(colorize('❌ Analysis failed:', 'red'), error.message);
    if (error.response?.data) {
      console.error(colorize('Details:', 'red'), JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function consultExpert(expertCommand, projectData) {
  try {
    console.log(colorize(`🤖 Consulting ${expertCommand}...`, 'yellow'));

    const response = await axios.post(`${API_BASE}/api/consult/${expertCommand}`, projectData, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data.result;

    console.log(colorize('\n✅ Consultation Complete!', 'green'));
    console.log(formatExpertAnalysis(result));

  } catch (error) {
    console.error(colorize('❌ Consultation failed:', 'red'), error.message);
    if (error.response?.data) {
      console.error(colorize('Details:', 'red'), JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function listExperts() {
  try {
    const response = await axios.get(`${API_BASE}/api/experts`);
    const data = response.data;

    console.log(colorize('\n🤖 Available AI Experts:', 'bright'));
    console.log(colorize('═'.repeat(50), 'blue'));

    data.experts.forEach(expert => {
      const status = expert.implemented ? colorize('✅ Available', 'green') : colorize('🚧 Coming Soon', 'yellow');
      const command = colorize(`@${expert.name.toLowerCase().replace(/\s+/g, '')}`, 'cyan');

      console.log(`\n${colorize(expert.name, 'bright')}`);
      console.log(`Role: ${expert.role}`);
      console.log(`Command: ${command}`);
      console.log(`Status: ${status}`);
    });

    console.log(colorize('\n' + '═'.repeat(50), 'blue'));
    console.log(colorize('Usage Examples:', 'bright'));
    console.log('• expert-cli analyze --file project.md');
    console.log('• expert-cli consult @colorTheorist --content "Design a logo"');
    console.log('• expert-cli analyze --content "Build a website" --type website');

  } catch (error) {
    console.error(colorize('❌ Failed to list experts:', 'red'), error.message);
  }
}

function readProjectFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Try to parse as JSON first
    try {
      return JSON.parse(content);
    } catch {
      // Otherwise treat as plain text content
      const ext = path.extname(filePath).toLowerCase();
      const type = ext === '.md' ? 'design' :
                  ext === '.json' ? 'other' :
                  'other';

      return {
        type,
        content,
        context: `File: ${path.basename(filePath)}`
      };
    }
  } catch (error) {
    console.error(colorize('❌ Failed to read file:', 'red'), error.message);
    process.exit(1);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = {};

  for (let i = 1; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, '');
    const value = args[i + 1];
    if (key && value !== undefined) {
      options[key] = value;
    }
  }

  return { command, options };
}

async function main() {
  const { command, options } = parseArgs();

  console.log(colorize('🚀 AI SubAgent Expert Team CLI', 'bright'));
  console.log(colorize(`API: ${API_BASE}`, 'blue'));

  if (!command || command === 'help') {
    console.log(colorize('\nUsage:', 'bright'));
    console.log('  expert-cli analyze [options]     - Analyze project with auto-expert selection');
    console.log('  expert-cli consult <expert> [options] - Consult specific expert');
    console.log('  expert-cli list                  - List available experts');
    console.log('  expert-cli help                  - Show this help');
    console.log(colorize('\nOptions:', 'bright'));
    console.log('  --file <path>                    - Read project from file');
    console.log('  --content <text>                 - Project description');
    console.log('  --type <type>                    - Project type (website|brand|marketing|app|design|copy|other)');
    console.log('  --requirements <text>            - Project requirements');
    console.log('  --context <text>                 - Project context');
    console.log('  --audience <text>                - Target audience');
    return;
  }

  let projectData = {};

  // Load project data
  if (options.file) {
    projectData = readProjectFile(options.file);
  }

  // Override with command line options
  if (options.content) projectData.content = options.content;
  if (options.type) projectData.type = options.type;
  if (options.requirements) projectData.requirements = options.requirements;
  if (options.context) projectData.context = options.context;
  if (options.audience) projectData.targetAudience = options.audience;

  // Set defaults
  if (!projectData.type) projectData.type = 'other';

  switch (command) {
    case 'analyze':
      if (!projectData.content && !options.file) {
        console.error(colorize('❌ Error: --content or --file is required for analysis', 'red'));
        process.exit(1);
      }
      await analyzeProject(projectData);
      break;

    case 'consult':
      const expert = args[1];
      if (!expert) {
        console.error(colorize('❌ Error: Expert name is required for consultation', 'red'));
        console.log('Example: expert-cli consult @colorTheorist --content "Design advice"');
        process.exit(1);
      }
      if (!projectData.content && !options.file) {
        console.error(colorize('❌ Error: --content or --file is required for consultation', 'red'));
        process.exit(1);
      }
      await consultExpert(expert, projectData);
      break;

    case 'list':
      await listExperts();
      break;

    default:
      console.error(colorize(`❌ Unknown command: ${command}`, 'red'));
      console.log('Run "expert-cli help" for usage information');
      process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(colorize('❌ Unexpected error:', 'red'), error.message);
    process.exit(1);
  });
}

module.exports = { analyzeProject, consultExpert, listExperts };