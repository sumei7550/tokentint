import { assertCreemEnv } from '@/lib/creem';

export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  try {
    assertCreemEnv();
  } catch (error) {
    console.error(
      'Creem configuration error at startup:',
      error instanceof Error ? error.message : error
    );
  }
}
