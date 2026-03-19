import { settled } from '@ember/test-helpers';

export async function waitForLayout(): Promise<void> {
  await new Promise((resolve) => requestAnimationFrame(resolve));

  return settled();
}
