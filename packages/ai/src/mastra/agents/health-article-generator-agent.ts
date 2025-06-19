import { Agent, type AgentConfig } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { BaseAgent } from './baseAgent';
import { RuntimeContext } from '@mastra/core/runtime-context';
import { ArticleHealthFoodOutput, type Language } from '@auto-articles/types';
import type { Mastra } from '@mastra/core';
import { buildArticleGeneratorPrompt } from '../prompts/buildArticleGeneratorPrompt';

export type HealthFoodContext = {
  existingTitles: string[];
  categories: string[];
  language: Language;
  recentCategories: string[];
  recentPrimaryWords: string[];
};

const initializeHealthFoodArticleGeneratorAgentConfig = () => {
  return {
    name: 'Health Food Article Generator Agent',
    description: 'You are an agent responsible for generating health food articles.',
    instructions: ({ runtimeContext }: { runtimeContext: RuntimeContext<HealthFoodContext> }) => {
      const existingTitles = runtimeContext.get('existingTitles');
      const categories = runtimeContext.get('categories');
      const language = runtimeContext.get('language');
      const topicScope =
        'healthy recipes, healthy food, healthy diet, healthy lifestyle, healthy eating, healthy food recipes, healthy diet recipes, healthy lifestyle recipes, healthy eating recipes';
      const recentCategories = runtimeContext.get('recentCategories');
      const recentPrimaryWords = runtimeContext.get('recentPrimaryWords');
      return buildArticleGeneratorPrompt({
        existingTitles,
        categories,
        language,
        topicScope,
        recentCategories,
        recentPrimaryWords,
      });
    },
    model: openai('gpt-4o-mini'),
  } as AgentConfig;
};

export class HealthFoodArticleGeneratorAgent extends BaseAgent {
  constructor({
    mastra,
  }: {
    mastra?: Mastra;
  } = {}) {
    super(
      initializeHealthFoodArticleGeneratorAgentConfig(),
      new Agent({
        ...initializeHealthFoodArticleGeneratorAgentConfig(),
        mastra,
      }),
    );
  }

  async generateArticle(context: HealthFoodContext) {
    const agent = this.getAgent();

    const runtime = new RuntimeContext<HealthFoodContext>();
    runtime.set('existingTitles', context.existingTitles);
    runtime.set('categories', context.categories);
    runtime.set('language', context.language);
    runtime.set('recentCategories', context.recentCategories);
    runtime.set('recentPrimaryWords', context.recentPrimaryWords);

    const result = await agent.generate([], {
      runtimeContext: runtime,
      output: ArticleHealthFoodOutput,
      temperature: 0.7,
      telemetry: {
        isEnabled: true,
        functionId: 'health-food-article-generator-agent-generateArticle',
      },
    });

    return result.object;
  }
}
