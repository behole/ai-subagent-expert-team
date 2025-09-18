/**
 * AI-Enhanced Claude Code Helper for AI SubAgent Expert Team
 * Simple integration with OpenAI support
 */

const axios = require('axios');

const API_BASE = process.env.EXPERT_API_URL || 'http://localhost:3000';

/**
 * Enhanced expert analysis with AI support
 * @param {string} content - Project description
 * @param {string} type - Project type (optional)
 * @param {string} expert - Specific expert to consult (optional)
 * @param {object} options - Additional options
 * @returns {Promise<string>} - Formatted analysis results
 */
async function analyzeWithAI(content, type = 'other', expert = null, options = {}) {
  try {
    const projectData = {
      content,
      type,
      requirements: options.requirements || '',
      context: options.context || '',
      targetAudience: options.targetAudience || ''
    };

    let response;
    if (expert) {
      // Consult specific expert
      const expertCommand = expert.startsWith('@') ? expert : `@${expert}`;
      response = await axios.post(`${API_BASE}/api/consult/${expertCommand}`, projectData, {
        timeout: 30000,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = response.data.result;
      return formatSingleExpert(result, true);
    } else {
      // Auto-analyze with multiple experts
      response = await axios.post(`${API_BASE}/api/analyze`, projectData, {
        timeout: 40000,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = response.data.result;
      return formatMultipleExperts(result, true);
    }
  } catch (error) {
    return `❌ AI Analysis failed: ${error.message}`;
  }
}

/**
 * Check AI status and capabilities
 * @returns {Promise<object>} - AI status information
 */
async function getAIStatus() {
  try {
    const response = await axios.get(`${API_BASE}/api/ai-status`, { timeout: 5000 });
    return response.data;
  } catch (error) {
    return { error: `Failed to get AI status: ${error.message}` };
  }
}

/**
 * Enhanced project analysis with detailed options
 * @param {object} projectDetails - Comprehensive project information
 * @returns {Promise<string>} - Detailed analysis
 */
async function comprehensiveAnalysis(projectDetails) {
  const {
    content,
    type = 'other',
    requirements = '',
    context = '',
    targetAudience = '',
    goals = '',
    constraints = ''
  } = projectDetails;

  const enhancedContent = `
${content}

${goals ? `Goals: ${goals}` : ''}
${constraints ? `Constraints: ${constraints}` : ''}
`.trim();

  return await analyzeWithAI(enhancedContent, type, null, {
    requirements,
    context,
    targetAudience
  });
}

function formatSingleExpert(analysis, includeAIBadge = false) {
  const aiBadge = includeAIBadge ? ' 🤖' : '';
  let output = `${aiBadge} ${analysis.expertName}\n`;
  output += `Confidence: ${(analysis.confidence || analysis.confidenceLevel || 'medium').toUpperCase()}\n\n`;
  output += `📝 Assessment: ${analysis.assessment}\n\n`;

  if (analysis.insights && analysis.insights.length > 0) {
    output += `💡 Insights:\n`;
    analysis.insights.forEach((insight, index) => {
      output += `${index + 1}. ${insight}\n`;
    });
    output += '\n';
  }

  if (analysis.recommendations && analysis.recommendations.length > 0) {
    output += `📋 Recommendations:\n`;
    analysis.recommendations.forEach((rec, index) => {
      const title = rec.title || `Recommendation ${index + 1}`;
      const desc = rec.description || rec;
      const priority = rec.priority ? ` (${rec.priority})` : '';
      output += `${index + 1}. ${title}${priority}: ${desc}\n`;
    });
    output += '\n';
  }

  if (analysis.uncertaintyAreas && analysis.uncertaintyAreas.length > 0) {
    output += `⚠️ Areas needing clarification:\n`;
    analysis.uncertaintyAreas.forEach(area => {
      output += `• ${area}\n`;
    });
  }

  return output;
}

function formatMultipleExperts(result, includeAIBadge = false) {
  const aiBadge = includeAIBadge ? ' 🤖' : '';
  let output = `${aiBadge} Expert Team Analysis\n`;
  output += `Experts: ${result.activeExperts.join(', ')}\n`;

  if (result.metadata) {
    output += `Analysis Time: ${result.metadata.analysisTime || 'N/A'}ms\n`;
  }
  output += '\n';

  if (result.analyses && result.analyses.length > 0) {
    result.analyses.forEach((analysis, index) => {
      if (index > 0) output += '\n---\n\n';
      output += formatSingleExpert(analysis, false);
    });
  }

  if (result.conflicts && result.conflicts.length > 0) {
    output += '\n⚠️ Expert Conflicts:\n';
    result.conflicts.forEach(conflict => {
      output += `• ${conflict}\n`;
    });
  }

  if (result.synthesis && result.synthesis.prioritizedRecommendations) {
    output += '\n🎯 Top Priority Actions:\n';
    result.synthesis.prioritizedRecommendations
      .filter(rec => rec.priority === 'high')
      .slice(0, 3)
      .forEach((rec, index) => {
        output += `${index + 1}. ${rec.description}\n`;
      });
  }

  return output;
}

// Expert shortcuts with AI support
const aiExperts = {
  color: (content, options = {}) => analyzeWithAI(content, 'design', 'colorTheorist', options),
  design: (content, options = {}) => analyzeWithAI(content, 'design', 'designTheorySpecialist', options),
  ux: (content, options = {}) => analyzeWithAI(content, 'app', 'uxUsabilitySpecialist', options),
  copy: (content, options = {}) => analyzeWithAI(content, 'marketing', 'copywritingStrategist', options),
  brand: (content, options = {}) => analyzeWithAI(content, 'brand', 'brandStrategyAnalyst', options),
  accessibility: (content, options = {}) => analyzeWithAI(content, 'website', 'accessibilityExpert', options),
  performance: (content, options = {}) => analyzeWithAI(content, 'website', 'performanceAnalyst', options),
  tech: (content, options = {}) => analyzeWithAI(content, 'app', 'technicalImplementationAdvisor', options),
  culture: (content, options = {}) => analyzeWithAI(content, 'other', 'culturalContextExpert', options),
  market: (content, options = {}) => analyzeWithAI(content, 'marketing', 'marketResearchAnalyst', options),
  art: (content, options = {}) => analyzeWithAI(content, 'design', 'artHistoryAnalyst', options)
};

// Quick analysis functions with AI
const quickAI = {
  website: (content, options = {}) => analyzeWithAI(content, 'website', null, options),
  brand: (content, options = {}) => analyzeWithAI(content, 'brand', null, options),
  app: (content, options = {}) => analyzeWithAI(content, 'app', null, options),
  marketing: (content, options = {}) => analyzeWithAI(content, 'marketing', null, options),
  design: (content, options = {}) => analyzeWithAI(content, 'design', null, options)
};

/**
 * Check if the API server is running
 * @returns {Promise<boolean>} - Server status
 */
async function checkHealth() {
  try {
    const response = await axios.get(`${API_BASE}/health`, { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Main export
module.exports = {
  // AI-enhanced functions
  analyzeWithAI,
  comprehensiveAnalysis,
  getAIStatus,

  // Expert shortcuts
  experts: aiExperts,
  quick: quickAI,

  // Utility
  checkHealth,
  API_BASE
};

// Example usage demonstration
if (require.main === module) {
  console.log('🤖 AI-Enhanced Claude Code Helper\n');

  console.log('Enhanced Functions:');
  console.log('• analyzeWithAI(content, type, expert, options) - AI-powered analysis');
  console.log('• comprehensiveAnalysis(projectDetails) - Detailed project analysis');
  console.log('• getAIStatus() - Check AI capabilities and configuration');

  console.log('\nAI Expert Shortcuts:');
  console.log('• experts.design(content, options) - AI design analysis');
  console.log('• experts.ux(content, options) - AI UX analysis');
  console.log('• experts.brand(content, options) - AI brand analysis');

  console.log('\nQuick AI Analysis:');
  console.log('• quick.website(content, options) - AI website analysis');
  console.log('• quick.app(content, options) - AI app analysis');

  console.log('\nExample Usage in Claude Code:');
  console.log('const ai = require("./claude-code-ai-helper");');
  console.log('const result = await ai.analyzeWithAI("Design a mobile app", "app");');
  console.log('console.log(result);');

  console.log('\nCheck AI Status:');
  console.log('const status = await ai.getAIStatus();');
  console.log('console.log(status);');
}