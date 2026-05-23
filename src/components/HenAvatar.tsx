import { memo, useId } from 'react';
import type { HenSelection } from '../types/avatar';

interface HenAvatarProps {
  selection: HenSelection;
  isAnimated: boolean;
  showBackdrop?: boolean;
}

const outline = '#4f3922';
const eyeColor = '#2b1d12';
const tattooTransform = 'translate(-10 52)';

const getHeadTransform = (variant: HenSelection['head']) => {
  switch (variant) {
    case 'curious':
      return 'translate(6 4) rotate(-6 220 112)';
    case 'cheery':
      return 'translate(-4 6) rotate(5 216 114)';
    case 'calm':
    default:
      return undefined;
  }
};

const renderBodyClipShape = (variant: HenSelection['body']) => {
  switch (variant) {
    case 'round':
      return <ellipse cx="160" cy="194" rx="82" ry="67" />;
    case 'petite':
      return <ellipse cx="162" cy="196" rx="60" ry="49" transform="rotate(-6 162 196)" />;
    case 'fluffy':
      return <ellipse cx="158" cy="196" rx="90" ry="72" />;
    case 'classic':
    default:
      return <ellipse cx="160" cy="192" rx="74" ry="60" />;
  }
};

const renderHeadwear = (variant: HenSelection['headwear'], fill: string) => {
  switch (variant) {
    case 'bonnet':
      return (
        <g transform="translate(436 0) scale(-1 1)">
          <path
            d="M191 92c8-18 24-28 42-28 17 0 30 10 38 27-14 9-30 13-46 12-13-1-25-4-34-11z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M203 99c8 9 14 20 17 32" fill="none" stroke={fill} strokeLinecap="round" strokeWidth="5" />
          <path d="M238 98c-4 11-5 21-2 32" fill="none" stroke={fill} strokeLinecap="round" strokeWidth="5" />
          <path d="M214 131c4 5 8 8 13 8s9-3 13-8c-1 8-6 13-13 13s-12-5-13-13z" fill="#f2d7df" stroke={outline} strokeWidth="4" />
        </g>
      );
    case 'farmer-hat':
      return (
        <g transform="translate(436 0) scale(-1 1)">
          <ellipse cx="224" cy="93" rx="45" ry="10" fill="#f2e4b4" stroke={outline} strokeWidth="5" />
          <path
            d="M196 92c2-18 16-31 33-31 15 0 28 10 33 31-12 5-23 8-34 8-12 0-23-3-32-8z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </g>
      );
    case 'straw-hat':
      return (
        <g transform="translate(436 0) scale(-1 1)">
          <ellipse cx="224" cy="94" rx="44" ry="10" fill="#e7c56c" stroke={outline} strokeWidth="5" />
          <path
            d="M198 93c3-15 16-25 31-25 14 0 25 9 31 25-10 4-21 6-31 6-11 0-22-2-31-6z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M202 88h46" fill="none" stroke="#a16932" strokeLinecap="round" strokeWidth="4.5" />
        </g>
      );
    case 'none':
    default:
      return null;
  }
};

const renderBody = (variant: HenSelection['body'], fill: string) => {
  switch (variant) {
    case 'round':
      return (
        <>
          <ellipse cx="160" cy="194" rx="82" ry="67" fill={fill} stroke={outline} strokeWidth="6" />
          <ellipse cx="132" cy="188" rx="22" ry="18" fill="rgba(255,255,255,0.18)" />
        </>
      );
    case 'petite':
      return (
        <>
          <ellipse
            cx="162"
            cy="196"
            rx="60"
            ry="49"
            transform="rotate(-6 162 196)"
            fill={fill}
            stroke={outline}
            strokeWidth="6"
          />
          <path d="M118 190c15-14 42-18 67-6" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="9" />
        </>
      );
    case 'fluffy':
      return (
        <>
          <ellipse cx="158" cy="196" rx="90" ry="72" fill={fill} stroke={outline} strokeWidth="6" />
          <circle cx="113" cy="187" r="17" fill="rgba(255,255,255,0.14)" />
          <circle cx="150" cy="227" r="22" fill="rgba(255,255,255,0.08)" />
          <circle cx="192" cy="213" r="16" fill="rgba(255,255,255,0.1)" />
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <ellipse cx="160" cy="192" rx="74" ry="60" fill={fill} stroke={outline} strokeWidth="6" />
          <path d="M108 184c18-18 54-27 92-12" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="10" />
        </>
      );
  }
};

const renderWing = (variant: HenSelection['wings'], fill: string) => {
  switch (variant) {
    case 'layered':
      return (
        <g>
          <path
            d="M128 170c18-18 49-11 58 17-3 22-19 40-43 47-26-5-35-36-15-64z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="6"
          />
          <path d="M135 188c12 1 26 10 34 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeLinecap="round" strokeWidth="8" />
          <path d="M130 201c10 3 19 10 24 21" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="6" />
        </g>
      );
    case 'flutter':
      return (
        <path
          d="M122 173c-7-16 5-37 26-45 28 5 44 29 40 53-12 19-35 31-56 26-14-9-18-20-10-34z"
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="6"
        />
      );
    case 'tucked':
    default:
      return (
        <path
          d="M129 170c21-15 50-7 57 21-6 20-22 37-44 41-23-9-31-39-13-62z"
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="6"
        />
      );
  }
};

const renderTail = (variant: HenSelection['tail'], fill: string) => {
  switch (variant) {
    case 'fan':
      return (
        <>
          <path
            d="M78 188c-6-31 15-58 45-67 5 19 18 36 39 49-23 13-54 22-84 18z"
            fill="#7b573c"
            stroke={outline}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M88 179c-1-21 15-41 37-47 6 13 17 23 35 34-20 12-47 18-72 13z"
            fill={fill}
            stroke={outline}
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </>
      );
    case 'upright':
      return (
        <>
          <path
            d="M84 200c-10-30 1-63 25-80 15-11 31-15 45-12-4 20 5 42 25 64-25 13-58 24-95 28z"
            fill="#7b573c"
            stroke={outline}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M97 188c-7-20 2-43 21-55 11-8 24-11 36-8 0 15 9 31 24 49-20 10-47 17-81 24z"
            fill={fill}
            stroke={outline}
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </>
      );
    case 'neat':
    default:
      return (
        <>
          <path
            d="M91 189c-6-20 8-40 30-46 4 13 14 25 31 35-19 9-42 14-61 11z"
            fill="#7b573c"
            stroke={outline}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M100 182c-3-13 7-25 24-28 5 9 13 17 28 24-16 8-34 11-52 9z"
            fill={fill}
            stroke={outline}
            strokeWidth="3"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </>
      );
  }
};

const renderFeatherPattern = (
  variant: HenSelection['featherPattern'],
  clipPathId: string,
  accent: string,
) => {
  const clipPath = `url(#${clipPathId})`;

  switch (variant) {
    case 'barred':
      return (
        <g clipPath={clipPath} opacity="0.65">
          <path d="M108 164c30 4 57 4 85 0" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="7" />
          <path d="M101 184c34 6 67 6 102 0" fill="none" stroke="rgba(255,255,255,0.18)" strokeLinecap="round" strokeWidth="8" />
          <path d="M98 205c34 7 69 7 105 0" fill="none" stroke={accent} strokeLinecap="round" strokeWidth="7" />
        </g>
      );
    case 'speckled':
      return (
        <g clipPath={clipPath} opacity="0.75">
          <circle cx="122" cy="167" r="5" fill="rgba(255,255,255,0.18)" />
          <circle cx="149" cy="160" r="4" fill={accent} />
          <circle cx="175" cy="173" r="5" fill="rgba(255,255,255,0.18)" />
          <circle cx="126" cy="196" r="5" fill={accent} />
          <circle cx="161" cy="198" r="4" fill="rgba(255,255,255,0.18)" />
          <circle cx="183" cy="212" r="5" fill={accent} />
        </g>
      );
    case 'patched':
      return (
        <g clipPath={clipPath} opacity="0.7">
          <ellipse cx="125" cy="177" rx="19" ry="13" fill="rgba(255,255,255,0.16)" />
          <ellipse cx="168" cy="163" rx="17" ry="12" fill={accent} />
          <ellipse cx="176" cy="205" rx="22" ry="15" fill="rgba(255,255,255,0.16)" />
        </g>
      );
    case 'clean':
    default:
      return null;
  }
};

const renderTattoo = (variant: HenSelection['tattoo'], clipPathId: string) => {
  const clipPath = `url(#${clipPathId})`;
  const tattooStroke = 'rgba(56, 43, 36, 0.58)';
  const tattooFill = 'rgba(56, 43, 36, 0.1)';

  switch (variant) {
    case 'heart':
      return (
        <g clipPath={clipPath} opacity="0.95" transform={tattooTransform}>
          <path
            d="M176 150c-7-10-2-21 8-21 5 0 9 3 11 8 2-5 5-8 10-8 10 0 15 11 8 21-6 8-13 14-18 20-6-6-13-12-19-20z"
            fill={tattooFill}
            stroke={tattooStroke}
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </g>
      );
    case 'flower':
      return (
        <g clipPath={clipPath} opacity="0.95" transform={tattooTransform}>
          <circle cx="184" cy="148" r="5" fill={tattooFill} stroke={tattooStroke} strokeWidth="3.5" />
          <circle cx="173" cy="148" r="6" fill={tattooFill} stroke={tattooStroke} strokeWidth="3.5" />
          <circle cx="195" cy="148" r="6" fill={tattooFill} stroke={tattooStroke} strokeWidth="3.5" />
          <circle cx="184" cy="137" r="6" fill={tattooFill} stroke={tattooStroke} strokeWidth="3.5" />
          <circle cx="184" cy="159" r="6" fill={tattooFill} stroke={tattooStroke} strokeWidth="3.5" />
        </g>
      );
    case 'star':
      return (
        <g clipPath={clipPath} opacity="0.95" transform={tattooTransform}>
          <path
            d="M184 131l4 11 12 1-9 7 3 12-10-6-10 6 3-12-9-7 12-1z"
            fill={tattooFill}
            stroke={tattooStroke}
            strokeLinejoin="round"
            strokeWidth="4"
          />
        </g>
      );
    case 'none':
    default:
      return null;
  }
};

const renderComb = (variant: HenSelection['combShape'], fill: string, cx: number, cy: number) => {
  switch (variant) {
    case 'rose':
      return <ellipse cx={cx - 8} cy={cy - 19} rx="16" ry="7" fill={fill} stroke={outline} strokeWidth="4.5" />;
    case 'pea':
      return (
        <>
          <circle cx={cx - 18} cy={cy - 22} r="5.5" fill={fill} stroke={outline} strokeWidth="4" />
          <circle cx={cx - 8} cy={cy - 24} r="6.5" fill={fill} stroke={outline} strokeWidth="4" />
          <circle cx={cx + 2} cy={cy - 22} r="5.5" fill={fill} stroke={outline} strokeWidth="4" />
        </>
      );
    case 'crest':
      return (
        <path
          d={`M${cx - 18} ${cy - 16}c4-16 17-27 27-25 8 2 15 13 14 27-10 6-27 8-41-2z`}
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="4.5"
        />
      );
    case 'petite':
    default:
      return (
        <path
          d={`M${cx - 18} ${cy - 18}c0-8 4-14 8-15 4-1 7 5 6 14 1-8 4-15 8-15 4 0 6 8 5 15z`}
          fill={fill}
          stroke={outline}
          strokeLinejoin="round"
          strokeWidth="4.5"
        />
      );
  }
};

const renderEyeAccessory = (
  variant: HenSelection['eyes'],
  eyeX: number,
  eyeY: number,
) => {
  switch (variant) {
    case 'round-glasses':
      return (
        <g fill="none" stroke={outline} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx={eyeX} cy={eyeY} r="9" />
          <path d={`M${eyeX + 9} ${eyeY - 2}l11 2`} />
        </g>
      );
    case 'sunglasses':
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round">
          <path
            d={`M${eyeX - 10} ${eyeY - 6}c6-3 14-3 20 0 0 7-1 12-4 14-7 2-13 2-20 0-1-5 0-10 4-14z`}
            fill="#1f242c"
            strokeWidth="3.8"
          />
          <path d={`M${eyeX + 8} ${eyeY - 4}l11 1`} fill="none" strokeWidth="3.2" />
        </g>
      );
    case 'none':
    default:
      return null;
  }
};

const renderHead = (
  variant: HenSelection['head'],
  combShape: HenSelection['combShape'],
  eyes: HenSelection['eyes'],
  comb: string,
  beak: string,
) => {
  switch (variant) {
    case 'curious':
      return (
        <g>
          <ellipse cx="213" cy="138" rx="13" ry="13" fill={comb} stroke={outline} strokeWidth="5" />
          <circle cx="220" cy="111" r="31" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 220, 111)}
          <path d="M245 114l25 7-24 11c-8-3-9-14-1-18z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <circle cx="226" cy="110" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 226, 110)}
        </g>
      );
    case 'cheery':
      return (
        <g>
          <ellipse cx="208" cy="142" rx="12" ry="12" fill={comb} stroke={outline} strokeWidth="5" />
          <circle cx="216" cy="114" r="30" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 216, 114)}
          <path d="M240 118l24 8-24 10c-7-3-8-13 0-18z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <path d="M199 132c8 2 15 2 22 0" fill="none" stroke={outline} strokeLinecap="round" strokeWidth="4" />
          <circle cx="222" cy="112" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 222, 112)}
        </g>
      );
    case 'calm':
    default:
      return (
        <g>
          <ellipse cx="210" cy="142" rx="12" ry="12" fill={comb} stroke={outline} strokeWidth="5" />
          <circle cx="218" cy="113" r="30" fill="#f4eddc" stroke={outline} strokeWidth="6" />
          {renderComb(combShape, comb, 218, 113)}
          <path d="M242 117l24 8-24 10c-7-3-8-13 0-18z" fill={beak} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <circle cx="224" cy="111" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 224, 111)}
        </g>
      );
  }
};

const renderFeet = (variant: HenSelection['feet'], fill: string) => {
  switch (variant) {
    case 'scratch':
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M149 248l-3 41" fill="none" />
            <path d="M146 289l-18 8" fill="none" />
            <path d="M146 289l15 3" fill="none" />
            <path d="M146 289l-9 12" fill="none" />
            <path d="M149 248l-3 41" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M186 247l9 46" fill="none" />
            <path d="M195 293l22 7" fill="none" />
            <path d="M195 293l-14 8" fill="none" />
            <path d="M195 293l8 13" fill="none" />
            <path d="M186 247l9 46" stroke={fill} />
          </g>
        </g>
      );
    case 'step':
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M150 247l-11 43" fill="none" />
            <path d="M139 290l-18 6" fill="none" />
            <path d="M139 290l16 4" fill="none" />
            <path d="M139 290l-8 12" fill="none" />
            <path d="M150 247l-11 43" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M184 247l13 40" fill="none" />
            <path d="M197 287l22 3" fill="none" />
            <path d="M197 287l-14 10" fill="none" />
            <path d="M197 287l7 12" fill="none" />
            <path d="M184 247l13 40" stroke={fill} />
          </g>
        </g>
      );
    case 'sturdy':
    default:
      return (
        <g stroke={outline} strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
          <g className="rooster-leg rooster-leg--rear">
            <path d="M151 248l-2 43" fill="none" />
            <path d="M149 291l-16 4" fill="none" />
            <path d="M149 291l16 4" fill="none" />
            <path d="M149 291l-7 12" fill="none" />
            <path d="M151 248l-2 43" stroke={fill} />
          </g>
          <g className="rooster-leg rooster-leg--front">
            <path d="M184 248l2 43" fill="none" />
            <path d="M186 291l-16 4" fill="none" />
            <path d="M186 291l16 4" fill="none" />
            <path d="M186 291l7 12" fill="none" />
            <path d="M184 248l2 43" stroke={fill} />
          </g>
        </g>
      );
  }
};

export const HenAvatar = memo(function HenAvatar({ selection, isAnimated, showBackdrop = true }: HenAvatarProps) {
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
      aria-label="Custom hen avatar preview"
      width="100%"
      height="100%"
    >
      <defs>
        {showBackdrop && (
          <>
            <linearGradient id={skyGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cfeeff" />
              <stop offset="100%" stopColor="#fff7dc" />
            </linearGradient>
            <linearGradient id={groundGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7eb36f" />
              <stop offset="100%" stopColor="#5b924b" />
            </linearGradient>
          </>
        )}
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
        <ellipse className="rooster-shadow" cx="160" cy="277" rx="54" ry="10" fill="rgba(74, 55, 29, 0.16)" />
        <g className="rooster-travel">
          <g className="rooster-direction">
            <g className="rooster-bob">
              <g className="rooster-tail">{renderTail(selection.tail, selection.colors.tail)}</g>
              {renderFeet(selection.feet, selection.colors.beak)}
              {renderBody(selection.body, selection.colors.body)}
              {renderFeatherPattern(selection.featherPattern, bodyClipId, selection.colors.wings)}
              {renderTattoo(selection.tattoo, bodyClipId)}
              <g className="rooster-wing">{renderWing(selection.wings, selection.colors.wings)}</g>
              <g transform={headTransform}>
                <g className="rooster-head">
                  {renderHead(selection.head, selection.combShape, selection.eyes, selection.colors.comb, selection.colors.beak)}
                  {renderHeadwear(selection.headwear, selection.colors.headwear)}
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});
