import { useEffect, useState } from 'react';
import './App.css';
import { ControlPanel } from './components/ControlPanel';
import { RoosterAvatar } from './components/RoosterAvatar';
import {
  colorSections,
  defaultRoosterSelection,
  roosterPartSections,
} from './data/roosterOptions';
import type {
  BodyVariantId,
  ChestFluffVariantId,
  CombShapeVariantId,
  FeatherPatternVariantId,
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  RoosterSelection,
  TailVariantId,
  WingVariantId,
} from './types/avatar';

const selectionStorageKey = 'rooster-generator.selection';

const partOptionsById = Object.fromEntries(
  roosterPartSections.map((section) => [section.id, section.options.map((option) => option.id)]),
) as Record<(typeof roosterPartSections)[number]['id'], string[]>;

const colorOptionsById = Object.fromEntries(
  colorSections.map((section) => [section.id, section.options.map((option) => option.value)]),
) as Record<(typeof colorSections)[number]['id'], string[]>;

const createDefaultSelection = (): RoosterSelection => ({
  ...defaultRoosterSelection,
  colors: { ...defaultRoosterSelection.colors },
});

const isAllowedValue = (value: unknown, options: string[]): value is string =>
  typeof value === 'string' && options.includes(value);

const isAllowedHeadwear = (value: unknown): value is RoosterSelection['headwear'] =>
  isAllowedValue(value, partOptionsById.headwear);

const migrateHeadwearValue = (value: unknown) => {
  if (value === 'baseball-cap') {
    return 'dunce-cap';
  }

  return value;
};

const loadStoredSelection = (): RoosterSelection => {
  const fallback = createDefaultSelection();

  if (typeof window === 'undefined') {
    return fallback;
  }

  const storedValue = window.localStorage.getItem(selectionStorageKey);

  if (!storedValue) {
    return fallback;
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(storedValue);
  } catch (error) {
    console.error('Failed to parse saved rooster selection.', error);
    return fallback;
  }

  if (!parsedValue || typeof parsedValue !== 'object') {
    return fallback;
  }

  const storedSelection = parsedValue as Partial<RoosterSelection> & {
    colors?: Partial<RoosterSelection['colors']>;
  };
  const storedHeadwear = migrateHeadwearValue(storedSelection.headwear);

  return {
    body: isAllowedValue(storedSelection.body, partOptionsById.body) ? storedSelection.body : fallback.body,
    tail: isAllowedValue(storedSelection.tail, partOptionsById.tail) ? storedSelection.tail : fallback.tail,
    wings: isAllowedValue(storedSelection.wings, partOptionsById.wings) ? storedSelection.wings : fallback.wings,
    featherPattern: isAllowedValue(storedSelection.featherPattern, partOptionsById.featherPattern)
      ? storedSelection.featherPattern
      : fallback.featherPattern,
    combShape: isAllowedValue(storedSelection.combShape, partOptionsById.combShape)
      ? storedSelection.combShape
      : fallback.combShape,
    head: isAllowedValue(storedSelection.head, partOptionsById.head) ? storedSelection.head : fallback.head,
    chestFluff: isAllowedValue(storedSelection.chestFluff, partOptionsById.chestFluff)
      ? storedSelection.chestFluff
      : fallback.chestFluff,
    feet: isAllowedValue(storedSelection.feet, partOptionsById.feet) ? storedSelection.feet : fallback.feet,
    headwear: isAllowedHeadwear(storedHeadwear) ? storedHeadwear : fallback.headwear,
    colors: {
      body: isAllowedValue(storedSelection.colors?.body, colorOptionsById.body)
        ? storedSelection.colors.body
        : fallback.colors.body,
      wings: isAllowedValue(storedSelection.colors?.wings, colorOptionsById.wings)
        ? storedSelection.colors.wings
        : fallback.colors.wings,
      comb: isAllowedValue(storedSelection.colors?.comb, colorOptionsById.comb)
        ? storedSelection.colors.comb
        : fallback.colors.comb,
      beak: isAllowedValue(storedSelection.colors?.beak, colorOptionsById.beak)
        ? storedSelection.colors.beak
        : fallback.colors.beak,
      headwear: isAllowedValue(storedSelection.colors?.headwear, colorOptionsById.headwear)
        ? storedSelection.colors.headwear
        : fallback.colors.headwear,
    },
  };
};

function App() {
  const [selection, setSelection] = useState<RoosterSelection>(loadStoredSelection);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    try {
      window.localStorage.setItem(selectionStorageKey, JSON.stringify(selection));
    } catch (error) {
      console.error('Failed to save rooster selection.', error);
    }
  }, [selection]);

  const updateBody = (value: BodyVariantId) => {
    setSelection((current) => ({ ...current, body: value }));
  };

  const updateTail = (value: TailVariantId) => {
    setSelection((current) => ({ ...current, tail: value }));
  };

  const updateWings = (value: WingVariantId) => {
    setSelection((current) => ({ ...current, wings: value }));
  };

  const updateFeatherPattern = (value: FeatherPatternVariantId) => {
    setSelection((current) => ({ ...current, featherPattern: value }));
  };

  const updateCombShape = (value: CombShapeVariantId) => {
    setSelection((current) => ({ ...current, combShape: value }));
  };

  const updateHead = (value: HeadVariantId) => {
    setSelection((current) => ({ ...current, head: value }));
  };

  const updateChestFluff = (value: ChestFluffVariantId) => {
    setSelection((current) => ({ ...current, chestFluff: value }));
  };

  const updateFeet = (value: FeetVariantId) => {
    setSelection((current) => ({ ...current, feet: value }));
  };

  const updateHeadwear = (value: HeadwearVariantId) => {
    setSelection((current) => ({ ...current, headwear: value }));
  };

  const updateBodyColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, body: value },
    }));
  };

  const updateWingColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, wings: value },
    }));
  };

  const updateCombColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, comb: value },
    }));
  };

  const updateBeakColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, beak: value },
    }));
  };

  const updateHeadwearColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, headwear: value },
    }));
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Farm Avatar Generator MVP</p>
          <h1>Build a demo-ready rooster in minutes.</h1>
          <p className="hero-copy">
            Start with a rooster, mix tail shapes, combs, and chest fluff, and tweak colours live. The
            setup stays lightweight so you can test reactions and expand into more farm animals later.
          </p>
        </div>
        <div className="hero-card">
          <span className="hero-badge">MVP focus</span>
          <p>One live preview, nine customizable parts, and colour palettes that keep the demo playful.</p>
        </div>
      </header>

      <main className="workspace">
        <section className="preview-panel">
          <div className="panel-header">
            <div>
              <h2>Rooster preview</h2>
              <p>Adjust tail shape and feather texture while the preview idles through a light walk loop.</p>
            </div>
            <div className="preview-tools">
              <label className="motion-toggle">
                <input
                  type="checkbox"
                  checked={isAnimationEnabled}
                  onChange={(event) => setIsAnimationEnabled(event.target.checked)}
                />
                <span>Animation</span>
              </label>
              <span className="panel-pill">{isAnimationEnabled ? 'Idle loop' : 'Animation off'}</span>
            </div>
          </div>

          <div className="preview-stage">
            <RoosterAvatar selection={selection} isAnimated={isAnimationEnabled} />
          </div>

          <div className="selection-summary">
            <ControlPanel
              partSections={roosterPartSections}
              colorSections={colorSections}
              selection={selection}
              onBodyChange={updateBody}
              onTailChange={updateTail}
              onWingChange={updateWings}
              onFeatherPatternChange={updateFeatherPattern}
              onCombShapeChange={updateCombShape}
              onHeadChange={updateHead}
              onChestFluffChange={updateChestFluff}
              onFeetChange={updateFeet}
              onHeadwearChange={updateHeadwear}
              onBodyColorChange={updateBodyColor}
              onWingColorChange={updateWingColor}
              onCombColorChange={updateCombColor}
              onBeakColorChange={updateBeakColor}
              onHeadwearColorChange={updateHeadwearColor}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
