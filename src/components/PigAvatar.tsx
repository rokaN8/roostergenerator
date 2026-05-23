import { memo, useId } from 'react';
import type { PigSelection } from '../types/avatar';

interface PigAvatarProps {
  selection: PigSelection;
  isAnimated: boolean;
  showBackdrop?: boolean;
}

const outline = '#4f3922';
const eyeColor = '#2b1d12';
const tattooTransform = 'translate(-6 52)';

const getHeadTransform = (variant: PigSelection['head']) => {
  switch (variant) {
    case 'sniffy':
      return 'translate(8 -4) rotate(-6 228 154)';
    case 'cheery':
      return 'translate(-4 6) rotate(4 222 158)';
    case 'calm':
    default:
      return undefined;
  }
};

const renderBodyClipShape = (variant: PigSelection['body']) => {
  switch (variant) {
    case 'round':
      return <ellipse cx="156" cy="190" rx="88" ry="63" />;
    case 'stout':
      return <ellipse cx="156" cy="197" rx="78" ry="54" transform="rotate(-4 156 197)" />;
    case 'chunky':
      return <ellipse cx="154" cy="194" rx="94" ry="69" />;
    case 'classic':
    default:
      return <ellipse cx="156" cy="192" rx="82" ry="58" />;
  }
};

const renderHeadwear = (variant: PigSelection['headwear'], fill: string) => {
  switch (variant) {
    case 'cap':
      return (
        <g transform="translate(450 0) scale(-1 1)">
          <path
            d="M188 126c10-16 25-24 42-24 15 0 28 7 36 20-15 8-31 11-47 11-12 0-22-2-31-7z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M197 129c22 4 41 4 58-2-6 8-17 13-32 14-12 0-21-4-26-12z" fill="#f0e4c1" stroke={outline} strokeWidth="4.5" />
          <path d="M257 123c12-2 22 0 31 5-8 8-18 10-28 9" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="4.5" />
        </g>
      );
    case 'farmer-hat':
      return (
        <g transform="translate(450 0) scale(-1 1)">
          <ellipse cx="222" cy="122" rx="54" ry="12" fill="#f2e4b4" stroke={outline} strokeWidth="5" />
          <path
            d="M190 121c4-18 18-30 34-30 17 0 31 10 37 30-14 5-27 8-38 8-13 0-24-3-33-8z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
        </g>
      );
    case 'straw-hat':
      return (
        <g transform="translate(450 0) scale(-1 1)">
          <ellipse cx="222" cy="123" rx="53" ry="12" fill="#e8c96c" stroke={outline} strokeWidth="5" />
          <path
            d="M193 122c4-15 17-26 31-26 16 0 27 9 33 26-11 4-22 6-33 6-12 0-23-2-31-6z"
            fill={fill}
            stroke={outline}
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path d="M196 117h52" fill="none" stroke="#9c5e28" strokeLinecap="round" strokeWidth="4.5" />
        </g>
      );
    case 'none':
    default:
      return null;
  }
};

const renderBody = (variant: PigSelection['body'], fill: string) => {
  switch (variant) {
    case 'round':
      return (
        <>
          <ellipse cx="156" cy="190" rx="88" ry="63" fill={fill} stroke={outline} strokeWidth="6" />
          <ellipse cx="122" cy="180" rx="22" ry="16" fill="rgba(255,255,255,0.16)" />
        </>
      );
    case 'stout':
      return (
        <>
          <ellipse
            cx="156"
            cy="197"
            rx="78"
            ry="54"
            transform="rotate(-4 156 197)"
            fill={fill}
            stroke={outline}
            strokeWidth="6"
          />
          <path d="M98 190c18-13 55-15 93-3" fill="none" stroke="rgba(255,255,255,0.15)" strokeLinecap="round" strokeWidth="9" />
        </>
      );
    case 'chunky':
      return (
        <>
          <ellipse cx="154" cy="194" rx="94" ry="69" fill={fill} stroke={outline} strokeWidth="6" />
          <ellipse cx="117" cy="189" rx="24" ry="18" fill="rgba(255,255,255,0.13)" />
          <ellipse cx="174" cy="217" rx="28" ry="14" fill="rgba(255,255,255,0.08)" />
        </>
      );
    case 'classic':
    default:
      return (
        <>
          <ellipse cx="156" cy="192" rx="82" ry="58" fill={fill} stroke={outline} strokeWidth="6" />
          <path d="M100 184c19-14 54-20 94-7" fill="none" stroke="rgba(255,255,255,0.15)" strokeLinecap="round" strokeWidth="10" />
        </>
      );
  }
};

const renderTail = (variant: PigSelection['tail'], fill: string) => {
  switch (variant) {
    case 'loop':
      return (
        <g fill="none" stroke={outline} strokeLinecap="round" strokeWidth="6">
          <path d="M71 188c-16 0-26 13-25 24 1 12 12 18 23 14 9-3 11-16 3-21-7-4-15 3-9 10" />
          <path d="M63 193c-6 1-12 4-16 9" stroke={fill} strokeWidth="3.5" />
        </g>
      );
    case 'flick':
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M82 189c-18-2-30 11-31 25" stroke={outline} strokeWidth="6" />
          <path d="M51 214c6-4 13-5 20-3" stroke={outline} strokeWidth="5" />
          <path d="M82 189c-11 0-20 6-24 15" stroke={fill} strokeWidth="3.5" />
        </g>
      );
    case 'curly':
    default:
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M79 191c-17-4-32 8-33 22-1 12 8 22 19 20 10-1 15-14 8-21-6-6-17-2-16 7" stroke={outline} strokeWidth="6" />
          <path d="M79 191c-10-2-20 4-25 12" stroke={fill} strokeWidth="3.5" />
        </g>
      );
  }
};

const renderEars = (variant: PigSelection['wings'], fill: string) => {
  switch (variant) {
    case 'floppy':
      return (
        <g>
          <path d="M195 126c-9-16-3-31 10-39 10 8 14 24 9 39" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <path d="M220 122c7-18 22-29 40-31 6 14 0 30-14 41" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
        </g>
      );
    case 'patchy':
      return (
        <g>
          <path d="M196 123c-4-18 3-31 17-39 10 10 12 27 2 42" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <path d="M221 124c12-16 28-24 43-23 2 15-7 29-24 38" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
        </g>
      );
    case 'perky':
    default:
      return (
        <g>
          <path d="M195 123c-6-18-1-33 13-43 12 11 15 29 5 45" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
          <path d="M221 124c10-18 26-29 43-29 4 15-4 31-20 41" fill={fill} stroke={outline} strokeLinejoin="round" strokeWidth="5" />
        </g>
      );
  }
};

const renderMarkings = (
  variant: PigSelection['featherPattern'],
  clipPathId: string,
  accent: string,
  hoofColor: string,
) => {
  const clipPath = `url(#${clipPathId})`;

  switch (variant) {
    case 'spots':
      return (
        <g clipPath={clipPath} opacity="0.62">
          <circle cx="118" cy="172" r="12" fill={accent} />
          <circle cx="164" cy="160" r="10" fill="rgba(255,255,255,0.18)" />
          <circle cx="184" cy="203" r="14" fill={accent} />
          <circle cx="136" cy="208" r="8" fill="rgba(255,255,255,0.18)" />
        </g>
      );
    case 'patches':
      return (
        <g clipPath={clipPath} opacity="0.62">
          <ellipse cx="118" cy="182" rx="26" ry="18" fill={accent} />
          <ellipse cx="190" cy="169" rx="22" ry="16" fill="rgba(255,255,255,0.18)" />
          <ellipse cx="173" cy="210" rx="25" ry="14" fill={accent} />
        </g>
      );
    case 'socks':
      return (
        <g clipPath={clipPath} opacity="0.68">
          <rect x="111" y="224" width="18" height="40" rx="8" fill={hoofColor} />
          <rect x="142" y="224" width="18" height="40" rx="8" fill={hoofColor} />
          <rect x="174" y="224" width="18" height="40" rx="8" fill={hoofColor} />
          <rect x="204" y="224" width="18" height="40" rx="8" fill={hoofColor} />
        </g>
      );
    case 'clean':
    default:
      return null;
  }
};

const renderTattoo = (variant: PigSelection['tattoo'], clipPathId: string) => {
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

const renderEyeAccessory = (variant: PigSelection['eyes'], eyeX: number, eyeY: number) => {
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

const renderSnout = (variant: PigSelection['combShape'], snoutFill: string, accent: string, cx: number, cy: number) => {
  switch (variant) {
    case 'button':
      return (
        <g>
          <ellipse cx={cx} cy={cy} rx="18" ry="14" fill={snoutFill} stroke={outline} strokeWidth="5" />
          <circle cx={cx - 6} cy={cy} r="2.7" fill={accent} />
          <circle cx={cx + 6} cy={cy} r="2.7" fill={accent} />
        </g>
      );
    case 'wide':
      return (
        <g>
          <ellipse cx={cx} cy={cy} rx="26" ry="16" fill={snoutFill} stroke={outline} strokeWidth="5" />
          <ellipse cx={cx - 8} cy={cy} rx="3.2" ry="4.2" fill={accent} />
          <ellipse cx={cx + 8} cy={cy} rx="3.2" ry="4.2" fill={accent} />
        </g>
      );
    case 'upturned':
      return (
        <g transform={`rotate(-8 ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="23" ry="15" fill={snoutFill} stroke={outline} strokeWidth="5" />
          <ellipse cx={cx - 7} cy={cy - 1} rx="3" ry="4" fill={accent} />
          <ellipse cx={cx + 7} cy={cy - 1} rx="3" ry="4" fill={accent} />
        </g>
      );
    case 'round':
    default:
      return (
        <g>
          <ellipse cx={cx} cy={cy} rx="22" ry="15" fill={snoutFill} stroke={outline} strokeWidth="5" />
          <ellipse cx={cx - 7} cy={cy} rx="3" ry="4" fill={accent} />
          <ellipse cx={cx + 7} cy={cy} rx="3" ry="4" fill={accent} />
        </g>
      );
  }
};

const renderHead = (
  variant: PigSelection['head'],
  earVariant: PigSelection['wings'],
  snoutVariant: PigSelection['combShape'],
  eyes: PigSelection['eyes'],
  earFill: string,
  accent: string,
  hoofFill: string,
) => {
  switch (variant) {
    case 'sniffy':
      return (
        <g>
          {renderEars(earVariant, earFill)}
          <circle cx="223" cy="157" r="34" fill="#f3bfca" stroke={outline} strokeWidth="6" />
          {renderSnout(snoutVariant, hoofFill, accent, 248, 163)}
          <circle cx="223" cy="151" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 223, 151)}
        </g>
      );
    case 'cheery':
      return (
        <g>
          {renderEars(earVariant, earFill)}
          <circle cx="219" cy="160" r="33" fill="#f3bfca" stroke={outline} strokeWidth="6" />
          {renderSnout(snoutVariant, hoofFill, accent, 243, 166)}
          <path d="M205 177c8 3 15 3 22 0" fill="none" stroke={outline} strokeLinecap="round" strokeWidth="4" />
          <circle cx="219" cy="154" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 219, 154)}
        </g>
      );
    case 'calm':
    default:
      return (
        <g>
          {renderEars(earVariant, earFill)}
          <circle cx="221" cy="159" r="33" fill="#f3bfca" stroke={outline} strokeWidth="6" />
          {renderSnout(snoutVariant, hoofFill, accent, 245, 165)}
          <circle cx="221" cy="153" r="4.6" fill={eyeColor} />
          {renderEyeAccessory(eyes, 221, 153)}
        </g>
      );
  }
};

const renderFeet = (variant: PigSelection['feet'], fill: string) => {
  const hoof = (x: number, y: number) => (
    <g>
      <path d={`M${x} ${y}v23`} fill="none" stroke={outline} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x - 5} ${y + 23}h10`} fill="none" stroke={fill} strokeWidth="8" strokeLinecap="round" />
      <path d={`M${x} ${y + 22}v7`} fill="none" stroke={outline} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );

  switch (variant) {
    case 'trot':
      return (
        <g>
          <g className="rooster-leg rooster-leg--rear">
            {hoof(128, 236)}
            {hoof(157, 243)}
          </g>
          <g className="rooster-leg rooster-leg--front">
            {hoof(188, 236)}
            {hoof(215, 243)}
          </g>
        </g>
      );
    case 'bounce':
      return (
        <g>
          <g className="rooster-leg rooster-leg--rear">
            {hoof(132, 242)}
            {hoof(160, 236)}
          </g>
          <g className="rooster-leg rooster-leg--front">
            {hoof(190, 242)}
            {hoof(214, 236)}
          </g>
        </g>
      );
    case 'sturdy':
    default:
      return (
        <g>
          <g className="rooster-leg rooster-leg--rear">
            {hoof(131, 240)}
            {hoof(158, 240)}
          </g>
          <g className="rooster-leg rooster-leg--front">
            {hoof(190, 240)}
            {hoof(216, 240)}
          </g>
        </g>
      );
  }
};

export const PigAvatar = memo(function PigAvatar({ selection, isAnimated, showBackdrop = true }: PigAvatarProps) {
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
      aria-label="Custom pig avatar preview"
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

      <g transform="translate(24 2)">
        <ellipse className="rooster-shadow" cx="162" cy="278" rx="64" ry="10" fill="rgba(74, 55, 29, 0.16)" />
        <g className="rooster-travel">
          <g className="rooster-direction">
            <g className="rooster-bob">
              <g className="rooster-tail">{renderTail(selection.tail, selection.colors.tail)}</g>
              {renderFeet(selection.feet, selection.colors.beak)}
              {renderBody(selection.body, selection.colors.body)}
              {renderMarkings(selection.featherPattern, bodyClipId, selection.colors.wings, selection.colors.beak)}
              {renderTattoo(selection.tattoo, bodyClipId)}
              <g transform={headTransform}>
                <g className="rooster-head">
                  {renderHead(
                    selection.head,
                    selection.wings,
                    selection.combShape,
                    selection.eyes,
                    selection.colors.wings,
                    selection.colors.comb,
                    selection.colors.beak,
                  )}
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
