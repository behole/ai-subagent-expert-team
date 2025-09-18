/**
 * Quick Expert Analysis for Claude Code
 * Simple utility for rapid expert consultation
 */

const axios = require('axios');

const API_BASE = process.env.EXPERT_API_URL || 'http://localhost:3000';

/**
 * Quick analysis function for Claude Code integration
 * @param {string} content - Project description or content
 * @param {string} type - Project type (optional)
 * @param {string} expert - Specific expert to consult (optional)
 * @returns {Promise<string>} - Formatted analysis results
 */
async function quickAnalysis(content, type = 'other', expert = null) {
  try {
    const projectData = { content, type };

    let response;
    if (expert) {
      // Consult specific expert
      const expertCommand = expert.startsWith('@') ? expert : `@${expert}`;
      response = await axios.post(`${API_BASE}/api/consult/${expertCommand}`, projectData, {
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = response.data.result;
      return formatSingleExpert(result);
    } else {
      // Auto-analyze with multiple experts
      response = await axios.post(`${API_BASE}/api/analyze`, projectData, {
        timeout: 20000,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = response.data.result;
      return formatMultipleExperts(result);
    }
  } catch (error) {
    return `❌ Analysis failed: ${error.message}`;
  }
}

function formatSingleExpert(analysis) {
  let output = `🤖 ${analysis.expertName}\n`;
  output += `Confidence: ${(analysis.confidence || 'medium').toUpperCase()}\n\n`;
  output += `📝 Assessment: ${analysis.assessment}\n\n`;

  if (analysis.insights) {
    output += `💡 Insights: ${analysis.insights}\n\n`;
  }

  if (analysis.recommendations && analysis.recommendations.length > 0) {
    output += `📋 Recommendations:\n`;
    analysis.recommendations.forEach((rec, index) => {
      const title = rec.title || `Recommendation ${index + 1}`;
      const desc = rec.description || rec;
      output += `${index + 1}. ${title}: ${desc}\n`;
    });
  }

  return output;
}

function formatMultipleExperts(result) {
  let output = `🎯 Expert Team Analysis\n`;
  output += `Experts: ${result.activeExperts.join(', ')}\n\n`;

  if (result.analyses && result.analyses.length > 0) {
    result.analyses.forEach((analysis, index) => {
      if (index > 0) output += '\n---\n\n';
      output += formatSingleExpert(analysis);
    });
  }

  if (result.conflicts && result.conflicts.length > 0) {
    output += '\n⚠️ Conflicts:\n';
    result.conflicts.forEach(conflict => {
      output += `• ${conflict}\n`;
    });
  }

  return output;
}

/**
 * Get list of available experts
 * @returns {Promise<Array>} - List of expert objects
 */
async function getExperts() {
  try {
    const response = await axios.get(`${API_BASE}/api/experts`, { timeout: 5000 });
    return response.data.experts.filter(e => e.implemented);
  } catch (error) {
    throw new Error(`Failed to fetch experts: ${error.message}`);
  }
}

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

// Export for use in other scripts
module.exports = {
  quickAnalysis,
  getExperts,
  checkHealth,
  API_BASE
};

// CLI usage when run directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node quick-expert.js "your project description" [type] [expert]');
    console.log('Example: node quick-expert.js "Design a mobile app" website @uxUsabilitySpecialist');
    process.exit(1);
  }

  const [content, type, expert] = args;

  quickAnalysis(content, type, expert)
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error.message));
}