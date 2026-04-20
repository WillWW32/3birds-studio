import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// ── Metadata Next.js reads to populate <meta og:image:*> tags ──
export const alt = 'Win a $3,000 Portrait Session at 3 Birds Studio · Entries close May 10';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Open Graph image for /win (and /enter-to-win which re-exports the page).
 * Generated at build time by Next.js. Renders the same JSX you'd see in a
 * normal React component, but `ImageResponse` returns a PNG instead of HTML.
 *
 * Design: full-bleed photo background with navy overlay. Mother's Day
 * eyebrow, large gold "$3,000" hero, runner-up subline, deadline ribbon.
 */
export default async function OG() {
  // Inline the hero photo as a base64 data URL so the image loads even
  // when the build runner can't reach the public origin.
  let bgDataUrl = '';
  try {
    const buf = await readFile(join(process.cwd(), 'public/images/family-portraits.jpg'));
    bgDataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    // No photo available — gradient fallback only.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#0d1b2a', // navy fallback
        }}
      >
        {/* Background photo */}
        {bgDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={bgDataUrl}
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        {/* Navy gradient overlay for legibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(135deg, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.72) 55%, rgba(13,27,42,0.55) 100%)',
            display: 'flex',
          }}
        />

        {/* Top eyebrow + deadline ribbon */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '48px 64px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#f5c64f', // gold
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Mother&apos;s Day Contest
          </div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Closes May 10
          </div>
        </div>

        {/* Hero block */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: 'white',
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.0,
              marginBottom: 8,
            }}
          >
            Win a
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 22,
              marginBottom: 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#f5c64f', // gold
                fontSize: 168,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              $3,000
            </div>
            <div
              style={{
                display: 'flex',
                color: 'white',
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1.0,
              }}
            >
              Portrait Session
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 26,
              fontWeight: 500,
              maxWidth: 880,
              lineHeight: 1.3,
            }}
          >
            Plus 10 runner-up prizes — $1,500 each. Free portrait session, professional editing, 14&quot; fine art print.
          </div>
        </div>

        {/* Bottom brand bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 64px 48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', fontSize: 32, fontWeight: 700 }}>
              3 Birds Studio
            </div>
            <div
              style={{
                display: 'flex',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 18,
                marginTop: 4,
              }}
            >
              Fine art portraits · Missoula, Montana
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '18px 36px',
              borderRadius: 999,
              background: '#f5c64f',
              color: '#0d1b2a',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            Enter to Win →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
