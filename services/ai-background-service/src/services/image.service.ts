import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { OpenAI } from 'openai';
import { env } from '@/config/env.config';
import { logger } from '@/utils/logger.instance';

/**
 * Style “memory” block shared by every frame.
 * You can replace colours / camera once and every subsequent frame keeps
 * the look consistent without external state.
 */
const DEFAULT_ANIME_STYLE_BLOCK = `
Camera: dynamic 3-point perspective, low-angle hero shot, 50 mm lens
Style: bold black ink outline, hard cel-shading, two-tone shadows, dramatic radial speed-lines
Palette: saturated Niji colours (vibrant cyan, scarlet accents, golden rim-light)
Effects: wind-swept hair, glossy manga eyes, motion-blur debris, spark highlights
Quality: 8k upscale, razor-sharp edges, noise-free, screen-tone halftone texture
Negative: watermark, text, logo, UI, low-quality render, 3d game asset
Note: rendered in a stylised PG-13 anime aesthetic
`.trim();

export interface SeriesStyle {
  /** Identity slug reused in every frame */
  id: string;
  /** Fixed style block (camera, colours, etc.). If undefined, uses DEFAULT_ANIME_STYLE_BLOCK */
  styleBlock?: string;
}

interface GenerateFramesParams {
  series: SeriesStyle;
  scenes: string[];
}

export interface GeneratedImageResult {
  prompt: string;
  imagePath: string;
  imageUrl?: string;
  error?: string;
}

export class ImageService {
  private openai: OpenAI;
  private outputDir: string;

  constructor(outputDir: string = './generated') {
    this.openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    this.outputDir = path.resolve(outputDir);
    this.ensureOutputDir().catch((err) => {
      logger.error('Failed to create output directory:', err);
    });
  }

  private async ensureOutputDir() {
    try {
      const outputDirExists = await fs
        .stat(this.outputDir)
        .then(() => true)
        .catch(() => false);
      if (!outputDirExists) {
        await fs.mkdir(this.outputDir, { recursive: true });
      }
    } catch (err) {
      throw new Error(`Failed to ensure output directory: ${err}`);
    }
  }

  public async generateFrames({
    series,
    scenes,
  }: GenerateFramesParams): Promise<GeneratedImageResult[]> {
    if (!Array.isArray(scenes) || scenes.length === 0) {
      throw new Error('Scenes array must not be empty');
    }
    await this.ensureOutputDir();
    const results: GeneratedImageResult[] = [];

    for (const [idx, scene] of scenes.entries()) {
      const prompt = this.buildPrompt(series, scene, idx);
      try {
        const imageUrl = await this.generateImage(prompt);
        const imagePath = await this.downloadImage(imageUrl, prompt, idx);
        results.push({ prompt, imagePath, imageUrl });
      } catch (error: unknown) {
        logger.error(`Frame ${idx} failed`, { error: error as Error });
        results.push({
          prompt,
          imagePath: '',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
    return results;
  }

  private async generateImage(prompt: string): Promise<string> {
    try {
      return await this.callImageAPI(prompt);
    } catch (err: any) {
      if (
        err?.type === 'image_generation_user_error' ||
        JSON.stringify(err).includes('image_generation_user_error')
      ) {
        logger.warn('Retrying with natural style and extra-safe suffix');
        const softerPrompt =
          prompt +
          '\n\nIllustrated in a wholesome, PG rated anime style, no fighting detail, no violence.';
        return await this.callImageAPI(softerPrompt);
      }
      throw err;
    }
  }

  private async callImageAPI(prompt: string): Promise<string> {
    const response = await this.openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      model: 'dall-e-3',
      quality: 'standard',
    });
    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) throw new Error('No image URL returned from OpenAI');
    return imageUrl;
  }

  private async downloadImage(url: string, prompt: string, frame: number): Promise<string> {
    const base = this.sanitizeFileName(prompt).slice(0, 40);
    const fileName = `${base}_${String(frame).padStart(3, '0')}.png`;
    const filePath = path.join(this.outputDir, fileName);

    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`Failed to download image (${res.status})`);

    const fileStream = fss.createWriteStream(filePath);
    await pipeline(res.body, fileStream);
    return filePath;
  }

  private sanitizeFileName(text: string): string {
    return text
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
      .slice(0, 50);
  }

  private buildPrompt(series: SeriesStyle, scene: string, frameIndex: number): string {
    const frameTag = String(frameIndex + 1).padStart(3, '0');
    const styleBlock = (series.styleBlock ?? DEFAULT_ANIME_STYLE_BLOCK)
      .split('\n')
      .map((l) => l.trim())
      .join('\n');

    return [
      `ID: ${series.id}-${frameTag}`,
      `Scene: anime-style illustration of ${scene}`,
      styleBlock,
    ].join('\n');
  }
}
