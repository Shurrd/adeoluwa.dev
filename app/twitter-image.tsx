import { ImageResponse } from 'next/og';

export const alt = 'Abraham Adeoluwa Adeyemi | Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0a0a',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 28, color: '#949495', marginBottom: 24 }}>
          adeoluwa.dev
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Abraham Adeoluwa Adeyemi
        </div>
        <div style={{ fontSize: 36, color: '#b4b4b8', marginTop: 28 }}>
          Software Engineer · Lagos, Nigeria
        </div>
        <div style={{ fontSize: 28, color: '#949495', marginTop: 20 }}>
          Web, mobile, backend and cloud infrastructure
        </div>
      </div>
    ),
    size,
  );
}
