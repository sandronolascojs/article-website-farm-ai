import { ImageService } from '@/services/image.service';
import { logger } from '@/utils/logger.instance';
import { AsyncTask, CronJob } from 'toad-scheduler';

export const generateImagesScenesJob = new CronJob(
  {
    cronExpression: '*/1 * * * *',
  },
  new AsyncTask('generate-images-scenes', async () => {
    logger.info('Generating images');
    const imageService = new ImageService();

    const fightScenes: string[] = [
      // 001
      'anime-style illustration of The elastic-armed hero springs forward, unleashing a rapid elastic strike that ripples the air toward a towering sea beast, scattering sparkling sea spray like shimmering glass.',
      // 002
      'anime-style illustration of The creature counters with a sweeping tidal swing; the hero flips backward mid-air, drawing a sweeping crescent of condensed wind and parting the wave in two, water bursting into rainbow mist.',
      // 003
      'anime-style illustration of Landing on the slick deck, he channels glowing crimson energy into his fist, then releases a dazzling Comet Burst flurry that peppers the monster’s scales with radiant impacts.',
      // 004
      'anime-style illustration of As the beast bellows, the hero coils both arms like springs, rockets skyward, and delivers a final twin-spiral impact to the crown of its head, lightning and ocean spray exploding in a vibrant starburst.',
    ];

    await imageService.generateFrames({
      series: { id: 'SHONEN-CORE' },
      scenes: fightScenes,
    });

    logger.info('Images generated');
  }),
);

export const imageGeneratorJobs = [generateImagesScenesJob];
