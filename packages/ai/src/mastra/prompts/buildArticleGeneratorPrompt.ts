import type { Language } from '@auto-articles/types';
import { UNIVERSAL_LONG_FORM_ARTICLE_AGENT_PROMPT } from './index';

export interface BuildPromptArgs {
  topicScope: string; // "healthy recipes & nutrition", "football workouts", …
  existingTitles: string[];
  categories: string[];
  language: Language;
}

export const buildArticleGeneratorPrompt = ({
  topicScope,
  existingTitles,
  categories,
  language,
}: BuildPromptArgs) =>
  UNIVERSAL_LONG_FORM_ARTICLE_AGENT_PROMPT.replace('{{TOPIC_SCOPE}}', topicScope)
    .replace('{{LANGUAGE}}', language)
    .replace('EXISTING_TITLES', JSON.stringify(existingTitles))
    .replace('AVAILABLE_CATEGORIES', JSON.stringify(categories));
