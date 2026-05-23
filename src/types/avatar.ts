export type AnimalKind = 'rooster' | 'hen' | 'pig';

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

export type HenBodyVariantId = 'classic' | 'round' | 'petite' | 'fluffy';
export type HenTailVariantId = 'neat' | 'fan' | 'upright';
export type HenWingVariantId = 'tucked' | 'layered' | 'flutter';
export type HenFeatherPatternVariantId = 'clean' | 'barred' | 'speckled' | 'patched';
export type HenTattooVariantId = 'none' | 'heart' | 'flower' | 'star';
export type HenCombShapeVariantId = 'petite' | 'rose' | 'pea' | 'crest';
export type HenHeadVariantId = 'calm' | 'curious' | 'cheery';
export type HenEyeAccessoryVariantId = EyeAccessoryVariantId;
export type HenFeetVariantId = 'sturdy' | 'scratch' | 'step';
export type HenHeadwearVariantId = 'none' | 'bonnet' | 'farmer-hat' | 'straw-hat';

export type PigBodyVariantId = 'classic' | 'round' | 'stout' | 'chunky';
export type PigTailVariantId = 'curly' | 'loop' | 'flick';
export type PigWingVariantId = 'perky' | 'floppy' | 'patchy';
export type PigFeatherPatternVariantId = 'clean' | 'spots' | 'patches' | 'socks';
export type PigTattooVariantId = 'none' | 'heart' | 'flower' | 'star';
export type PigCombShapeVariantId = 'button' | 'round' | 'wide' | 'upturned';
export type PigHeadVariantId = 'calm' | 'sniffy' | 'cheery';
export type PigEyeAccessoryVariantId = EyeAccessoryVariantId;
export type PigFeetVariantId = 'sturdy' | 'trot' | 'bounce';
export type PigHeadwearVariantId = 'none' | 'cap' | 'farmer-hat' | 'straw-hat';

export interface PartOption<T extends string> {
  id: T;
  label: string;
  description: string;
}

export interface ColorOption {
  label: string;
  value: string;
}

export type AnimalPartKey =
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

export interface PartSection<K extends AnimalPartKey, T extends string> {
  id: K;
  title: string;
  description: string;
  options: PartOption<T>[];
}

export interface AnimalColors {
  body: string;
  tail: string;
  wings: string;
  comb: string;
  beak: string;
  headwear: string;
}

export type AnimalColorKey = keyof AnimalColors;

export interface ColorSection {
  id: AnimalColorKey;
  title: string;
  description: string;
  options: ColorOption[];
}

export type RoosterColors = AnimalColors;
export type HenColors = AnimalColors;
export type PigColors = AnimalColors;

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
  colors: AnimalColors;
}

export interface HenSelection {
  body: HenBodyVariantId;
  tail: HenTailVariantId;
  wings: HenWingVariantId;
  featherPattern: HenFeatherPatternVariantId;
  tattoo: HenTattooVariantId;
  combShape: HenCombShapeVariantId;
  head: HenHeadVariantId;
  eyes: HenEyeAccessoryVariantId;
  feet: HenFeetVariantId;
  headwear: HenHeadwearVariantId;
  colors: AnimalColors;
}

export interface PigSelection {
  body: PigBodyVariantId;
  tail: PigTailVariantId;
  wings: PigWingVariantId;
  featherPattern: PigFeatherPatternVariantId;
  tattoo: PigTattooVariantId;
  combShape: PigCombShapeVariantId;
  head: PigHeadVariantId;
  eyes: PigEyeAccessoryVariantId;
  feet: PigFeetVariantId;
  headwear: PigHeadwearVariantId;
  colors: AnimalColors;
}

export type AnimalSelection = RoosterSelection | HenSelection | PigSelection;

export type AnimalBodyVariantId = BodyVariantId | HenBodyVariantId | PigBodyVariantId;
export type AnimalTailVariantId = TailVariantId | HenTailVariantId | PigTailVariantId;
export type AnimalWingVariantId = WingVariantId | HenWingVariantId | PigWingVariantId;
export type AnimalFeatherPatternVariantId =
  | FeatherPatternVariantId
  | HenFeatherPatternVariantId
  | PigFeatherPatternVariantId;
export type AnimalTattooVariantId = TattooVariantId | HenTattooVariantId | PigTattooVariantId;
export type AnimalCombShapeVariantId = CombShapeVariantId | HenCombShapeVariantId | PigCombShapeVariantId;
export type AnimalHeadVariantId = HeadVariantId | HenHeadVariantId | PigHeadVariantId;
export type AnimalEyeAccessoryVariantId = EyeAccessoryVariantId | HenEyeAccessoryVariantId | PigEyeAccessoryVariantId;
export type AnimalFeetVariantId = FeetVariantId | HenFeetVariantId | PigFeetVariantId;
export type AnimalHeadwearVariantId = HeadwearVariantId | HenHeadwearVariantId | PigHeadwearVariantId;

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

export type HenPartSection =
  | PartSection<'body', HenBodyVariantId>
  | PartSection<'tail', HenTailVariantId>
  | PartSection<'wings', HenWingVariantId>
  | PartSection<'featherPattern', HenFeatherPatternVariantId>
  | PartSection<'tattoo', HenTattooVariantId>
  | PartSection<'combShape', HenCombShapeVariantId>
  | PartSection<'head', HenHeadVariantId>
  | PartSection<'eyes', HenEyeAccessoryVariantId>
  | PartSection<'feet', HenFeetVariantId>
  | PartSection<'headwear', HenHeadwearVariantId>;

export type PigPartSection =
  | PartSection<'body', PigBodyVariantId>
  | PartSection<'tail', PigTailVariantId>
  | PartSection<'wings', PigWingVariantId>
  | PartSection<'featherPattern', PigFeatherPatternVariantId>
  | PartSection<'tattoo', PigTattooVariantId>
  | PartSection<'combShape', PigCombShapeVariantId>
  | PartSection<'head', PigHeadVariantId>
  | PartSection<'eyes', PigEyeAccessoryVariantId>
  | PartSection<'feet', PigFeetVariantId>
  | PartSection<'headwear', PigHeadwearVariantId>;

export type AnimalPartSection = RoosterPartSection | HenPartSection | PigPartSection;
