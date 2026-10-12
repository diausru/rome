// Tax Secrets Canada brand tokens for the motion engine (v1, 2026-10-12). The look stays ours: dark navy / charcoal /
// blue-gray environments, white type, restrained gold, purposeful Canadian red, dark-glass panels, ALL-CAPS headings,
// Mont (Montserrat) as in the Kit. Values live here so every reel and the checker read the same numbers.
export const T = {
  white: '#f6f7fb', soft: 'rgba(232,236,244,.84)', mute: 'rgba(196,206,222,.62)',
  gold: '#f1c75b', goldHi: '#fff1c2', goldDeep: '#c88f1f', amber: '#ffb547',
  red: '#e0392b', redSoft: '#ff7a68', green: '#7fe0a8',
  navy: '#0b1424', charcoal: '#14171d', blueGray: '#3a4a5e',
  glass: 'linear-gradient(160deg, rgba(18,26,40,.68), rgba(10,14,22,.52))',
  glassEdge: 'rgba(190,210,240,.20)',
  font: 'Mont',
};

// Safe area for 1080×1920 Reels / Shorts / TikTok, adapted from marketing-skill's render.js (left 60, right 960,
// top 150, bottom 1450): the platform UI covers the top bar, the caption/handle block at the bottom and the action
// buttons on the right. We keep the full right margin (1020) above y 1100 and pull it to 960 below, where the
// action buttons sit, so the established 920-px-wide panels at x 80 stay legal in the upper and middle zones.
export const SAFE = { left: 60, right: 1020, top: 150, bottom: 1450, rightLow: 960, lowFrom: 1100 };

// Our layout zones (the checker compares every declared box with SAFE).
export const ZONE = { header: 92, title: 176, panelTop: 360, captionTop: 1296, captionH: 120 };

export const goldFill: React.CSSProperties = {
  background: `linear-gradient(180deg, ${T.goldHi} 0%, ${T.gold} 45%, ${T.goldDeep} 100%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text',
  color: 'transparent', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,.45))',
};
export const textShadow = '0 2px 14px rgba(0,0,0,.6)';
