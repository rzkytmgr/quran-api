import { appConfig } from '@config/app-config';
import { padNumber } from './pad-number';

const surahAudioUrl = (recitationFolder: string, surahSequence: number): string => `${appConfig.serviceUrls.quranicaudio}${recitationFolder}${padNumber(surahSequence, 3)}.mp3`;

const ayahAudioUrl = (recitationFolder: string, surahSequence: number, ayahSequence: number): string =>
  `${appConfig.serviceUrls.everyayah}${recitationFolder}${padNumber(surahSequence, 3)}${padNumber(ayahSequence, 3)}.mp3`;

export { ayahAudioUrl, surahAudioUrl };
