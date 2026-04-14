export type BodyVariantId = 'classic' | 'plump' | 'runner';
export type TailVariantId = 'classic' | 'fan' | 'sickle' | 'fluffy';
export type WingVariantId = 'tucked' | 'spread' | 'layered';
export type FeatherPatternVariantId = 'clean' | 'barred' | 'speckled' | 'tipped';
export type CombShapeVariantId = 'classic' | 'rose' | 'pea' | 'show';
export type HeadVariantId = 'alert' | 'proud' | 'cheery';
export type ChestFluffVariantId = 'sleek' | 'ruff' | 'puffed' | 'layered';
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
  combShape: CombShapeVariantId;
  head: HeadVariantId;
  chestFluff: ChestFluffVariantId;
  feet: FeetVariantId;
  headwear: HeadwearVariantId;
  colors: RoosterColors;
}

export type RoosterPartKey =
  | 'body'
  | 'tail'
  | 'wings'
  | 'featherPattern'
  | 'combShape'
  | 'head'
  | 'chestFluff'
  | 'feet'
  | 'headwear';
export type RoosterColorKey = keyof RoosterColors;

export type RoosterPartSection =
  | PartSection<'body', BodyVariantId>
  | PartSection<'tail', TailVariantId>
  | PartSection<'wings', WingVariantId>
  | PartSection<'featherPattern', FeatherPatternVariantId>
  | PartSection<'combShape', CombShapeVariantId>
  | PartSection<'head', HeadVariantId>
  | PartSection<'chestFluff', ChestFluffVariantId>
  | PartSection<'feet', FeetVariantId>
  | PartSection<'headwear', HeadwearVariantId>;

export type RoosterSummaryItem = {
  label: string;
  value: string;
};
