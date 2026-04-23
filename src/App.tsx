import { useEffect, useState } from 'react';
import './App.css';
import { ControlPanel } from './components/ControlPanel';
import { RoosterAvatar } from './components/RoosterAvatar';
import { RoosterStressTest } from './components/RoosterStressTest';
import {
  colorSections,
  defaultRoosterSelection,
  roosterPartSections,
} from './data/roosterOptions';
import type {
  BodyVariantId,
  CombShapeVariantId,
  EyeAccessoryVariantId,
  FeatherPatternVariantId,
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  RoosterSelection,
  TattooVariantId,
  TailVariantId,
  WingVariantId,
} from './types/avatar';
import { createRandomSelection } from './utils/randomSelection';

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
    tattoo: isAllowedValue(storedSelection.tattoo, partOptionsById.tattoo) ? storedSelection.tattoo : fallback.tattoo,
    combShape: isAllowedValue(storedSelection.combShape, partOptionsById.combShape)
      ? storedSelection.combShape
      : fallback.combShape,
    head: isAllowedValue(storedSelection.head, partOptionsById.head) ? storedSelection.head : fallback.head,
    eyes: isAllowedValue(storedSelection.eyes, partOptionsById.eyes) ? storedSelection.eyes : fallback.eyes,
    feet: isAllowedValue(storedSelection.feet, partOptionsById.feet) ? storedSelection.feet : fallback.feet,
    headwear: isAllowedHeadwear(storedHeadwear) ? storedHeadwear : fallback.headwear,
    colors: {
      body: isAllowedValue(storedSelection.colors?.body, colorOptionsById.body)
        ? storedSelection.colors.body
        : fallback.colors.body,
      tail: isAllowedValue(storedSelection.colors?.tail, colorOptionsById.tail)
        ? storedSelection.colors.tail
        : fallback.colors.tail,
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

type ViewMode = 'builder' | 'stress';

function App() {
  const [selection, setSelection] = useState<RoosterSelection>(loadStoredSelection);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('builder');

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

  const updateTattoo = (value: TattooVariantId) => {
    setSelection((current) => ({ ...current, tattoo: value }));
  };

  const updateCombShape = (value: CombShapeVariantId) => {
    setSelection((current) => ({ ...current, combShape: value }));
  };

  const updateHead = (value: HeadVariantId) => {
    setSelection((current) => ({ ...current, head: value }));
  };

  const updateEyes = (value: EyeAccessoryVariantId) => {
    setSelection((current) => ({ ...current, eyes: value }));
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

  const updateTailColor = (value: string) => {
    setSelection((current) => ({
      ...current,
      colors: { ...current.colors, tail: value },
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

  const surpriseMe = () => {
    setSelection(createRandomSelection());
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Farm Avatar Generator MVP</p>
          <h1>{viewMode === 'builder' ? 'Build a demo-ready rooster in minutes.' : 'Stress test a whole flock on screen.'}</h1>
          <p className="hero-copy">
            {viewMode === 'builder'
              ? 'Start with a rooster, mix tail shapes, combs, eye accessories, and tattoos, and tweak colours live. The setup stays lightweight so you can test reactions and expand into more farm animals later.'
              : 'Fill a farm with randomized roosters, vary the flock count, and watch the frame rate while foreground and background birds stack across the scene.'}
          </p>
        </div>
        <div className="hero-card">
          <span className="hero-badge">MVP focus</span>
          <p>
            {viewMode === 'builder'
              ? 'One live preview, ten customizable parts, tattoos included, and colour palettes that keep the demo playful.'
              : 'One stress scene, randomized roosters, and an FPS counter for quick render pressure checks.'}
          </p>
          <div className="view-switch" role="tablist" aria-label="View mode">
            <button
              className={`view-switch__button${viewMode === 'builder' ? ' view-switch__button--active' : ''}`}
              type="button"
              onClick={() => setViewMode('builder')}
            >
              Builder
            </button>
            <button
              className={`view-switch__button${viewMode === 'stress' ? ' view-switch__button--active' : ''}`}
              type="button"
              onClick={() => setViewMode('stress')}
            >
              Stress test
            </button>
          </div>
        </div>
      </header>

      <main className="workspace">
        {viewMode === 'builder' ? (
          <section className="preview-panel">
            <div className="panel-header">
              <div>
                <h2>Rooster preview</h2>
                <p>Adjust eye accessories, tail shape, and feather texture while preview idles through a light walk loop.</p>
              </div>
              <div className="preview-tools">
                <button className="stress-button stress-button--secondary" type="button" onClick={surpriseMe}>
                  Surprise me!
                </button>
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
                onTattooChange={updateTattoo}
                onCombShapeChange={updateCombShape}
                onHeadChange={updateHead}
                onEyesChange={updateEyes}
                onFeetChange={updateFeet}
                onHeadwearChange={updateHeadwear}
                onBodyColorChange={updateBodyColor}
                onTailColorChange={updateTailColor}
                onWingColorChange={updateWingColor}
                onCombColorChange={updateCombColor}
                onBeakColorChange={updateBeakColor}
                onHeadwearColorChange={updateHeadwearColor}
              />
            </div>
          </section>
        ) : (
          <RoosterStressTest />
        )}
      </main>
    </div>
  );
}

export default App;
