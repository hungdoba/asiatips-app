import { unstable_cache } from 'next/cache';
import {
  getJLPTListenFullDetail,
  getJLPTReadFullDetail,
  getJLPTTimes,
} from '../no-cache/jlpt';

// For jlpt
export const getCacheJLPTTimes = unstable_cache(
  async () => getJLPTTimes(),
  ['cache-jlpt-time'],
  { tags: ['cache-jlpt'] }
);

// For jlpt listen
export const getCacheJLPTListenFullDetail = unstable_cache(
  async (year: string, month: string) => getJLPTListenFullDetail(year, month),
  ['cache-jlpt-listen'],
  { tags: ['cache-jlpt'] }
);

// For jlpt read
export const getCacheJLPTReadFullDetail = unstable_cache(
  async (year: string, month: string) => getJLPTReadFullDetail(year, month),
  ['cache-jlpt-read'],
  { tags: ['cache-jlpt'] }
);
