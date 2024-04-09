import type { HdsAlertSignature } from '../alert/types.ts';

export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
  Args: Omit<HdsAlertSignature['Args'], 'type'>;
}
