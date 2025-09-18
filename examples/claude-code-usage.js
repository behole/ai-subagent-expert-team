/**
 * Claude Code Usage Examples for AI SubAgent Expert Team
 * Copy and paste these examples into Claude Code for immediate use
 */

const helper = require('./claude-code-helper');

// Example 1: Quick Analysis Functions
async function example1_QuickAnalysis() {
  console.log("=== EXAMPLE 1: Quick Analysis ===");

  // Analyze a website project
  const websiteResult = await helper.quickWebsiteAnalysis(
    "I need to build a SaaS landing page that converts visitors into trial users"
  );
  console.log(websiteResult);

  // Analyze a brand project
  const brandResult = await helper.quickBrandAnalysis(
    "Creating a brand for a sustainable fashion startup targeting Gen Z"
  );
  console.log(brandResult);
}

// Example 2: Expert Shortcuts
async function example2_ExpertShortcuts() {
  console.log("=== EXAMPLE 2: Expert Shortcuts ===");

  // Get color advice
  const colorAdvice = await helper.experts.color(
    "What colors should I use for a fintech app targeting young professionals?"
  );
  console.log("Color Expert Says:", colorAdvice);

  // Get UX feedback
  const uxFeedback = await helper.experts.ux(
    "How can I improve the onboarding flow for a complex B2B software?"
  );
  console.log("UX Expert Says:", uxFeedback);

  // Get accessibility review
  const a11yReview = await helper.experts.accessibility(
    "Review this design for accessibility compliance"
  );
  console.log("Accessibility Expert Says:", a11yReview);
}

// Example 3: Full Team Analysis
async function example3_FullTeamAnalysis() {
  console.log("=== EXAMPLE 3: Full Team Analysis ===");

  const fullAnalysis = await helper.analyzeWithExperts(
    `Design a mobile app for food delivery that needs to:
    - Load fast on slower connections
    - Be accessible to users with disabilities
    - Appeal to busy professionals aged 25-40
    - Convert well and reduce cart abandonment
    - Work seamlessly across iOS and Android`,
    'app'
  );

  console.log(fullAnalysis);
}

// Example 4: Specific Expert Consultation
async function example4_SpecificExpert() {
  console.log("=== EXAMPLE 4: Specific Expert ===");

  const performanceAdvice = await helper.consultExpert(
    'performanceAnalyst',
    'My React app is slow on mobile. How can I optimize it?',
    'app'
  );

  console.log(performanceAdvice);
}

// Example 5: Multiple Expert Opinions
async function example5_MultipleExperts() {
  console.log("=== EXAMPLE 5: Multiple Expert Opinions ===");

  const projectDesc = "Design a dashboard for healthcare professionals";

  // Get different perspectives
  const designPerspective = await helper.experts.design(projectDesc);
  const uxPerspective = await helper.experts.ux(projectDesc);
  const accessibilityPerspective = await helper.experts.accessibility(projectDesc);

  console.log("Design Perspective:", designPerspective);
  console.log("UX Perspective:", uxPerspective);
  console.log("Accessibility Perspective:", accessibilityPerspective);
}

// Example 6: Error Handling
async function example6_ErrorHandling() {
  console.log("=== EXAMPLE 6: Error Handling ===");

  try {
    // Check if server is running first
    const isHealthy = await helper.checkHealth();
    if (!isHealthy) {
      console.log("❌ Server not running. Start with: npm run start:prod");
      return;
    }

    const result = await helper.analyzeWithExperts("Your project description");
    console.log(result);

  } catch (error) {
    console.error("Analysis failed:", error.message);
  }
}

// Run examples (uncomment the ones you want to test)
async function runExamples() {
  try {
    // await example1_QuickAnalysis();
    // await example2_ExpertShortcuts();
    // await example3_FullTeamAnalysis();
    // await example4_SpecificExpert();
    // await example5_MultipleExperts();
    // await example6_ErrorHandling();

    console.log("Examples completed! Uncomment the examples you want to run.");
  } catch (error) {
    console.error("Error running examples:", error.message);
  }
}

runExamples();

// Export for use in other scripts
module.exports = {
  example1_QuickAnalysis,
  example2_ExpertShortcuts,
  example3_FullTeamAnalysis,
  example4_SpecificExpert,
  example5_MultipleExperts,
  example6_ErrorHandling
};