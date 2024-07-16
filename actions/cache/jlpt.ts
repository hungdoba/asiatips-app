import { unstable_cache } from 'next/cache';
import {
  getJLPTListenDetail,
  getJLPTReadDetail,
  getJLPTTimes,
} from '../no-cache/jlpt';

// For jlpt
export const getCacheJLPTTimes = unstable_cache(
  async () => getJLPTTimes(),
  ['cache-jlpt-time'],
  { tags: ['cache-jlpt'] }
);

// For jlpt listen
export const getCacheJLPTListenDetail = unstable_cache(
  async (year: string, month: string, mondai: string) =>
    getJLPTListenDetail(year, month, mondai),
  ['cache-jlpt-listen'],
  { tags: ['cache-jlpt'] }
);

// For jlpt read
export const getCacheJLPTReadDetail = unstable_cache(
  async (year: string, month: string, mondai: string) =>
    getJLPTReadDetail(year, month, mondai),
  ['cache-jlpt-read'],
  { tags: ['cache-jlpt'] }
);
