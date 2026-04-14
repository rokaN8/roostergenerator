import type {
  BodyVariantId,
  ColorSection,
  FeatherPatternVariantId,
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  PartSection,
  RoosterSelection,
  TailVariantId,
  WingVariantId,
} from '../types/avatar';

export const roosterPartSections: [
  PartSection<'body', BodyVariantId>,
  PartSection<'tail', TailVariantId>,
  PartSection<'wings', WingVariantId>,
  PartSection<'featherPattern', FeatherPatternVariantId>,
  PartSection<'head', HeadVariantId>,
  PartSection<'feet', FeetVariantId>,
  PartSection<'headwear', HeadwearVariantId>,
] = [
  {
    id: 'body',
    title: 'Body',
    description: 'Choose the overall rooster silhouette.',
    options: [
      { id: 'classic', label: 'Classic', description: 'Balanced barnyard proportions.' },
      { id: 'plump', label: 'Plump', description: 'Rounder body for a friendlier look.' },
      { id: 'runner', label: 'Runner', description: 'Lean and slightly more energetic.' },
    ],
  },
  {
    id: 'tail',
    title: 'Tail',
    description: 'Change rear feather silhouette and sweep.',
    options: [
      { id: 'classic', label: 'Classic', description: 'Balanced tail feathers with a familiar farm look.' },
      { id: 'fan', label: 'Fan', description: 'Wider spread for a fuller tail display.' },
      { id: 'sickle', label: 'Sickle', description: 'Longer curved feathers with more strut.' },
      { id: 'fluffy', label: 'Fluffy', description: 'Rounder layered tail for a softer silhouette.' },
    ],
  },
  {
    id: 'wings',
    title: 'Wings',
    description: 'Tune the wing attitude and feather shape.',
    options: [
      { id: 'tucked', label: 'Tucked', description: 'Neat wings resting against the body.' },
      { id: 'spread', label: 'Spread', description: 'A bolder shape ready to impress.' },
      { id: 'layered', label: 'Layered', description: 'More feather detail for the silhouette.' },
    ],
  },
  {
    id: 'featherPattern',
    title: 'Feather pattern',
    description: 'Add subtle texture to the body feathers.',
    options: [
      { id: 'clean', label: 'Clean', description: 'Solid body colour with no extra markings.' },
      { id: 'barred', label: 'Barred', description: 'Striped feather bands across the torso.' },
      { id: 'speckled', label: 'Speckled', description: 'Small spots for a mottled barnyard look.' },
      { id: 'tipped', label: 'Tipped', description: 'Light feather tips for extra definition.' },
    ],
  },
  {
    id: 'head',
    title: 'Head',
    description: 'Pick the rooster expression and head posture.',
    options: [
      { id: 'alert', label: 'Alert', description: 'Upright and attentive.' },
      { id: 'proud', label: 'Proud', description: 'Lifted chin with a showy comb.' },
      { id: 'cheery', label: 'Cheery', description: 'Softer posture with a friendly tilt.' },
    ],
  },
  {
    id: 'feet',
    title: 'Feet',
    description: 'Adjust stance and movement.',
    options: [
      { id: 'sturdy', label: 'Sturdy', description: 'Even, stable footing.' },
      { id: 'scratch', label: 'Scratch', description: 'One foot reaching forward to dig.' },
      { id: 'strut', label: 'Strut', description: 'A more animated walking stance.' },
    ],
  },
  {
    id: 'headwear',
    title: 'Headwear',
    description: 'Top things off with a little farm-ready personality.',
    options: [
      { id: 'none', label: 'None', description: 'Keep the comb fully visible.' },
      { id: 'baseball-cap', label: 'Baseball cap', description: 'A playful cap with a curved bill.' },
      { id: 'farmer-hat', label: 'Farmer hat', description: 'A broad-brimmed work hat for the coop.' },
      { id: 'straw-hat', label: 'Straw hat', description: 'A lighter woven hat for sunny barnyard days.' },
    ],
  },
];

export const colorSections: ColorSection[] = [
  {
    id: 'body',
    title: 'Body colour',
    description: 'Main feather colour for the torso and tail.',
    options: [
      { label: 'Sunrise Gold', value: '#d98a2b' },
      { label: 'Barn Red', value: '#bb5030' },
      { label: 'Cream', value: '#f0d7a7' },
      { label: 'Midnight', value: '#4b4c65' },
    ],
  },
  {
    id: 'wings',
    title: 'Wing colour',
    description: 'Secondary feather shade for wing detail.',
    options: [
      { label: 'Chestnut', value: '#8c4f2b' },
      { label: 'Golden Wheat', value: '#d1a64b' },
      { label: 'Pine', value: '#537256' },
      { label: 'Slate', value: '#6b6d86' },
    ],
  },
  {
    id: 'comb',
    title: 'Comb colour',
    description: 'Accent shade for the comb and wattle.',
    options: [
      { label: 'Ruby', value: '#cc3a42' },
      { label: 'Rose', value: '#da6076' },
      { label: 'Plum', value: '#9c4561' },
      { label: 'Coral', value: '#e6805a' },
    ],
  },
  {
    id: 'beak',
    title: 'Beak and feet colour',
    description: 'Shared tone for the beak and legs.',
    options: [
      { label: 'Amber', value: '#e4a02e' },
      { label: 'Honey', value: '#d88524' },
      { label: 'Sand', value: '#c89b5a' },
      { label: 'Copper', value: '#b96b34' },
    ],
  },
  {
    id: 'headwear',
    title: 'Headwear colour',
    description: 'Main colour for hats and caps.',
    options: [
      { label: 'Field Blue', value: '#4d6fa8' },
      { label: 'Tractor Red', value: '#b94f3b' },
      { label: 'Olive', value: '#7a8b4c' },
      { label: 'Straw Gold', value: '#d4b05b' },
    ],
  },
];

export const defaultRoosterSelection: RoosterSelection = {
  body: 'classic',
  tail: 'classic',
  wings: 'tucked',
  featherPattern: 'clean',
  head: 'alert',
  feet: 'sturdy',
  headwear: 'none',
  colors: {
    body: '#d98a2b',
    wings: '#8c4f2b',
    comb: '#cc3a42',
    beak: '#e4a02e',
    headwear: '#4d6fa8',
  },
};
