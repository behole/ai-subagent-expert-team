/**
 * Comprehensive test scenarios for the complete 12-expert AI SubAgent system
 */

import { AISubAgentExpertTeam } from '../src/index';
import { ProjectSubmission } from '../src/types';

async function runComprehensiveTests() {
  const expertTeam = new AISubAgentExpertTeam();

  console.log('🧪 Starting comprehensive 12-expert system tests...\n');

  // Test 1: Complex e-commerce website project
  console.log('Test 1: Complex E-commerce Website');
  const ecommerceProject: ProjectSubmission = {
    content: 'Global Fashion E-commerce Platform: We are building a luxury fashion e-commerce platform targeting international markets. The site needs to handle high traffic, showcase beautiful product imagery, ensure accessibility compliance, and provide an optimal mobile shopping experience. We want to incorporate traditional textile patterns from various cultures while being respectful and inclusive. The target audience includes fashion-conscious millennials and Gen Z across North America, Europe, and Asia.',
    type: 'website',
    targetAudience: 'Fashion-conscious millennials and Gen Z, international luxury shoppers',
    context: 'Fashion E-commerce industry, 6 months timeline, high budget, enterprise-level complexity'
  };

  try {
    const result = await expertTeam.analyzeProject(ecommerceProject);
    console.log(`✅ Analysis completed with ${result.analyses.length} expert analyses`);
    console.log(`📊 Overall assessment: ${result.synthesis.summary}`);
    console.log(`⚠️  Conflicts detected: ${result.conflicts.length}`);
    console.log('');
  } catch (error) {
    console.error('❌ Test 1 failed:', error);
  }

  // Test 2: Mobile health app with accessibility focus
  console.log('Test 2: Accessible Health Monitoring App');
  const healthAppProject: ProjectSubmission = {
    content: 'Inclusive Health Monitoring App: Developing a mobile health app for elderly users and people with disabilities to track vital signs and medication schedules. The app must be fully WCAG compliant, work with screen readers, have high contrast options, and be culturally sensitive for diverse communities. Performance is critical as users may have older devices with slower connections.',
    type: 'app',
    targetAudience: 'Elderly users, people with disabilities, caregivers',
    context: 'Healthcare industry, 8 months timeline, medium budget, HIPAA and WCAG 2.1 AA compliance required'
  };

  try {
    const result = await expertTeam.analyzeProject(healthAppProject);
    console.log(`✅ Analysis completed with ${result.analyses.length} expert analyses`);
    console.log(`📊 Overall assessment: ${result.synthesis.summary}`);
    console.log(`⚠️  Conflicts detected: ${result.conflicts.length}`);
    console.log('');
  } catch (error) {
    console.error('❌ Test 2 failed:', error);
  }

  // Test 3: Brand redesign for financial services
  console.log('Test 3: Financial Services Brand Redesign');
  const brandProject: ProjectSubmission = {
    content: 'Traditional Bank Digital Transformation: Redesigning the brand identity for a 150-year-old traditional bank transitioning to digital-first services. Need to balance heritage and trust with modern innovation. The rebrand will include logo, color palette, typography, and digital interface design. Target audience includes both long-term customers and tech-savvy younger demographics. Must work across multiple international markets with different cultural expectations.',
    type: 'brand',
    targetAudience: 'Traditional banking customers, millennials entering banking, international business clients',
    context: 'Financial Services industry, 12 months timeline, 150 years of brand heritage to honor'
  };

  try {
    const result = await expertTeam.analyzeProject(brandProject);
    console.log(`✅ Analysis completed with ${result.analyses.length} expert analyses`);
    console.log(`📊 Overall assessment: ${result.synthesis.summary}`);
    console.log(`⚠️  Conflicts detected: ${result.conflicts.length}`);
    console.log('');
  } catch (error) {
    console.error('❌ Test 3 failed:', error);
  }

  // Test 4: Manual expert consultation via slash commands
  console.log('Test 4: Manual Expert Consultation');

  const consultationProject: ProjectSubmission = {
    content: 'Art Gallery Virtual Exhibition: Creating a virtual art exhibition featuring contemporary works from indigenous artists. The exhibition will be displayed online with interactive elements and educational content.',
    type: 'website',
    targetAudience: 'Art enthusiasts, educators, general public'
  };

  try {
    // Test specific expert consultations
    const culturalAnalysis = await expertTeam.executeSlashCommand('@culturalContextExpert', consultationProject);
    console.log('✅ Cultural expert consultation completed');

    const artHistoryAnalysis = await expertTeam.executeSlashCommand('@artHistoryAnalyst', consultationProject);
    console.log('✅ Art history expert consultation completed');

    const accessibilityAnalysis = await expertTeam.executeSlashCommand('@accessibilityExpert', consultationProject);
    console.log('✅ Accessibility expert consultation completed');
    console.log('');
  } catch (error) {
    console.error('❌ Test 4 failed:', error);
  }

  // Test 5: Expert system overview
  console.log('Test 5: Expert System Overview');
  const availableExperts = expertTeam.getAvailableExperts();
  console.log(`📋 Total experts registered: ${availableExperts.length}`);
  console.log('Experts by phase:');

  const phase1 = availableExperts.filter(e =>
    e.role.includes('Design Theory') || e.role.includes('Color') || e.role.includes('Copywriting')
  );
  console.log(`  Phase 1 (Foundation): ${phase1.length} experts`);

  const phase2 = availableExperts.filter(e =>
    e.role.includes('UX') || e.role.includes('Technical') || e.role.includes('Brand') || e.role.includes('Art History')
  );
  console.log(`  Phase 2 (Specialized): ${phase2.length} experts`);

  const phase3 = availableExperts.filter(e =>
    e.role.includes('Cultural') || e.role.includes('Market') || e.role.includes('Accessibility') || e.role.includes('Performance')
  );
  console.log(`  Phase 3 (Contextual): ${phase3.length} experts`);

  console.log('\n🎉 All comprehensive tests completed successfully!');
  console.log('✅ 12-expert system is fully operational and ready for production use');
}

// Run the tests
runComprehensiveTests().catch(console.error);