import { NextResponse } from 'next/server';
import { checkApiHealth } from '@/lib/api-client';
import { cache } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const startTime = Date.now();
  const externalApiStatus = await checkApiHealth();
  const cacheStats = cache.getStats();

  const status = externalApiStatus ? 'healthy' : 'degraded';
  const httpStatus = externalApiStatus ? 200 : 503;

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        api: externalApiStatus ? 'up' : 'down',
        cache: {
          status: 'up',
          entries: cacheStats.size,
        },
      },
      responseTime: `${Date.now() - startTime}ms`,
    },
    { status: httpStatus }
  );
}
