import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'TokenTint — Color Picker Chrome Extension for Design Tokens';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont(weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`;
  const css = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  }).then((r) => r.text());
  const match = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error('font url not found');
  const fontData = await fetch(match[1]).then((r) => r.arrayBuffer());
  return fontData;
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadFont(500), loadFont(700)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: 'linear-gradient(135deg, #10131A 0%, #1a1d3a 100%)',
          color: '#ffffff',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: '#635BFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>
            TokenTint
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 960,
            }}
          >
            Color Picker Chrome Extension
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              color: '#22D3C5',
              letterSpacing: -0.5,
            }}
          >
            for Design Tokens
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#635BFF' }} />
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#22D3C5' }} />
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#FF6B9D' }} />
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F5A524' }} />
          </div>
          <div style={{ fontSize: 24, color: '#a8adb7', marginLeft: 12 }}>
            CSS Variables · Tailwind Config · W3C Design Tokens
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: regular, weight: 500, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
