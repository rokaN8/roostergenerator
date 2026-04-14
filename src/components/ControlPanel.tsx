import type {
  BodyVariantId,
  ColorSection,
  FeatherPatternVariantId,
  FeetVariantId,
  HeadVariantId,
  HeadwearVariantId,
  RoosterPartSection,
  RoosterSelection,
  TailVariantId,
  WingVariantId,
} from '../types/avatar';
import './ControlPanel.css';

interface ControlPanelProps {
  partSections: RoosterPartSection[];
  colorSections: ColorSection[];
  selection: RoosterSelection;
  onBodyChange: (value: BodyVariantId) => void;
  onTailChange: (value: TailVariantId) => void;
  onWingChange: (value: WingVariantId) => void;
  onFeatherPatternChange: (value: FeatherPatternVariantId) => void;
  onHeadChange: (value: HeadVariantId) => void;
  onFeetChange: (value: FeetVariantId) => void;
  onHeadwearChange: (value: HeadwearVariantId) => void;
  onBodyColorChange: (value: string) => void;
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
  onHeadChange,
  onFeetChange,
  onHeadwearChange,
  onBodyColorChange,
  onWingColorChange,
  onCombColorChange,
  onBeakColorChange,
  onHeadwearColorChange,
}: ControlPanelProps) {
  const handlePartChange = (section: RoosterPartSection, optionId: string) => {
    switch (section.id) {
      case 'body':
        onBodyChange(optionId as BodyVariantId);
        return;
      case 'tail':
        onTailChange(optionId as TailVariantId);
        return;
      case 'wings':
        onWingChange(optionId as WingVariantId);
        return;
      case 'featherPattern':
        onFeatherPatternChange(optionId as FeatherPatternVariantId);
        return;
      case 'head':
        onHeadChange(optionId as HeadVariantId);
        return;
      case 'feet':
        onFeetChange(optionId as FeetVariantId);
        return;
      case 'headwear':
        onHeadwearChange(optionId as HeadwearVariantId);
        return;
    }
  };

  const handleColorChange = (sectionId: ColorSection['id'], value: string) => {
    switch (sectionId) {
      case 'body':
        onBodyColorChange(value);
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

  const selectedPartValue = (section: RoosterPartSection) => {
    switch (section.id) {
      case 'body':
        return selection.body;
      case 'tail':
        return selection.tail;
      case 'wings':
        return selection.wings;
      case 'featherPattern':
        return selection.featherPattern;
      case 'head':
        return selection.head;
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
