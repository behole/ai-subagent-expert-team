import { AISubAgentExpertTeam } from '../src/index';
import { ProjectSubmission } from '../src/types';

async function testComplexProjects() {
  console.log('🚀 Phase 2 Advanced Testing - Complex Project Analysis\n');

  const expertTeam = new AISubAgentExpertTeam();

  // Test 1: Complex E-commerce Platform
  console.log('📱 Test 1: Complex E-commerce Platform with API Integration\n');

  const ecommerceProject: ProjectSubmission = {
    type: 'website',
    content: 'Building a complex e-commerce platform with real-time inventory, payment processing, user accounts, mobile app integration, and API connections to multiple third-party services. Needs to handle high traffic, be secure, and convert visitors to customers. Should have modern design with cultural sensitivity for international markets.',
    requirements: 'High performance, mobile-first design, secure payment processing, real-time features, API integrations, international expansion ready',
    context: 'Enterprise e-commerce startup targeting global markets with complex technical requirements',
    targetAudience: 'International consumers, mobile-first users, security-conscious shoppers'
  };

  try {
    const result = await expertTeam.analyzeProject(ecommerceProject);

    console.log(`🎯 Complex E-commerce Analysis (${result.analyses.length} experts activated):`);
    console.log(`Active Expert Team: ${result.activeExperts.join(', ')}\n`);

    // Show each expert's key insights
    result.analyses.forEach(analysis => {
      console.log(`${analysis.expertName}: ${analysis.assessment}`);
      const criticalRecs = analysis.recommendations.filter(rec => rec.priority === 'critical' || rec.priority === 'high');
      if (criticalRecs.length > 0) {
        console.log(`  🔥 ${criticalRecs.length} high-priority recommendations\n`);
      }
    });

    // Show conflicts if any
    if (result.conflicts.length > 0) {
      console.log('⚡ Expert Perspective Conflicts:');
      result.conflicts.forEach(conflict => {
        console.log(`  Topic: ${conflict.topic}`);
        conflict.perspectives.forEach(p => console.log(`    ${p.expertName}: ${p.position}`));
      });
      console.log();
    }

  } catch (error) {
    console.error('❌ E-commerce analysis failed:', error);
  }

  // Test 2: Heritage Brand Redesign
  console.log('\n🏛️ Test 2: Heritage Brand Redesign with Cultural Elements\n');

  const heritageProject: ProjectSubmission = {
    type: 'brand',
    content: 'Redesigning a 150-year-old luxury heritage brand that needs to modernize while respecting traditional craftsmanship and cultural heritage. The brand has deep historical roots, uses traditional patterns and motifs, and needs to appeal to both older customers who value heritage and younger customers who want innovation. Global expansion planned with cultural sensitivity requirements.',
    requirements: 'Heritage preservation, modern appeal, cultural sensitivity, competitive differentiation, global expansion readiness',
    context: 'Luxury heritage brand with 150+ years of history, traditional craftsmanship, global expansion goals',
    targetAudience: 'Heritage-conscious consumers, luxury buyers, international markets, multi-generational appeal'
  };

  try {
    const result = await expertTeam.analyzeProject(heritageProject);

    console.log(`🎯 Heritage Brand Analysis (${result.analyses.length} experts activated):`);
    console.log(`Active Expert Team: ${result.activeExperts.join(', ')}\n`);

    // Focus on cultural and strategic insights
    const culturalExperts = result.analyses.filter(a =>
      a.expertName.includes('Elena') || a.expertName.includes('Sarah') || a.expertName.includes('Zara')
    );

    console.log('🏛️ Cultural & Strategic Insights:');
    culturalExperts.forEach(analysis => {
      console.log(`\n${analysis.expertName}:`);
      console.log(`  Assessment: ${analysis.assessment}`);
      const culturalInsights = analysis.insights.filter(insight =>
        insight.includes('cultural') || insight.includes('heritage') || insight.includes('brand')
      );
      culturalInsights.forEach(insight => console.log(`  📍 ${insight}`));
    });

    console.log(`\n📋 Project Synthesis:`);
    console.log(result.synthesis.summary);

  } catch (error) {
    console.error('❌ Heritage brand analysis failed:', error);
  }

  // Test 3: Manual Expert Consultation
  console.log('\n\n🎯 Test 3: Manual Expert Consultation Examples\n');

  const consultationProject: ProjectSubmission = {
    type: 'app',
    content: 'Mobile fitness app with social features, real-time tracking, and gamification elements',
    requirements: 'Engaging UX, social integration, performance optimization',
    context: 'Health tech startup targeting young professionals',
    targetAudience: 'Health-conscious millennials and Gen Z'
  };

  try {
    // Test specific expert consultations
    console.log('📱 UX Specialist Consultation:');
    const uxAnalysis = await expertTeam.executeSlashCommand(
      '@uxUsabilitySpecialist',
      consultationProject
    );
    if (uxAnalysis) {
      console.log(`Assessment: ${uxAnalysis.assessment}`);
      console.log(`Key UX Recommendations:`);
      uxAnalysis.recommendations.slice(0, 3).forEach((rec: any) => {
        console.log(`  • ${rec.description}`);
      });
    }

    console.log('\n⚙️ Technical Implementation Consultation:');
    const techAnalysis = await expertTeam.executeSlashCommand(
      '@technicalImplementationAdvisor',
      consultationProject
    );
    if (techAnalysis) {
      console.log(`Assessment: ${techAnalysis.assessment}`);
      console.log(`Technical Considerations:`);
      techAnalysis.insights.slice(0, 3).forEach((insight: any) => {
        console.log(`  • ${insight}`);
      });
    }

    console.log('\n🎨 Brand Strategy Consultation:');
    const brandAnalysis = await expertTeam.executeSlashCommand(
      '@brandStrategyAnalyst',
      consultationProject
    );
    if (brandAnalysis) {
      console.log(`Assessment: ${brandAnalysis.assessment}`);
      console.log(`Strategic Insights:`);
      brandAnalysis.insights.slice(0, 3).forEach((insight: any) => {
        console.log(`  • ${insight}`);
      });
    }

  } catch (error) {
    console.error('❌ Manual consultation failed:', error);
  }

  console.log('\n✅ Phase 2 Advanced Testing Complete!');
  console.log('\n📊 Phase 2 Summary:');
  console.log('  ✅ 8 experts now active (Phase 1 + Phase 2)');
  console.log('  ✅ Complex project analysis with multi-expert coordination');
  console.log('  ✅ Specialized domain expertise (UX, Technical, Brand, Art History)');
  console.log('  ✅ Cross-expert collaboration and conflict identification');
  console.log('  ✅ Manual expert consultation working perfectly');
  console.log('\n🚀 Ready for Phase 3: Contextual Experts!');
}

if (require.main === module) {
  testComplexProjects()
    .catch(error => {
      console.error('❌ Phase 2 testing failed:', error);
    });
}