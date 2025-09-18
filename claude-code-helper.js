/**
 * Claude Code Helper for AI SubAgent Expert Team
 * Easy integration functions for use within Claude Code sessions
 */

const { quickAnalysis, getExperts, checkHealth } = require('./cli/quick-expert');

/**
 * Analyze text content with the expert team
 * Usage in Claude Code: const result = await analyzeWithExperts("your content");
 */
async function analyzeWithExperts(content, type = 'other') {
  console.log('🔍 Consulting AI Expert Team...\n');

  const isHealthy = await checkHealth();
  if (!isHealthy) {
    return '❌ Expert API server is not running. Please start with: npm run start:prod';
  }

  const result = await quickAnalysis(content, type);
  return result;
}

/**
 * Consult a specific expert
 * Usage in Claude Code: const result = await consultExpert("colorTheorist", "design advice");
 */
async function consultExpert(expertName, content, type = 'other') {
  console.log(`🤖 Consulting ${expertName}...\n`);

  const isHealthy = await checkHealth();
  if (!isHealthy) {
    return '❌ Expert API server is not running. Please start with: npm run start:prod';
  }

  const result = await quickAnalysis(content, type, expertName);
  return result;
}

/**
 * List all available experts
 * Usage in Claude Code: const experts = await listAvailableExperts();
 */
async function listAvailableExperts() {
  console.log('📋 Available AI Experts:\n');

  try {
    const experts = await getExperts();
    return experts.map(expert => ({
      name: expert.name,
      command: `@${expert.name.toLowerCase().replace(/\s+/g, '')}`,
      role: expert.role
    }));
  } catch (error) {
    return `❌ ${error.message}`;
  }
}

/**
 * Quick design analysis (automatically selects design-focused experts)
 * Usage in Claude Code: const result = await quickDesignAnalysis("my design concept");
 */
async function quickDesignAnalysis(content) {
  return await analyzeWithExperts(content, 'design');
}

/**
 * Quick website analysis (automatically selects web-focused experts)
 * Usage in Claude Code: const result = await quickWebsiteAnalysis("my website idea");
 */
async function quickWebsiteAnalysis(content) {
  return await analyzeWithExperts(content, 'website');
}

/**
 * Quick brand analysis (automatically selects brand-focused experts)
 * Usage in Claude Code: const result = await quickBrandAnalysis("my brand concept");
 */
async function quickBrandAnalysis(content) {
  return await analyzeWithExperts(content, 'brand');
}

// Shorthand aliases for common experts
const experts = {
  color: (content) => consultExpert('colorTheorist', content),
  design: (content) => consultExpert('designTheorySpecialist', content),
  ux: (content) => consultExpert('uxUsabilitySpecialist', content),
  copy: (content) => consultExpert('copywritingStrategist', content),
  brand: (content) => consultExpert('brandStrategyAnalyst', content),
  accessibility: (content) => consultExpert('accessibilityExpert', content),
  performance: (content) => consultExpert('performanceAnalyst', content),
  tech: (content) => consultExpert('technicalImplementationAdvisor', content),
  culture: (content) => consultExpert('culturalContextExpert', content),
  market: (content) => consultExpert('marketResearchAnalyst', content),
  art: (content) => consultExpert('artHistoryAnalyst', content)
};

// Main functions for export
module.exports = {
  // Primary functions
  analyzeWithExperts,
  consultExpert,
  listAvailableExperts,

  // Quick analysis functions
  quickDesignAnalysis,
  quickWebsiteAnalysis,
  quickBrandAnalysis,

  // Expert shortcuts
  experts,

  // Utility
  checkHealth
};

// Example usage demonstration
if (require.main === module) {
  console.log('🚀 Claude Code Helper for AI SubAgent Expert Team\n');
  console.log('Available Functions:');
  console.log('• analyzeWithExperts(content, type) - Full expert team analysis');
  console.log('• consultExpert(expertName, content) - Single expert consultation');
  console.log('• listAvailableExperts() - Get all available experts');
  console.log('• quickDesignAnalysis(content) - Quick design feedback');
  console.log('• quickWebsiteAnalysis(content) - Quick website feedback');
  console.log('• quickBrandAnalysis(content) - Quick brand feedback');
  console.log('\nExpert Shortcuts:');
  console.log('• experts.color(content) - Color theory analysis');
  console.log('• experts.ux(content) - UX/usability analysis');
  console.log('• experts.brand(content) - Brand strategy analysis');
  console.log('• experts.accessibility(content) - Accessibility analysis');
  console.log('• experts.performance(content) - Performance analysis');
  console.log('\nExample Usage in Claude Code:');
  console.log('const helper = require("./claude-code-helper");');
  console.log('const result = await helper.analyzeWithExperts("Design a mobile app");');
  console.log('console.log(result);');
}