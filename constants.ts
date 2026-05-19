
import { RateConfig } from './types';

export const RATES: RateConfig = {
  labor: {
    brick: 90,
    block: 100,
    veneer: 95,
    retaining: 120
  },
  materials: {
    brick: 80,
    block: 90,
    veneer: 85,
    retaining: 110
  },
  taxRate: 0.15 // 15% GST for New Zealand
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Modern Brick Veneer',
    description: 'A contemporary dark-grey brick finish for a new build in Rolleston.',
    image: 'https://picsum.photos/seed/brick1/800/600',
    tags: ['Brick', 'New Build']
  },
  {
    id: 2,
    title: 'Heritage Restoration',
    description: 'Careful repointing and brick replacement for a historic Christchurch home.',
    image: 'https://picsum.photos/seed/stone2/800/600',
    tags: ['Restoration', 'Heritage']
  },
  {
    id: 3,
    title: 'Block Retaining Wall',
    description: 'A structural reinforced block wall engineered for Selwyn hillside conditions.',
    image: 'https://picsum.photos/seed/block3/800/600',
    tags: ['Block', 'Structural']
  },
  {
    id: 4,
    title: 'Red Brick Feature',
    description: 'Internal feature wall bringing warmth and texture to a modern kitchen.',
    image: 'https://picsum.photos/seed/feature4/800/600',
    tags: ['Feature', 'Interior']
  }
];
