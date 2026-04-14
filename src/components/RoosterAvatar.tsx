import { useId } from 'react';
import type { RoosterSelection } from '../types/avatar';

interface RoosterAvatarProps {
  selection: RoosterSelection;
  isAnimated: boolean;
  showBackdrop?: boolean;
}

const outline = '#4f3922';
const tailBase = '#624126';
const eyeColor = '#2b1d12';

const getHeadTransform = (variant: RoosterSelection['head']) => {
  switch (variant) {
    case 'proud':
      return 'translate(12 -6)';
    case 'cheery':
      return 'translate(-8 7) rotate(6 218 104)';
    case 'alert':
    default:
      return undefined;
  }
};

const renderBodyClipShape = (variant: RoosterSelection['body']) => {
  switch (variant) {
    case 'plump':
      return <ellipse cx="154" cy="184" rx="82" ry="70" />;
    case 'runner':
      return <ellipse cx="160" cy="182" rx="76" ry="58" transform="rotate(-8 160 182)" />;
    case 'classic':
    default:
      return <ellipse cx="156" cy="184" rx="78" ry="64" />;
  }
};

const renderHeadwear = (
  variant: RoosterSelection['headwear'],
  fill: string,
) => {
  switch (variant) {
    case 'dunce-cap':
      return (
        <g transform="translate(2 -32)">
          <g transform="translate(442 0) scale(-1 1)">
            <path
              d="M206 120c-2-28 6-50 20-70 18 16 29 38 31 68-12 6-34 7-51 2z"
              fill={fill}
              stroke={outline}
              strokeLinejoin="round"
              strokeWidth="5"
            />
            <path d="M225 58c3-1 6 1 7 5-2 3-5 5-8 5-3-1-4-4-3-7 1-1 2-2 4-3z" fill="#f8f2df" stroke={outline} strokeWidth="4" />
            <path
              d="M198 117c16-6 36-6 59-1-8 9-21 14-36 15-11 0-20-5-23-14z"
              fill="#f4e7be"
              stroke={outline}
              strokeLinejoin="round"
              strokeWidth="5"
            />
            <path d="M221 70c6 13 10 27 12 42" fill="none" stroke="rgba(255,255,255,0.24)" strokeLinecap="round" strokeWidth="4" />
            <path d="M211 110c5 3 11 4 18 5" fill="none" stroke="rgba(79,57,34,0.22)" strokeLinecap="round" strokeWidth="3.5" />
          </g>
        </g>
      );
    case 'farmer-hat':
      return (
        <g transform="translate(442 0) scale(-1 1)">
          <ellipse cx="221" cy="90" rx="48" ry="11" fill="#f2e4b4" stroke={outline} strokeWidth="5" />
          <path
            d="M191 89c2-20 17-34 35-34 16 0 30 11 35 34-13 5-25 8-36 8-13 0-25-3-34-8z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M197 86c14 6 32 6 48 0" fill="none" stroke="#e9d7a5" strokeLinecap="round" strokeWidth="4" />
        </g>
      );
    case 'straw-hat':
      return (
        <g transform="translate(442 0) scale(-1 1)">
          <ellipse cx="221" cy="91" rx="46" ry="10" fill="#e8c96c" stroke={outline} strokeWidth="5" />
          <path
            d="M194 90c3-17 17-28 33-28 15 0 27 9 33 28-11 4-23 6-33 6-12 0-24-2-33-6z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M197 84h49" fill="none" stroke="#9c5e28" strokeLinecap="round" strokeWidth="5" />
        </g>
      );
    case 'none':
    default:
      return null;
  }
};

const renderBody = (variant: RoosterSelection['body'], fill: string) => {
  switch (variant) {
    case 'plump':
      return (
        <>
          <ellipse cx="154" cy="184" rx="82" ry="70" fill={fill} stroke={outline} strokeWidth="6" />
          <ellipse cx="128" cy="182" rx="22" ry="18" fill="rgba(255,255,255,0.18)" />
        </>
      );
    case 'runner':
      return (
        <>
          <ellipse
            cx="160"
            cy="182"
            rx="76"
            ry="58"
            transform="rotate(-8 160 182)"
            fill={fill}
            stroke={outline}
            strokeWidth="6"
          />
          <path
            d="M95 178c16-27 62-52 116-34"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeLinecap="round"
            strokeWidth="12"
          />
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <ellipse cx="156" cy="184" rx="78" ry="64" fill={fill} stroke={outline} strokeWidth="6" />
          <path
            d="M98 174c18-24 60-38 102-21"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeLinecap="round"
            strokeWidth="12"
          />
        </>
      );
  }
};

const renderWing = (variant: RoosterSelection['wings'], fill: string) => {
  switch (variant) {
    case 'spread':
      return (
        <path
          d="M116 182c-20-4-42 20-48 42 32 7 68-8 82-28 11-15 13-40-10-48-3 17-10 29-24 34z"
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="6"
        />
      );
    case 'layered':
      return (
        <g>
          <path
            d="M122 164c18-22 54-16 64 18-2 21-18 42-44 50-28-4-38-40-20-68z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="6"
          />
          <path d="M128 184c14 0 32 12 40 30" fill="none" stroke="rgba(255,255,255,0.22)" strokeLinecap="round" strokeWidth="10" />
          <path d="M120 196c12 2 25 11 31 25" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="8" />
        </g>
      );
    case 'tucked':
    default:
      return (
        <path
          d="M125 160c23-18 56-8 64 26-6 24-26 44-52 44-27-14-35-48-12-70z"
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="6"
        />
      );
  }
};

const renderTail = (variant: RoosterSelection['tail'], accent: string) => {
  switch (variant) {
    case 'fan':
      return (
        <>
          <path
            d="M54 186c-20-43 7-88 46-104 3 30 18 58 49 84-29 15-66 22-95 20z"
            fill={tailBase}
            opacity="0.95"
          />
          <path
            d="M68 174c-7-34 13-69 44-84 7 21 23 40 50 61-23 17-59 28-94 23z"
            fill={accent}
            opacity="0.9"
          />
          <path d="M74 134c18 10 35 26 47 50" fill="none" stroke="rgba(255,255,255,0.22)" strokeLinecap="round" strokeWidth="9" />
          <path d="M90 118c18 14 36 37 42 63" fill="none" stroke="rgba(255,255,255,0.16)" strokeLinecap="round" strokeWidth="7" />
        </>
      );
    case 'sickle':
      return (
        <>
          <path
            d="M70 210c-23-30-23-81 3-114 18-22 45-34 67-35-6 31 9 70 39 104-36 15-76 27-109 45z"
            fill={tailBase}
            opacity="0.96"
          />
          <path
            d="M85 196c-17-27-15-66 8-92 15-18 36-27 56-28-2 24 13 52 37 80-28 13-64 24-101 40z"
            fill={accent}
            opacity="0.9"
          />
          <path d="M104 104c17 20 29 47 32 78" fill="none" stroke="rgba(255,255,255,0.2)" strokeLinecap="round" strokeWidth="8" />
        </>
      );
    case 'fluffy':
      return (
        <>
          <path
            d="M62 192c-14-26-4-60 21-76 9-19 32-30 53-25 3 17 18 37 43 58-27 19-59 33-91 43-11 0-21 0-26 0z"
            fill={tailBase}
            opacity="0.95"
          />
          <path
            d="M76 182c-7-20 0-44 18-56 11-14 29-21 45-18 6 15 18 30 37 47-20 16-48 28-82 37-10-1-15-4-18-10z"
            fill={accent}
            opacity="0.9"
          />
          <circle cx="93" cy="139" r="10" fill="rgba(255,255,255,0.12)" />
          <circle cx="109" cy="121" r="12" fill="rgba(255,255,255,0.1)" />
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <path d="M66 175c-14-36 8-76 44-88 1 28 10 53 38 74-30 11-58 13-82 14z" fill={tailBase} opacity="0.95" />
          <path d="M76 165c-2-28 17-61 48-72 5 21 18 36 42 53-24 16-55 21-90 19z" fill={accent} opacity="0.9" />
        </>
      );
  }
};

const renderFeatherPattern = (
  variant: RoosterSelection['featherPattern'],
  clipPathId: string,
  accent: string,
) => {
  const clipPath = `url(#${clipPathId})`;

  switch (variant) {
    case 'barred':
      return (
        <g clipPath={clipPath} opacity="0.65">
          <path d="M96 150c31 4 60 4 89 0" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="8" />
          <path d="M88 172c36 7 73 7 112 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="9" />
          <path d="M86 194c34 8 73 8 118 0" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="8" />
          <path d="M95 216c28 5 61 5 96 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="8" />
        </g>
      );
    case 'speckled':
      return (
        <g clipPath={clipPath} opacity="0.75">
          <circle cx="114" cy="159" r="6" fill="rgba(255,255,255,0.18)" />
          <circle cx="145" cy="150" r="4" fill={accent} />
          <circle cx="174" cy="164" r="5" fill="rgba(255,255,255,0.18)" />
          <circle cx="126" cy="188" r="5" fill={accent} />
          <circle cx="163" cy="192" r="4" fill="rgba(255,255,255,0.18)" />
          <circle cx="188" cy="209" r="6" fill={accent} />
          <circle cx="138" cy="220" r="5" fill="rgba(255,255,255,0.18)" />
          <circle cx="103" cy="204" r="4" fill={accent} />
        </g>
      );
    case 'tipped':
      return (
        <g clipPath={clipPath} opacity="0.78">
          <path d="M102 158c10 10 24 16 42 20" fill="none" stroke="rgba(255,255,255,0.24)" strokeLinecap="round" strokeWidth="7" />
          <path d="M144 170c12 9 26 15 45 19" fill="none" stroke="rgba(255,255,255,0.24)" strokeLinecap="round" strokeWidth="7" />
          <path d="M99 188c11 9 27 17 47 20" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="7" />
          <path d="M145 198c10 10 24 16 41 20" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="7" />
          <path d="M108 214c12 8 24 12 36 15" fill="none" stroke="rgba(255,255,255,0.24)" strokeLinecap="round" strokeWidth="6" />
        </g>
      );
    case 'clean':
    default:
      return null;
  }
};

const renderComb = (variant: RoosterSelection['combShape'], fill: string, cx: number, cy: number) => {
  switch (variant) {
    case 'rose':
      return (
        <>
          <ellipse cx={cx - 8} cy={cy - 24} rx="21" ry="10" fill={fill} stroke={outline} strokeWidth="5" />
          <path
            d={`M${cx - 22} ${cy + 19}c11-7 24-8 34 0-4 11-14 18-26 18-8-4-11-11-8-18z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </>
      );
    case 'pea':
      return (
        <>
          <circle cx={cx - 22} cy={cy - 24} r="7" fill={fill} stroke={outline} strokeWidth="4.5" />
          <circle cx={cx - 10} cy={cy - 27} r="8" fill={fill} stroke={outline} strokeWidth="4.5" />
          <circle cx={cx + 3} cy={cy - 24} r="7" fill={fill} stroke={outline} strokeWidth="4.5" />
          <path
            d={`M${cx - 18} ${cy + 18}c7-5 17-6 24 0-2 9-9 15-18 16-6-4-8-9-6-16z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </>
      );
    case 'show':
      return (
        <>
          <path
            d={`M${cx - 32} ${cy - 10}c5-22 18-33 31-33 8 0 14 3 18 8-4 12-4 24 2 36-10 0-17-3-24-9-7 5-16 8-27 8z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d={`M${cx - 21} ${cy + 18}c13-7 27-6 37 3-4 15-14 23-28 24-11-6-15-17-9-27z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <path
            d={`M${cx - 31} ${cy - 19}c3-15 16-24 29-24 7 0 13 2 16 5-5 11-5 23 4 34-11 0-21-3-28-10-7 5-14 7-21 8z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d={`M${cx - 27} ${cy + 24}c11-2 22-1 29 6-2 9-9 17-21 19-9-6-12-16-8-25z`}
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </>
      );
  }
};

const renderChestFluff = (
  variant: RoosterSelection['chestFluff'],
  bodyFill: string,
  accentFill: string,
) => {
  switch (variant) {
    case 'ruff':
      return (
        <g>
          <path
            d="M188 132c12 4 22 13 28 25-6 12-17 21-31 27-16-3-28-13-35-28 6-10 18-20 38-24z"
            fill={bodyFill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M182 154c11 3 20 10 28 21" fill="none" stroke="rgba(255,255,255,0.2)" strokeLinecap="round" strokeWidth="7" />
        </g>
      );
    case 'puffed':
      return (
        <g>
          <path
            d="M184 136c17 4 33 15 39 33-3 17-17 31-38 38-20-3-35-18-37-38 4-15 15-28 36-33z"
            fill={bodyFill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <ellipse cx="184" cy="174" rx="22" ry="18" fill="rgba(255,255,255,0.14)" />
        </g>
      );
    case 'layered':
      return (
        <g>
          <path
            d="M186 136c15 5 28 15 33 29-5 17-18 29-36 34-20-5-30-18-33-33 4-13 17-25 36-30z"
            fill={bodyFill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            d="M176 152c9 2 18 9 25 18-5 7-12 11-22 13-8-3-14-8-18-15 4-8 8-13 15-16z"
            fill={accentFill}
            opacity="0.4"
          />
          <path d="M171 163c9 2 16 8 20 15" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="6" />
        </g>
      );
    case 'sleek':
    default:
      return (
        <path
          d="M188 141c11 5 18 14 20 24-5 10-13 17-25 21-12-3-19-12-22-22 4-11 12-18 27-23z"
          fill={bodyFill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="5"
        />
      );
  }
};

const renderHead = (
  variant: RoosterSelection['head'],
  combShape: RoosterSelection['combShape'],
  comb: string,
  beak: string,
) => {
  switch (variant) {
    case 'proud':
      return (
        <g>
          <circle cx="218" cy="104" r="34" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 218, 104)}
          <path d="M244 107l28 9-28 12c-8-3-10-17 0-21z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <circle cx="224" cy="103" r="4.7" fill={eyeColor} />
        </g>
      );
    case 'cheery':
      return (
        <g>
          <circle cx="214" cy="110" r="32" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 214, 110)}
          <path d="M239 114l25 8-25 11c-8-4-9-15 0-19z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <path d="M198 131c9 2 18 3 26 0" fill="none" stroke={outline} strokeLinecap="round" strokeWidth="4" />
          <circle cx="221" cy="108" r="4.7" fill={eyeColor} />
        </g>
      );
    case 'alert':
    default:
      return (
        <g>
          <circle cx="214" cy="110" r="32" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 214, 110)}
          <path d="M239 113l26 8-26 11c-7-4-9-16 0-19z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <circle cx="221" cy="108" r="4.7" fill={eyeColor} />
        </g>
      );
  }
};

const renderFeet = (variant: RoosterSelection['feet'], fill: string) => {
  switch (variant) {
    case 'scratch':
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M144 244l-4 44" fill="none" />
            <path d="M140 288l-20 8" fill="none" />
            <path d="M140 288l18 2" fill="none" />
            <path d="M140 288l-9 14" fill="none" />
            <path d="M136 241h10" />
            <path d="M136 241l8 47" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M188 240l10 50" fill="none" />
            <path d="M198 290l24 8" fill="none" />
            <path d="M198 290l-15 8" fill="none" />
            <path d="M198 290l9 14" fill="none" />
            <path d="M183 240h10" />
            <path d="M193 240l5 50" stroke={fill} />
          </g>
        </g>
      );
    case 'strut':
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M145 243l-14 48" fill="none" />
            <path d="M131 291l-22 6" fill="none" />
            <path d="M131 291l18 4" fill="none" />
            <path d="M131 291l-8 14" fill="none" />
            <path d="M145 243l-14 48" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M186 243l16 45" fill="none" />
            <path d="M202 288l26 4" fill="none" />
            <path d="M202 288l-16 12" fill="none" />
            <path d="M202 288l7 14" fill="none" />
            <path d="M186 243l16 45" stroke={fill} />
          </g>
        </g>
      );
    case 'sturdy':
    default:
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M148 244l-2 48" fill="none" />
            <path d="M146 292l-18 5" fill="none" />
            <path d="M146 292l18 5" fill="none" />
            <path d="M146 292l-8 14" fill="none" />
            <path d="M148 244l-2 48" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M184 244l2 48" fill="none" />
            <path d="M186 292l-18 5" fill="none" />
            <path d="M186 292l18 5" fill="none" />
            <path d="M186 292l8 14" fill="none" />
            <path d="M184 244l2 48" stroke={fill} />
          </g>
        </g>
      );
  }
};

export function RoosterAvatar({ selection, isAnimated, showBackdrop = true }: RoosterAvatarProps) {
  const svgId = useId().replace(/:/g, '');
  const bodyClipId = `${svgId}-body-clip`;
  const skyGradientId = `${svgId}-sky-gradient`;
  const groundGradientId = `${svgId}-ground-gradient`;
  const headTransform = getHeadTransform(selection.head);

  return (
    <svg
      className={`rooster-avatar${isAnimated ? '' : ' rooster-avatar--static'}`}
      viewBox="0 0 320 320"
      role="img"
      aria-label="Custom rooster avatar preview"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient id={skyGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cfeeff" />
          <stop offset="100%" stopColor="#fff7dc" />
        </linearGradient>
        <linearGradient id={groundGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7eb36f" />
          <stop offset="100%" stopColor="#5b924b" />
        </linearGradient>
        <clipPath id={bodyClipId}>{renderBodyClipShape(selection.body)}</clipPath>
      </defs>

      {showBackdrop ? (
        <>
          <rect x="12" y="12" width="296" height="296" rx="36" fill={`url(#${skyGradientId})`} />
          <circle cx="78" cy="66" r="22" fill="#fff1ab" opacity="0.75" />
          <path d="M18 228c53-18 102-10 150 12 42-17 92-16 134 3v65H18z" fill={`url(#${groundGradientId})`} />
          <rect x="42" y="134" width="56" height="66" rx="6" fill="#d38f4d" />
          <polygon points="36,138 70,108 104,138" fill="#8b5030" />
          <path d="M90 171h16M90 183h16" stroke="#f7d7ac" strokeLinecap="round" strokeWidth="5" />
        </>
      ) : null}

      <g transform="translate(30 2)">
        <ellipse className="rooster-shadow" cx="157" cy="274" rx="58" ry="11" fill="rgba(74, 55, 29, 0.18)" />
        <g className="rooster-travel">
          <g className="rooster-direction">
            <g className="rooster-bob">
              <g className="rooster-tail">{renderTail(selection.tail, selection.colors.wings)}</g>
              {renderFeet(selection.feet, selection.colors.beak)}
              {renderBody(selection.body, selection.colors.body)}
              {renderChestFluff(selection.chestFluff, selection.colors.body, selection.colors.wings)}
              {renderFeatherPattern(selection.featherPattern, bodyClipId, selection.colors.wings)}
              <g className="rooster-wing">{renderWing(selection.wings, selection.colors.wings)}</g>
              <g transform={headTransform}>
                <g className="rooster-head">
                  {renderHead(selection.head, selection.combShape, selection.colors.comb, selection.colors.beak)}
                  {renderHeadwear(selection.headwear, selection.colors.headwear)}
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
