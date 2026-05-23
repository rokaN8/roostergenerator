import { useEffect, useState } from 'react';
import './App.css';
import { ControlPanel } from './components/ControlPanel';
import { HenAvatar } from './components/HenAvatar';
import { PigAvatar } from './components/PigAvatar';
import { RoosterAvatar } from './components/RoosterAvatar';
import { RoosterStressTest } from './components/RoosterStressTest';
import {
  defaultHenSelection,
  henColorSections,
  henPartSections,
} from './data/henOptions';
import {
  defaultPigSelection,
  pigColorSections,
  pigPartSections,
} from './data/pigOptions';
import {
  colorSections,
  defaultRoosterSelection,
  roosterPartSections,
} from './data/roosterOptions';
import type {
  AnimalBodyVariantId,
  AnimalColorKey,
  AnimalColors,
  AnimalCombShapeVariantId,
  AnimalEyeAccessoryVariantId,
  AnimalFeatherPatternVariantId,
  AnimalFeetVariantId,
  AnimalHeadVariantId,
  AnimalHeadwearVariantId,
  AnimalKind,
  AnimalPartKey,
  AnimalSelection,
  AnimalTailVariantId,
  AnimalTattooVariantId,
  AnimalWingVariantId,
  ColorSection,
  HenSelection,
  PigSelection,
  RoosterSelection,
} from './types/avatar';
import {
  createRandomHenSelection,
  createRandomPigSelection,
  createRandomSelection,
} from './utils/randomSelection';

const roosterSelectionStorageKey = 'rooster-generator.selection';
const henSelectionStorageKey = 'rooster-generator.hen-selection';
const pigSelectionStorageKey = 'rooster-generator.pig-selection';
const animalStorageKey = 'rooster-generator.animal';
const themeStorageKey = 'rooster-generator.theme';

type Theme = 'light' | 'dark';

const loadStoredTheme = (): Theme => {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // ignore
  }
  return 'light';
};

const loadStoredAnimal = (): AnimalKind => {
  try {
    const stored = window.localStorage.getItem(animalStorageKey);
    if (stored === 'rooster' || stored === 'hen' || stored === 'pig') return stored;
  } catch {
    // ignore
  }
  return 'rooster';
};

const createPartOptionsById = (
  sections: Array<{ id: AnimalPartKey; options: Array<{ id: string }> }>,
) =>
  Object.fromEntries(
    sections.map((section) => [section.id, section.options.map((option) => option.id)]),
  ) as Record<AnimalPartKey, string[]>;

const createColorOptionsById = (sections: ColorSection[]) =>
  Object.fromEntries(
    sections.map((section) => [section.id, section.options.map((option) => option.value)]),
  ) as Record<AnimalColorKey, string[]>;

const roosterPartOptionsById = createPartOptionsById(roosterPartSections);
const roosterColorOptionsById = createColorOptionsById(colorSections);
const henPartOptionsById = createPartOptionsById(henPartSections);
const henColorOptionsById = createColorOptionsById(henColorSections);
const pigPartOptionsById = createPartOptionsById(pigPartSections);
const pigColorOptionsById = createColorOptionsById(pigColorSections);

const createDefaultSelection = <T extends AnimalSelection>(selection: T): T => ({
  ...selection,
  colors: { ...selection.colors },
});

const isAllowedValue = (value: unknown, options: string[]): value is string =>
  typeof value === 'string' && options.includes(value);

const migrateRoosterHeadwearValue = (value: unknown) => {
  if (value === 'baseball-cap') {
    return 'dunce-cap';
  }

  return value;
};

const loadStoredSelection = <T extends AnimalSelection>(
  storageKey: string,
  fallback: T,
  partOptionsById: Record<AnimalPartKey, string[]>,
  colorOptionsById: Record<AnimalColorKey, string[]>,
  migrateHeadwearValue?: (value: unknown) => unknown,
): T => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return fallback;
  }

  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(storedValue);
  } catch (error) {
    console.error(`Failed to parse saved selection for ${storageKey}.`, error);
    return fallback;
  }

  if (!parsedValue || typeof parsedValue !== 'object') {
    return fallback;
  }

  const storedSelection = parsedValue as Partial<T> & {
    colors?: Partial<AnimalColors>;
  };
  const storedHeadwear = migrateHeadwearValue
    ? migrateHeadwearValue(storedSelection.headwear)
    : storedSelection.headwear;

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
    headwear: isAllowedValue(storedHeadwear, partOptionsById.headwear) ? storedHeadwear : fallback.headwear,
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
  } as T;
};

type ViewMode = 'builder' | 'stress';

const animalMeta: Record<
  AnimalKind,
  {
    title: string;
    name: string;
    builderCopy: string;
    panelCopy: string;
  }
> = {
  rooster: {
    title: 'Rooster',
    name: 'rooster',
    builderCopy: 'Adjust eye accessories, tail shape, and feather texture while preview idles through a light walk loop.',
    panelCopy: 'One live rooster preview, ten customizable parts, tattoos included, and colour palettes that keep the demo playful.',
  },
  hen: {
    title: 'Hen',
    name: 'hen',
    builderCopy: 'Tune the hen silhouette, wing pose, and cosy feather details while preview idles through the same light walk loop.',
    panelCopy: 'One live hen preview, ten customizable parts, tattoos included, and colour palettes that keep the demo playful.',
  },
  pig: {
    title: 'Pig',
    name: 'pig',
    builderCopy: 'Mix body shape, ear pose, snout style, and markings while the pig ambles through the same gentle idle loop.',
    panelCopy: 'One live pig preview, ten customizable parts, tattoos included, and colour palettes that keep the farm cast playful.',
  },
};

function App() {
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalKind>(loadStoredAnimal);
  const [roosterSelection, setRoosterSelection] = useState<RoosterSelection>(() =>
    loadStoredSelection(
      roosterSelectionStorageKey,
      createDefaultSelection(defaultRoosterSelection),
      roosterPartOptionsById,
      roosterColorOptionsById,
      migrateRoosterHeadwearValue,
    ),
  );
  const [henSelection, setHenSelection] = useState<HenSelection>(() =>
    loadStoredSelection(
      henSelectionStorageKey,
      createDefaultSelection(defaultHenSelection),
      henPartOptionsById,
      henColorOptionsById,
    ),
  );
  const [pigSelection, setPigSelection] = useState<PigSelection>(() =>
    loadStoredSelection(
      pigSelectionStorageKey,
      createDefaultSelection(defaultPigSelection),
      pigPartOptionsById,
      pigColorOptionsById,
    ),
  );
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('builder');
  const [theme, setTheme] = useState<Theme>(loadStoredTheme);

  const selection: AnimalSelection =
    selectedAnimal === 'rooster'
      ? roosterSelection
      : selectedAnimal === 'hen'
        ? henSelection
        : pigSelection;
  const partSections =
    selectedAnimal === 'rooster'
      ? roosterPartSections
      : selectedAnimal === 'hen'
        ? henPartSections
        : pigPartSections;
  const currentColorSections =
    selectedAnimal === 'rooster'
      ? colorSections
      : selectedAnimal === 'hen'
        ? henColorSections
        : pigColorSections;
  const currentAnimalMeta = animalMeta[selectedAnimal];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(animalStorageKey, selectedAnimal);
    } catch {
      // ignore
    }
  }, [selectedAnimal]);

  useEffect(() => {
    try {
      window.localStorage.setItem(roosterSelectionStorageKey, JSON.stringify(roosterSelection));
    } catch (error) {
      console.error('Failed to save rooster selection.', error);
    }
  }, [roosterSelection]);

  useEffect(() => {
    try {
      window.localStorage.setItem(henSelectionStorageKey, JSON.stringify(henSelection));
    } catch (error) {
      console.error('Failed to save hen selection.', error);
    }
  }, [henSelection]);

  useEffect(() => {
    try {
      window.localStorage.setItem(pigSelectionStorageKey, JSON.stringify(pigSelection));
    } catch (error) {
      console.error('Failed to save pig selection.', error);
    }
  }, [pigSelection]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const setCurrentSelection = (updater: (current: AnimalSelection) => AnimalSelection) => {
    switch (selectedAnimal) {
      case 'rooster':
        setRoosterSelection((current) => updater(current) as RoosterSelection);
        return;
      case 'hen':
        setHenSelection((current) => updater(current) as HenSelection);
        return;
      case 'pig':
        setPigSelection((current) => updater(current) as PigSelection);
        return;
    }
  };

  const updatePart = <K extends AnimalPartKey>(key: K, value: AnimalSelection[K]) => {
    setCurrentSelection((current) => ({ ...current, [key]: value }) as AnimalSelection);
  };

  const updateColor = <K extends AnimalColorKey>(key: K, value: string) => {
    setCurrentSelection((current) => ({
      ...current,
      colors: { ...current.colors, [key]: value },
    }) as AnimalSelection);
  };

  const updateBody = (value: AnimalBodyVariantId) => updatePart('body', value);
  const updateTail = (value: AnimalTailVariantId) => updatePart('tail', value);
  const updateWings = (value: AnimalWingVariantId) => updatePart('wings', value);
  const updateFeatherPattern = (value: AnimalFeatherPatternVariantId) => updatePart('featherPattern', value);
  const updateTattoo = (value: AnimalTattooVariantId) => updatePart('tattoo', value);
  const updateCombShape = (value: AnimalCombShapeVariantId) => updatePart('combShape', value);
  const updateHead = (value: AnimalHeadVariantId) => updatePart('head', value);
  const updateEyes = (value: AnimalEyeAccessoryVariantId) => updatePart('eyes', value);
  const updateFeet = (value: AnimalFeetVariantId) => updatePart('feet', value);
  const updateHeadwear = (value: AnimalHeadwearVariantId) => updatePart('headwear', value);
  const updateBodyColor = (value: string) => updateColor('body', value);
  const updateTailColor = (value: string) => updateColor('tail', value);
  const updateWingColor = (value: string) => updateColor('wings', value);
  const updateCombColor = (value: string) => updateColor('comb', value);
  const updateBeakColor = (value: string) => updateColor('beak', value);
  const updateHeadwearColor = (value: string) => updateColor('headwear', value);

  const surpriseMe = () => {
    switch (selectedAnimal) {
      case 'rooster':
        setRoosterSelection(createRandomSelection());
        return;
      case 'hen':
        setHenSelection(createRandomHenSelection());
        return;
      case 'pig':
        setPigSelection(createRandomPigSelection());
        return;
    }
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Farm Avatar Generator MVP</p>
          <h1>
            {viewMode === 'builder'
              ? `Build a demo-ready ${currentAnimalMeta.name} in minutes.`
              : 'Stress test a whole flock on screen.'}
          </h1>
          <p className="hero-copy">
            {viewMode === 'builder'
              ? `Start with a ${currentAnimalMeta.name}, mix silhouettes, accessories, and colours live, and keep the setup lightweight for quick demo-ready character ideas.`
              : 'Fill a farm with randomized roosters, vary the flock count, and watch the frame rate while foreground and background birds stack across the scene.'}
          </p>
        </div>
        <div className="hero-card">
          <span className="hero-badge">MVP focus</span>
          <p>
            {viewMode === 'builder'
              ? currentAnimalMeta.panelCopy
              : 'One stress scene, randomized roosters, and an FPS counter for quick render pressure checks.'}
          </p>
          <div className="hero-card-footer">
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
            <div className="view-switch" role="tablist" aria-label="Animal type">
              <button
                className={`view-switch__button${selectedAnimal === 'rooster' ? ' view-switch__button--active' : ''}`}
                type="button"
                onClick={() => setSelectedAnimal('rooster')}
              >
                Rooster
              </button>
              <button
                className={`view-switch__button${selectedAnimal === 'hen' ? ' view-switch__button--active' : ''}`}
                type="button"
                onClick={() => setSelectedAnimal('hen')}
              >
                Hen
              </button>
              <button
                className={`view-switch__button${selectedAnimal === 'pig' ? ' view-switch__button--active' : ''}`}
                type="button"
                onClick={() => setSelectedAnimal('pig')}
              >
                Pig
              </button>
            </div>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              title={theme === 'light' ? 'Dark theme' : 'Light theme'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <main className="workspace">
        {viewMode === 'builder' ? (
          <section className="preview-panel">
            <div className="panel-header">
              <div>
                <h2>{currentAnimalMeta.title} preview</h2>
                <p>{currentAnimalMeta.builderCopy}</p>
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
                <span className="panel-pill">{currentAnimalMeta.title}</span>
                <span className="panel-pill">{isAnimationEnabled ? 'Idle loop' : 'Animation off'}</span>
              </div>
            </div>

            <div className="preview-stage">
              {selectedAnimal === 'rooster' ? (
                <RoosterAvatar selection={roosterSelection} isAnimated={isAnimationEnabled} />
              ) : selectedAnimal === 'hen' ? (
                <HenAvatar selection={henSelection} isAnimated={isAnimationEnabled} />
              ) : (
                <PigAvatar selection={pigSelection} isAnimated={isAnimationEnabled} />
              )}
            </div>

            <div className="selection-summary">
              <ControlPanel
                partSections={partSections}
                colorSections={currentColorSections}
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
