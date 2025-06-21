import type { HealthFoodArticleGeneratorAgent } from '@auto-articles/ai/src/mastra';
import { HealthFoodAppCategory, Language, WebsiteId } from '@auto-articles/types';
import type { Logger } from '@auto-articles/utils';
import { CategoriesRepository } from '@/repositories/categories.repository';
import { ArticlesRepository } from '@/repositories/articles.repository';
import { env } from '@/config/env.config';
import { SupabaseStorageService } from '@auto-articles/shared';
import { HealthContentImageGeneratorService } from './healthContentImageGenerator.service';
import { ImageCompressorService } from './imageCompressor.service';

export class GenerateHealthContentService {
  private readonly logger: Logger;
  private readonly agent: HealthFoodArticleGeneratorAgent;
  private readonly categoriesRepository: CategoriesRepository;
  private readonly articlesRepository: ArticlesRepository;
  private readonly healthContentImageGeneratorService: HealthContentImageGeneratorService;
  private readonly supabaseStorageService: SupabaseStorageService;
  private readonly imageCompressorService: ImageCompressorService;

  constructor(logger: Logger, agent: HealthFoodArticleGeneratorAgent) {
    this.logger = logger;
    this.agent = agent;
    this.categoriesRepository = new CategoriesRepository(logger);
    this.articlesRepository = new ArticlesRepository(logger);
    this.healthContentImageGeneratorService = new HealthContentImageGeneratorService(logger);
    this.supabaseStorageService = new SupabaseStorageService({
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_KEY,
      bucketName: env.SUPABASE_BUCKET_IMAGES_URL,
    });
    this.imageCompressorService = new ImageCompressorService(logger);
  }

  async generateHealthArticle(amount: number = 1) {
    const recentUsedCategories: string[] = [];
    const recentUsedPrimaryWords: string[] = [];

    for (let i = 0; i < amount; i++) {
      const existingTitlesFromDb = await this.articlesRepository.getAllExistingArticleTitles({
        websiteId: WebsiteId.HEALTH_FOOD_BLOG,
      });
      const existingTitles = existingTitlesFromDb.map((article) => article.title);

      const result = await this.agent.generateArticle({
        existingTitles,
        categories: Object.values(HealthFoodAppCategory),
        language: Language.ENGLISH_US,
        recentCategories: recentUsedCategories,
        recentPrimaryWords: recentUsedPrimaryWords,
      });

      recentUsedCategories.push(result.category);
      recentUsedPrimaryWords.push(...result.keywords);

      this.logger.info(`Generated title: ${result.title}`);

      let category = await this.categoriesRepository.getCategoryByNameAndWebsiteId({
        name: result.category,
        websiteId: WebsiteId.HEALTH_FOOD_BLOG,
      });

      if (!category) {
        const [insertedCategory] = await this.categoriesRepository.createCategory({
          name: result.category,
          slug: result.category.toLowerCase().replace(/ /g, '-'),
          websiteId: WebsiteId.HEALTH_FOOD_BLOG,
        });
        category = insertedCategory;
        this.logger.info(
          `Category not found, inserting: ${result.category} with id: ${insertedCategory?.categoryId}`,
        );
      }

      const imageGenerated = await this.healthContentImageGeneratorService.generateImage({
        prompt: result.imagePrompt,
        aspectRatio: '16:9',
        model: 'sd3.5-large-turbo',
      });
      const compressedImage = await this.imageCompressorService.compressToWebp(
        imageGenerated.imageBuffer,
      );

      const imageKey = `/articles/${WebsiteId.HEALTH_FOOD_BLOG}/${result.slug}-${Date.now()}-image.webp`;

      await this.supabaseStorageService.uploadFile({
        key: imageKey,
        body: compressedImage.compressedBuffer,
        contentType: compressedImage.contentType,
      });

      await this.articlesRepository.createArticle({
        title: result.title,
        content: result.content,
        keywords: result.keywords,
        summary: result.summary,
        imageUrl: imageKey,
        slug: result.slug,
        processedAt: new Date(),
        categoryId: category?.categoryId,
        websiteId: WebsiteId.HEALTH_FOOD_BLOG,
      });

      this.logger.info(`Inserted article: ${result.title}`);
    }
  }
}
