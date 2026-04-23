import { colorSections, roosterPartSections } from '../data/roosterOptions';
import type {
  BodyVariantId,
  CombShapeVariantId,
  EyeAccessoryVariantId,
  FeatherPatternVariantId,
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  RoosterSelection,
  TailVariantId,
  TattooVariantId,
  WingVariantId,
} from '../types/avatar';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(options: T[]): T => options[randomInt(0, options.length - 1)];

const partIds = (sectionId: (typeof roosterPartSections)[number]['id']): string[] =>
  roosterPartSections.find((s) => s.id === sectionId)?.options.map((o) => o.id) ?? [];

const colorValues = (sectionId: (typeof colorSections)[number]['id']): string[] =>
  colorSections.find((s) => s.id === sectionId)?.options.map((o) => o.value) ?? [];

export const createRandomSelection = (): RoosterSelection => ({
  body: pick(partIds('body')) as BodyVariantId,
  tail: pick(partIds('tail')) as TailVariantId,
  wings: pick(partIds('wings')) as WingVariantId,
  featherPattern: pick(partIds('featherPattern')) as FeatherPatternVariantId,
  tattoo: pick(partIds('tattoo')) as TattooVariantId,
  combShape: pick(partIds('combShape')) as CombShapeVariantId,
  head: pick(partIds('head')) as HeadVariantId,
  eyes: pick(partIds('eyes')) as EyeAccessoryVariantId,
  feet: pick(partIds('feet')) as FeetVariantId,
  headwear: pick(partIds('headwear')) as HeadwearVariantId,
  colors: {
    body: pick(colorValues('body')),
    tail: pick(colorValues('tail')),
    wings: pick(colorValues('wings')),
    comb: pick(colorValues('comb')),
    beak: pick(colorValues('beak')),
    headwear: pick(colorValues('headwear')),
  },
});
