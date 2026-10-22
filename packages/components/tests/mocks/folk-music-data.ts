/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsBadgeColors } from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

export interface FolkMusic {
  id: string;
  artist: string;
  album: string;
  year: number;
  quote: string;
  'vinyl-cost': string;
  icon: HdsIconSignature['Args']['name'];
  'badge-color': HdsBadgeColors;
}

const folkMusic: FolkMusic[] = [
  {
    id: '1',
    artist: 'Nick Drake',
    album: 'Pink Moon',
    year: 1972,
    quote:
      "The song is very special. It's an old song by a guy named Nick Drake. It's called 'Pink Moon' and is actually a very good introduction to Nick Drake if you're not familiar with him. It's very transporting. And to us seemed very fitting for a beautiful drive in the country on a very special night.",
    'vinyl-cost': '29.27',
    icon: 'boundary-color',
    'badge-color': 'neutral',
  },
  {
    id: '2',
    artist: 'The Beatles',
    album: 'Abbey Road',
    year: 1969,
    quote:
      "it was the Beatles' last love letter to the world...lush, rich, smooth, epic, emotional and utterly gorgeous",
    'vinyl-cost': '25.99',
    icon: 'consul-color',
    'badge-color': 'neutral',
  },
  {
    id: '3',
    artist: 'Melanie',
    album: 'Candles in the Rain',
    year: 1971,
    quote:
      'Candles in the Rain matched material and interpretation with greater skill than she had in the past, and it ranks with her finest work',
    'vinyl-cost': '46.49',
    icon: 'terraform-color',
    'badge-color': 'highlight',
  },
  {
    id: '4',
    artist: 'Bob Dylan',
    album: 'Bringing It All Back Home',
    year: 1965,
    quote:
      'By fusing the Chuck Berry beat of the Rolling Stones and the Beatles with the leftist, folk tradition of the folk revival, Dylan really had brought it back home, creating a new kind of rock & roll that made every type of artistic tradition available to rock.',
    'vinyl-cost': '29.00',
    icon: 'nomad-color',
    'badge-color': 'success',
  },
  {
    id: '5',
    artist: 'James Taylor',
    album: 'Sweet Baby James',
    year: 1970,
    quote:
      '(It) struck a chord with music fans, especially because of its attractive mixture of folk, country, gospel, and blues elements, all of them carefully understated and distanced.',
    'vinyl-cost': '16.00',
    icon: 'waypoint-color',
    'badge-color': 'warning',
  },
  {
    id: '6',
    artist: 'Simon and Garfunkel',
    album: 'Bridge Over Troubled Waters',
    year: 1970,
    quote:
      'Perhaps the most delicately textured album to close out the 1960s from any major rock act.',
    'vinyl-cost': '20.49',
    icon: 'vagrant-color',
    'badge-color': 'critical',
  },
];

export default folkMusic;
