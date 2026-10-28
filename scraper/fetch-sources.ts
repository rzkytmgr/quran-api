import axios from 'axios';
import { ALQURAN_CLOUD_EDITIONS, HTTP_CONFIG, MINISTRY_OF_RELIGION_ORIGIN, REQUEST_HEADERS, SOURCE_URLS } from './config';
import type { IAlQuranCloudResponse, IMinistryOfReligionResponse, IQuranEndpointResponse } from './types';

const waitFor = (delayMs: number) => new Promise((resolveWait) => setTimeout(resolveWait, delayMs));

const fetchEndpointJson = async <TResponseBody>(baseUrl: string, endpointPath: string, originUrl: string = baseUrl): Promise<TResponseBody> => {
  const requestUrl = `${baseUrl}${endpointPath}`;
  let lastFailureMessage = 'unknown error';

  for (let attempt = 1; attempt <= HTTP_CONFIG.maxAttempts; attempt += 1) {
    try {
      const response = await axios.request<TResponseBody>({
        url: requestUrl,
        method: 'GET',
        timeout: HTTP_CONFIG.timeoutMs,
        headers: { ...REQUEST_HEADERS, Origin: originUrl },
      });

      return response.data;
    } catch (error: unknown) {
      lastFailureMessage = error instanceof Error ? error.message : String(error);
      if (attempt < HTTP_CONFIG.maxAttempts) {
        await waitFor(HTTP_CONFIG.retryBaseDelayMs * attempt);
      }
    }
  }

  throw new Error(`request to '${requestUrl}' failed after ${HTTP_CONFIG.maxAttempts} attempts. last failure: ${lastFailureMessage}`);
};

export const fetchSurahFromAlquranCloud = (surahNumber: number): Promise<IAlQuranCloudResponse> =>
  fetchEndpointJson(SOURCE_URLS.alquranCloud, `/v1/surah/${surahNumber}/editions/${ALQURAN_CLOUD_EDITIONS}`);

export const fetchSurahFromQuranEndpoint = (surahNumber: number): Promise<IQuranEndpointResponse> => fetchEndpointJson(SOURCE_URLS.quranEndpoint, `/quran/${surahNumber}`);

export const fetchSurahAyahsFromMinistryOfReligion = (surahNumber: number): Promise<IMinistryOfReligionResponse> =>
  fetchEndpointJson(SOURCE_URLS.ministryOfReligion, `/quran-ayah?surah=${surahNumber}`, MINISTRY_OF_RELIGION_ORIGIN);
