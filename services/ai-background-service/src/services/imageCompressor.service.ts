import type { Logger } from '@auto-articles/utils';
import sharp from 'sharp';

export interface CompressImageOptions {
  quality?: number; // 0-100, default 80
  width?: number; // Optional resize width
  height?: number; // Optional resize height
}

export class ImageCompressorService {
  constructor(private readonly logger: Logger) {}
  /**
   * Compress an image buffer for the web and return a WebP image buffer.
   * @param inputBuffer The input image buffer (any format supported by sharp)
   * @param options Compression options (quality, resize)
   * @returns Compressed WebP image buffer
   */
  public async compressToWebp(inputBuffer: Buffer, options: CompressImageOptions = {}) {
    const { quality = 70, width, height } = options;
    let transformer = sharp(inputBuffer);
    if (width || height) {
      transformer = transformer.resize(width, height);
    }
    const compressedBuffer = await transformer.webp({ quality }).toBuffer();

    return {
      compressedBuffer,
      contentType: 'image/webp',
    };
  }
}
