import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { colorSections, roosterPartSections } from '../data/roosterOptions';
import type { RoosterSelection } from '../types/avatar';
import { RoosterAvatar } from './RoosterAvatar';

type StressRooster = {
  id: string;
  selection: RoosterSelection;
  left: number;
  bottom: number;
  width: number;
  depth: number;
  opacity: number;
  blur: number;
  cycleDuration: number;
  travelDuration: number;
  animationDelay: number;
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clampCount = (count: number) => Math.min(100, Math.max(1, count));

const bodyOptions = roosterPartSections[0].options.map((option) => option.id);
const tailOptions = roosterPartSections[1].options.map((option) => option.id);
const wingOptions = roosterPartSections[2].options.map((option) => option.id);
const featherPatternOptions = roosterPartSections[3].options.map((option) => option.id);
const combShapeOptions = roosterPartSections[4].options.map((option) => option.id);
const headOptions = roosterPartSections[5].options.map((option) => option.id);
const chestFluffOptions = roosterPartSections[6].options.map((option) => option.id);
const feetOptions = roosterPartSections[7].options.map((option) => option.id);
const headwearOptions = roosterPartSections[8].options.map((option) => option.id);

const bodyColorOptions = colorSections[0].options.map((option) => option.value);
const wingColorOptions = colorSections[1].options.map((option) => option.value);
const combColorOptions = colorSections[2].options.map((option) => option.value);
const beakColorOptions = colorSections[3].options.map((option) => option.value);
const headwearColorOptions = colorSections[4].options.map((option) => option.value);

const pick = <T extends string>(options: T[]) => options[randomInt(0, options.length - 1)];

const createRandomSelection = (): RoosterSelection => ({
  body: pick(bodyOptions),
  tail: pick(tailOptions),
  wings: pick(wingOptions),
  featherPattern: pick(featherPatternOptions),
  combShape: pick(combShapeOptions),
  head: pick(headOptions),
  chestFluff: pick(chestFluffOptions),
  feet: pick(feetOptions),
  headwear: pick(headwearOptions),
  colors: {
    body: pick(bodyColorOptions),
    wings: pick(wingColorOptions),
    comb: pick(combColorOptions),
    beak: pick(beakColorOptions),
    headwear: pick(headwearColorOptions),
  },
});

const createStressFlock = (count: number): StressRooster[] =>
  Array.from({ length: count }, (_, index) => {
    const depth = Math.random();

    return {
      id: `stress-rooster-${index}-${Math.round(depth * 1000)}`,
      selection: createRandomSelection(),
      left: 6 + Math.random() * 88,
      bottom: 28 + (1 - depth) * 250 + Math.random() * 26,
      width: 70 + depth * 170,
      depth,
      opacity: 0.58 + depth * 0.42,
      blur: Number(((1 - depth) * 0.9).toFixed(2)),
      cycleDuration: Number((0.88 + Math.random() * 0.5).toFixed(2)),
      travelDuration: Number((6.6 + Math.random() * 3.1).toFixed(2)),
      animationDelay: Number((Math.random() * -8).toFixed(2)),
    };
  }).sort((first, second) => first.depth - second.depth);

export function RoosterStressTest() {
  const [roosterCount, setRoosterCount] = useState(() => randomInt(1, 100));
  const [seed, setSeed] = useState(() => Date.now());
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [fps, setFps] = useState(0);

  const flock = useMemo(() => createStressFlock(roosterCount), [roosterCount, seed]);

  useEffect(() => {
    let animationFrameId = 0;
    let previousTime = performance.now();
    let frameCount = 0;

    const measureFps = (currentTime: number) => {
      frameCount += 1;
      const elapsed = currentTime - previousTime;

      if (elapsed >= 500) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        previousTime = currentTime;
      }

      animationFrameId = window.requestAnimationFrame(measureFps);
    };

    animationFrameId = window.requestAnimationFrame(measureFps);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  const handleCountChange = (value: string) => {
    const nextCount = Number.parseInt(value, 10);

    if (Number.isNaN(nextCount)) {
      setRoosterCount(1);
      return;
    }

    setRoosterCount(clampCount(nextCount));
  };

  const randomizeCount = () => {
    setRoosterCount(randomInt(1, 100));
    setSeed(Date.now());
  };

  const regenerateFlock = () => {
    setSeed(Date.now());
  };

  return (
    <section className="stress-panel">
      <div className="panel-header">
        <div>
          <h2>Rooster stress test</h2>
          <p>Spawn a farm full of randomized roosters to see how many animated avatars your screen can hold.</p>
        </div>
        <div className="preview-tools">
          <label className="motion-toggle">
            <input
              type="checkbox"
              checked={isAnimationEnabled}
              onChange={(event) => setIsAnimationEnabled(event.target.checked)}
            />
            <span>Animate flock</span>
          </label>
          <span className="panel-pill">{fps} FPS</span>
        </div>
      </div>

      <div className="stress-toolbar">
        <label className="stress-count-control">
          <span>Roosters</span>
          <input
            type="number"
            min={1}
            max={100}
            value={roosterCount}
            onChange={(event) => handleCountChange(event.target.value)}
          />
        </label>

        <input
          className="stress-range"
          type="range"
          min={1}
          max={100}
          value={roosterCount}
          onChange={(event) => handleCountChange(event.target.value)}
        />

        <button className="stress-button" type="button" onClick={regenerateFlock}>
          Regenerate flock
        </button>
        <button className="stress-button stress-button--secondary" type="button" onClick={randomizeCount}>
          Random 1-100
        </button>
      </div>

      <div className="stress-stage">
        <div className="stress-sun" aria-hidden="true" />
        <div className="stress-hills stress-hills--back" aria-hidden="true" />
        <div className="stress-hills stress-hills--mid" aria-hidden="true" />
        <div className="stress-ground stress-ground--back" aria-hidden="true" />
        <div className="stress-ground stress-ground--front" aria-hidden="true" />

        {flock.map((rooster) => (
          <div
            className="stress-rooster"
            key={rooster.id}
            style={
              {
                left: `${rooster.left}%`,
                bottom: `${rooster.bottom}px`,
                width: `${rooster.width}px`,
                zIndex: Math.round(rooster.depth * 1000),
                opacity: rooster.opacity,
                filter: `blur(${rooster.blur}px)`,
                '--rooster-cycle-duration': `${rooster.cycleDuration}s`,
                '--rooster-travel-duration': `${rooster.travelDuration}s`,
                '--rooster-animation-delay': `${rooster.animationDelay}s`,
              } as CSSProperties
            }
          >
            <RoosterAvatar isAnimated={isAnimationEnabled} selection={rooster.selection} showBackdrop={false} />
          </div>
        ))}
      </div>
    </section>
  );
}
