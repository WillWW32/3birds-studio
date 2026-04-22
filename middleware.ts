import { NextResponse, type NextRequest } from 'next/server';

/**
 * Subdomain routing for 3birdsstudio.com
 *
 * Keeps the apex (3birdsstudio.com) on Bluehost / Cloudflare untouched while
 * each campaign page lives on its own Vercel subdomain. Only the root path
 * of each subdomain is rewritten; deep links like honda.3birdsstudio.com/win
 * still resolve so people can share cross-campaign URLs if they want.
 *
 * DNS setup (one CNAME per subdomain, pointing at Vercel):
 *   golden  CNAME  cname.vercel-dns.com
 *   win     CNAME  cname.vercel-dns.com
 *   gift    CNAME  cname.vercel-dns.com
 *   honda   CNAME  cname.vercel-dns.com
 *   lithia  CNAME  cname.vercel-dns.com
 *   home    CNAME  cname.vercel-dns.com
 *
 * Vercel project Domains tab: add each full subdomain as a custom domain.
 * SSL auto-provisions in ~5 minutes.
 *
 * Also: HTTP Basic Auth on /admin/* paths for the voucher-image upload UI.
 * Credentials are read from ADMIN_USERNAME / ADMIN_PASSWORD env vars. If
 * either is missing, /admin returns 503 so an un-configured deploy can't
 * be used to upload anything.
 */

const SUBDOMAIN_ROUTES: Record<string, string> = {
  golden: '/golden-age', // Golden Age Couples portrait campaign
  win:    '/win',        // Mother's Day sweepstakes giveaway
  honda:  '/honda',      // Denny Menholt University Honda gift certificate
  lithia: '/lithia',     // Lithia Toyota of Missoula gift certificate
  gift:   '/gift',       // Generic gift certificate picker fallback
  home:   '/',           // Canonical home page on Vercel
};

const ROOT_DOMAIN = '3birdsstudio.com';

function requireBasicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse(
      'Admin is not configured. Set ADMIN_USERNAME + ADMIN_PASSWORD in Vercel env vars.',
      { status: 503 },
    );
  }

  const header = request.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(':');
    if (idx !== -1) {
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === user && p === pass) return null; // allow
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="3 Birds Admin"' },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Gate /admin pages and their underlying API routes with Basic Auth.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const deny = requireBasicAuth(request);
    if (deny) return deny;
    return NextResponse.next();
  }

  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0]; // strip port if present (e.g. localhost:3000)

  // Only act on subdomains of 3birdsstudio.com.
  // localhost / vercel preview domains pass through unchanged.
  if (!hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return NextResponse.next();
  }

  const subdomain = hostname.slice(0, -`.${ROOT_DOMAIN}`.length);

  // www counts as the apex; no rewrite.
  if (subdomain === 'www') {
    return NextResponse.next();
  }

  const target = SUBDOMAIN_ROUTES[subdomain];
  if (!target) {
    return NextResponse.next();
  }

  // Root path of the subdomain gets rewritten to the target route.
  // All other paths pass through so deep links keep working.
  if (request.nextUrl.pathname === '/') {
    const rewrittenUrl = new URL(target, request.url);
    return NextResponse.rewrite(rewrittenUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match everything except Next.js internals and static assets.
  // /admin + /api/admin ARE matched so we can enforce Basic Auth.
  matcher: [
    '/((?!_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|images).*)',
  ],
};
