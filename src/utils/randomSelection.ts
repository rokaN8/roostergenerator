import { henColorSections, henPartSections } from '../data/henOptions';
import { pigColorSections, pigPartSections } from '../data/pigOptions';
import { colorSections, roosterPartSections } from '../data/roosterOptions';
import type {
  AnimalColorKey,
  AnimalPartKey,
  AnimalPartSection,
  AnimalSelection,
  ColorSection,
  HenSelection,
  PigSelection,
  RoosterSelection,
} from '../types/avatar';

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(options: T[]): T => options[randomInt(0, options.length - 1)];

const partIds = (partSections: AnimalPartSection[], sectionId: AnimalPartKey): string[] =>
  partSections.find((s) => s.id === sectionId)?.options.map((o) => o.id) ?? [];

const colorValues = (sections: ColorSection[], sectionId: AnimalColorKey): string[] =>
  sections.find((s) => s.id === sectionId)?.options.map((o) => o.value) ?? [];

const createRandomAnimalSelection = <T extends AnimalSelection>(
  partSections: AnimalPartSection[],
  colorSections: ColorSection[],
) =>
  ({
    body: pick(partIds(partSections, 'body')),
    tail: pick(partIds(partSections, 'tail')),
    wings: pick(partIds(partSections, 'wings')),
    featherPattern: pick(partIds(partSections, 'featherPattern')),
    tattoo: pick(partIds(partSections, 'tattoo')),
    combShape: pick(partIds(partSections, 'combShape')),
    head: pick(partIds(partSections, 'head')),
    eyes: pick(partIds(partSections, 'eyes')),
    feet: pick(partIds(partSections, 'feet')),
    headwear: pick(partIds(partSections, 'headwear')),
    colors: {
      body: pick(colorValues(colorSections, 'body')),
      tail: pick(colorValues(colorSections, 'tail')),
      wings: pick(colorValues(colorSections, 'wings')),
      comb: pick(colorValues(colorSections, 'comb')),
      beak: pick(colorValues(colorSections, 'beak')),
      headwear: pick(colorValues(colorSections, 'headwear')),
    },
  }) as T;

export const createRandomSelection = (): RoosterSelection =>
  createRandomAnimalSelection<RoosterSelection>(roosterPartSections, colorSections);

export const createRandomHenSelection = (): HenSelection =>
  createRandomAnimalSelection<HenSelection>(henPartSections, henColorSections);

export const createRandomPigSelection = (): PigSelection =>
  createRandomAnimalSelection<PigSelection>(pigPartSections, pigColorSections);
