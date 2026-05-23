import type {
  AnimalBodyVariantId,
  AnimalCombShapeVariantId,
  AnimalEyeAccessoryVariantId,
  AnimalFeatherPatternVariantId,
  AnimalFeetVariantId,
  AnimalHeadVariantId,
  AnimalHeadwearVariantId,
  AnimalPartSection,
  AnimalSelection,
  AnimalTailVariantId,
  AnimalTattooVariantId,
  AnimalWingVariantId,
  ColorSection,
} from '../types/avatar';
import './ControlPanel.css';

interface ControlPanelProps {
  partSections: AnimalPartSection[];
  colorSections: ColorSection[];
  selection: AnimalSelection;
  onBodyChange: (value: AnimalBodyVariantId) => void;
  onTailChange: (value: AnimalTailVariantId) => void;
  onWingChange: (value: AnimalWingVariantId) => void;
  onFeatherPatternChange: (value: AnimalFeatherPatternVariantId) => void;
  onTattooChange: (value: AnimalTattooVariantId) => void;
  onCombShapeChange: (value: AnimalCombShapeVariantId) => void;
  onHeadChange: (value: AnimalHeadVariantId) => void;
  onEyesChange: (value: AnimalEyeAccessoryVariantId) => void;
  onFeetChange: (value: AnimalFeetVariantId) => void;
  onHeadwearChange: (value: AnimalHeadwearVariantId) => void;
  onBodyColorChange: (value: string) => void;
  onTailColorChange: (value: string) => void;
  onWingColorChange: (value: string) => void;
  onCombColorChange: (value: string) => void;
  onBeakColorChange: (value: string) => void;
  onHeadwearColorChange: (value: string) => void;
}

export function ControlPanel({
  partSections,
  colorSections,
  selection,
  onBodyChange,
  onTailChange,
  onWingChange,
  onFeatherPatternChange,
  onTattooChange,
  onCombShapeChange,
  onHeadChange,
  onEyesChange,
  onFeetChange,
  onHeadwearChange,
  onBodyColorChange,
  onTailColorChange,
  onWingColorChange,
  onCombColorChange,
  onBeakColorChange,
  onHeadwearColorChange,
}: ControlPanelProps) {
  const handlePartChange = (section: AnimalPartSection, optionId: string) => {
    switch (section.id) {
      case 'body':
        onBodyChange(optionId as AnimalBodyVariantId);
        return;
      case 'tail':
        onTailChange(optionId as AnimalTailVariantId);
        return;
      case 'wings':
        onWingChange(optionId as AnimalWingVariantId);
        return;
      case 'featherPattern':
        onFeatherPatternChange(optionId as AnimalFeatherPatternVariantId);
        return;
      case 'tattoo':
        onTattooChange(optionId as AnimalTattooVariantId);
        return;
      case 'combShape':
        onCombShapeChange(optionId as AnimalCombShapeVariantId);
        return;
      case 'head':
        onHeadChange(optionId as AnimalHeadVariantId);
        return;
      case 'eyes':
        onEyesChange(optionId as AnimalEyeAccessoryVariantId);
        return;
      case 'feet':
        onFeetChange(optionId as AnimalFeetVariantId);
        return;
      case 'headwear':
        onHeadwearChange(optionId as AnimalHeadwearVariantId);
        return;
    }
  };

  const handleColorChange = (sectionId: ColorSection['id'], value: string) => {
    switch (sectionId) {
      case 'body':
        onBodyColorChange(value);
        return;
      case 'tail':
        onTailColorChange(value);
        return;
      case 'wings':
        onWingColorChange(value);
        return;
      case 'comb':
        onCombColorChange(value);
        return;
      case 'beak':
        onBeakColorChange(value);
        return;
      case 'headwear':
        onHeadwearColorChange(value);
        return;
    }
  };

  const selectedPartValue = (section: AnimalPartSection) => {
    switch (section.id) {
      case 'body':
        return selection.body;
      case 'tail':
        return selection.tail;
      case 'wings':
        return selection.wings;
      case 'featherPattern':
        return selection.featherPattern;
      case 'tattoo':
        return selection.tattoo;
      case 'combShape':
        return selection.combShape;
      case 'head':
        return selection.head;
      case 'eyes':
        return selection.eyes;
      case 'feet':
        return selection.feet;
      case 'headwear':
        return selection.headwear;
    }
  };

  return (
    <div className="control-stack">
      <div className="dropdown-grid">
        {partSections.map((section) => (
          <label className="dropdown-field" key={section.id}>
            <span className="field-label">{section.title}</span>
            <select
              value={selectedPartValue(section)}
              onChange={(event) => handlePartChange(section, event.target.value)}
            >
              {section.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        {colorSections.map((section) => (
          <label className="dropdown-field" key={section.id}>
            <span className="field-label">{section.title}</span>
            <div className="select-with-swatch">
              <span
                className="swatch-dot"
                style={{ backgroundColor: selection.colors[section.id] }}
                aria-hidden="true"
              />
              <select
                value={selection.colors[section.id]}
                onChange={(event) => handleColorChange(section.id, event.target.value)}
              >
                {section.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
