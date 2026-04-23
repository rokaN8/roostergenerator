export type BodyVariantId = 'classic' | 'plump' | 'runner' | 'bantam' | 'silkie' | 'ornamental';
export type TailVariantId = 'classic' | 'fan' | 'sickle' | 'fluffy' | 'stubby' | 'majestic' | 'peacock';
export type WingVariantId = 'tucked' | 'spread' | 'layered';
export type FeatherPatternVariantId = 'clean' | 'barred' | 'speckled' | 'tipped';
export type TattooVariantId = 'none' | 'heart' | 'skull' | 'x-mark' | 'lightning';
export type CombShapeVariantId = 'classic' | 'rose' | 'pea' | 'show';
export type HeadVariantId = 'alert' | 'proud' | 'cheery';
export type EyeAccessoryVariantId = 'none' | 'round-glasses' | 'sunglasses';
export type FeetVariantId = 'sturdy' | 'scratch' | 'strut';
export type HeadwearVariantId = 'none' | 'dunce-cap' | 'farmer-hat' | 'straw-hat';

export interface PartOption<T extends string> {
  id: T;
  label: string;
  description: string;
}

export interface ColorOption {
  label: string;
  value: string;
}

export interface PartSection<K extends RoosterPartKey, T extends string> {
  id: K;
  title: string;
  description: string;
  options: PartOption<T>[];
}

export interface ColorSection {
  id: RoosterColorKey;
  title: string;
  description: string;
  options: ColorOption[];
}

export interface RoosterColors {
  body: string;
  tail: string;
  wings: string;
  comb: string;
  beak: string;
  headwear: string;
}

export interface RoosterSelection {
  body: BodyVariantId;
  tail: TailVariantId;
  wings: WingVariantId;
  featherPattern: FeatherPatternVariantId;
  tattoo: TattooVariantId;
  combShape: CombShapeVariantId;
  head: HeadVariantId;
  eyes: EyeAccessoryVariantId;
  feet: FeetVariantId;
  headwear: HeadwearVariantId;
  colors: RoosterColors;
}

export type RoosterPartKey =
  | 'body'
  | 'tail'
  | 'wings'
  | 'featherPattern'
  | 'tattoo'
  | 'combShape'
  | 'head'
  | 'eyes'
  | 'feet'
  | 'headwear';
export type RoosterColorKey = keyof RoosterColors;

export type RoosterPartSection =
  | PartSection<'body', BodyVariantId>
  | PartSection<'tail', TailVariantId>
  | PartSection<'wings', WingVariantId>
  | PartSection<'featherPattern', FeatherPatternVariantId>
  | PartSection<'tattoo', TattooVariantId>
  | PartSection<'combShape', CombShapeVariantId>
  | PartSection<'head', HeadVariantId>
  | PartSection<'eyes', EyeAccessoryVariantId>
  | PartSection<'feet', FeetVariantId>
  | PartSection<'headwear', HeadwearVariantId>;

export type RoosterSummaryItem = {
  label: string;
  value: string;
};
