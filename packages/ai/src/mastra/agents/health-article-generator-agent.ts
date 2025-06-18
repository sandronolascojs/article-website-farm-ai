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
};

const initializeHealthFoodArticleGeneratorAgentConfig = () => {
  return {
    name: 'Health Food Article Generator Agent',
    description: 'You are an agent responsible for generating health food articles.',
    instructions: ({ runtimeContext }: { runtimeContext: RuntimeContext<HealthFoodContext> }) => {
      const titles = runtimeContext.get('existingTitles');
      const categories = runtimeContext.get('categories');
      const language = runtimeContext.get('language');
      const topicScope = 'healthy recipes & nutrition';
      return buildArticleGeneratorPrompt({
        existingTitles: titles,
        categories,
        language,
        topicScope,
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
