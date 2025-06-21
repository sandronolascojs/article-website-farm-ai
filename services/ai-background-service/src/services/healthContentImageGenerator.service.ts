import { env } from '@/config/env.config';
import type { Logger } from '@auto-articles/utils';

export interface GenerateImageOptions {
  prompt: string;
  aspectRatio?: '16:9' | '1:1' | '21:9' | '2:3' | '3:2' | '4:5' | '5:4' | '9:16' | '9:21';
  model?: 'sd3.5-large' | 'sd3.5-large-turbo' | 'sd3.5-medium';
  outputFormat?: 'jpeg' | 'png';
  stylePreset?:
    | '3d-model'
    | 'analog-film'
    | 'anime'
    | 'cinematic'
    | 'comic-book'
    | 'digital-art'
    | 'enhance'
    | 'fantasy-art'
    | 'isometric'
    | 'line-art'
    | 'low-poly'
    | 'modeling-compound'
    | 'neon-punk'
    | 'origami'
    | 'photographic'
    | 'pixel-art'
    | 'tile-texture';
  negativePrompt?: string;
  cfgScale?: number;
  seed?: number;
}

export interface GenerateImageResult {
  imageBuffer: Buffer;
  contentType: string;
}

export class HealthContentImageGeneratorService {
  private readonly apiUrl = 'https://api.stability.ai/v2beta/stable-image/generate/ultra';

  constructor(private readonly logger: Logger) {}

  public async generateImage({
    prompt,
    aspectRatio = '16:9',
    outputFormat = 'png',
    stylePreset,
    seed,
  }: GenerateImageOptions): Promise<GenerateImageResult> {
    try {
      const fixedPrompt = `${prompt}`;
      const fixedStylePreset = stylePreset || 'photographic';

      const formData = new FormData();
      formData.append('prompt', fixedPrompt);
      formData.append('aspect_ratio', aspectRatio);
      formData.append('output_format', outputFormat);
      formData.append('style_preset', fixedStylePreset);
      if (seed) formData.append('seed', seed.toString());

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          Authorization: env.STABILITY_API_KEY,
          Accept: 'image/*',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error('Stable Diffusion API error', {
          status: response.status,
          error: errorText,
        });
        throw new Error(`Stable Diffusion API error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || 'image/png';
      const imageBuffer = Buffer.from(await response.arrayBuffer());
      this.logger.info('Image generated successfully with Stable Diffusion 3.5', { prompt });
      return { imageBuffer, contentType };
    } catch (error) {
      this.logger.error('Failed to generate image with Stable Diffusion 3.5', {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}
