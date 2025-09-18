import { AISubAgentExpertTeam } from '../src/index';
import { ProjectSubmission } from '../src/types';

async function demonstrateBasicUsage() {
  console.log('🚀 AI SubAgent Expert Team - Basic Usage Example\n');

  const expertTeam = new AISubAgentExpertTeam();

  console.log('Available Experts:');
  const experts = expertTeam.getAvailableExperts();
  experts.forEach(expert => {
    const status = expert.implemented ? '✅' : '⏳';
    console.log(`  ${status} ${expert.name} - ${expert.role}`);
  });
  console.log();

  const websiteProject: ProjectSubmission = {
    type: 'website',
    content: 'I need to redesign our company website. It should look modern, professional, and convert visitors into customers. The current site feels outdated and confusing. We want to improve user experience and showcase our innovative tech products.',
    requirements: 'Modern design, improve conversion rates, professional appearance, better user experience',
    context: 'Tech startup in AI/ML space, targeting enterprise customers and developers',
    targetAudience: 'Enterprise decision makers, technical professionals, potential partners'
  };

  try {
    console.log('📋 Analyzing Website Redesign Project...\n');

    const result = await expertTeam.analyzeProject(websiteProject);

    console.log('🎯 Project Analysis Results:\n');
    console.log(`Project ID: ${result.projectId}`);
    console.log(`Active Experts: ${result.activeExperts.join(', ')}\n`);

    console.log('📊 Expert Analyses:');
    result.analyses.forEach((analysis, index) => {
      console.log(`\n${index + 1}. ${analysis.expertName} (${analysis.expertRole})`);
      console.log(`   Assessment: ${analysis.assessment}`);
      console.log(`   Confidence: ${analysis.confidenceLevel}`);
      console.log(`   Key Insights:`);
      analysis.insights.forEach(insight => console.log(`     • ${insight}`));

      if (analysis.recommendations.length > 0) {
        console.log(`   Priority Recommendations:`);
        analysis.recommendations
          .filter(rec => rec.priority === 'critical' || rec.priority === 'high')
          .forEach(rec => console.log(`     • [${rec.priority.toUpperCase()}] ${rec.description}`));
      }
    });

    if (result.conflicts.length > 0) {
      console.log('\n🤔 Expert Perspective Conflicts:');
      result.conflicts.forEach(conflict => {
        console.log(`\n   Topic: ${conflict.topic}`);
        conflict.perspectives.forEach(perspective => {
          console.log(`   • ${perspective.expertName}: ${perspective.position}`);
        });
      });
    }

    console.log('\n📋 Project Summary:');
    console.log(expertTeam.getProjectSummary(result));

    console.log('\n🎯 Testing Slash Command Usage...\n');

    const slashCommandResult = await expertTeam.executeSlashCommand(
      '@colorTheorist',
      websiteProject,
      result.analyses
    );

    if (slashCommandResult) {
      console.log(`Manual Expert Consultation - ${slashCommandResult.expertName}:`);
      console.log(`Assessment: ${slashCommandResult.assessment}`);
      console.log('Specific Recommendations:');
      slashCommandResult.recommendations.forEach((rec: any) => {
        console.log(`  • ${rec.description}`);
      });
    }

  } catch (error) {
    console.error('❌ Error during analysis:', error);
  }
}

async function demonstrateBrandProject() {
  console.log('\n\n🎨 Demonstrating Brand Project Analysis...\n');

  const expertTeam = new AISubAgentExpertTeam();

  const brandProject: ProjectSubmission = {
    type: 'brand',
    content: 'We are launching a new sustainable fashion brand targeting environmentally conscious millennials. Need help with brand identity, color palette, and messaging that feels authentic and trustworthy while standing out in the crowded eco-fashion market.',
    requirements: 'Distinctive brand identity, sustainable color palette, authentic messaging, competitive differentiation',
    context: 'Sustainable fashion startup, direct-to-consumer model, premium pricing',
    targetAudience: 'Environmentally conscious millennials, ages 25-40, urban, higher income'
  };

  try {
    const result = await expertTeam.analyzeProject(brandProject);

    console.log('🌱 Sustainable Fashion Brand Analysis:\n');
    console.log(`Active Expert Team: ${result.activeExperts.join(', ')}\n`);

    result.analyses.forEach(analysis => {
      console.log(`${analysis.expertName}: ${analysis.assessment}`);

      const criticalRecs = analysis.recommendations.filter(rec => rec.priority === 'critical');
      if (criticalRecs.length > 0) {
        console.log(`  Critical: ${criticalRecs[0]!.description}\n`);
      }
    });

    console.log('📋 Synthesis:');
    console.log(result.synthesis.summary);

  } catch (error) {
    console.error('❌ Error during brand analysis:', error);
  }
}

if (require.main === module) {
  demonstrateBasicUsage()
    .then(() => demonstrateBrandProject())
    .then(() => {
      console.log('\n✅ Demo completed successfully!');
    })
    .catch(error => {
      console.error('❌ Demo failed:', error);
    });
}