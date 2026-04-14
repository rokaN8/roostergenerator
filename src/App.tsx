import { useState } from 'react';
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
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  RoosterSelection,
  WingVariantId,
} from './types/avatar';

function App() {
  const [selection, setSelection] = useState<RoosterSelection>(() => ({
    ...defaultRoosterSelection,
    colors: { ...defaultRoosterSelection.colors },
  }));

  const updateBody = (value: BodyVariantId) => {
    setSelection((current) => ({ ...current, body: value }));
  };

  const updateWings = (value: WingVariantId) => {
    setSelection((current) => ({ ...current, wings: value }));
  };

  const updateHead = (value: HeadVariantId) => {
    setSelection((current) => ({ ...current, head: value }));
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
            Start with a rooster, mix part styles, and tweak colours live. The setup is intentionally
            lightweight so you can test reactions and expand into more farm animals later.
          </p>
        </div>
        <div className="hero-card">
          <span className="hero-badge">MVP focus</span>
          <p>One live preview, five customizable parts, and colour palettes that keep the demo playful.</p>
        </div>
      </header>

      <main className="workspace">
        <section className="preview-panel">
          <div className="panel-header">
            <div>
              <h2>Rooster preview</h2>
              <p>Adjust the rooster with simple dropdowns while the preview idles through a light walk loop.</p>
            </div>
            <span className="panel-pill">Idle loop</span>
          </div>

          <div className="preview-stage">
            <RoosterAvatar selection={selection} />
          </div>

          <div className="selection-summary">
            <ControlPanel
              partSections={roosterPartSections}
              colorSections={colorSections}
              selection={selection}
              onBodyChange={updateBody}
              onWingChange={updateWings}
              onHeadChange={updateHead}
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
