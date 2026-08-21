import { NextRequest, NextResponse } from 'next/server';

const LOCALE_HEADER = 'x-tokentint-locale';

function prefersChinese(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const languages = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [language, ...parameters] = entry.trim().toLowerCase().split(';');
      const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
      return { language, quality: quality ? Number(quality.trim().slice(2)) : 1, index };
    })
    .filter(({ quality }) => quality > 0)
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  const preferredLanguage = languages[0]?.language ?? '';
  return preferredLanguage === 'zh' || preferredLanguage.startsWith('zh-');
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isChinesePath = pathname === '/zh-CN' || pathname.startsWith('/zh-CN/');
  const isRootPath = pathname === '/';
  const savedLocale = request.cookies.get('tokentint-locale')?.value;

  if (isRootPath) {
    const locale = savedLocale === 'zh-CN' || (savedLocale !== 'en' && prefersChinese(request)) ? 'zh-CN' : 'en';
    if (locale === 'zh-CN') {
      const url = request.nextUrl.clone();
      url.pathname = '/zh-CN';
      return NextResponse.redirect(url);
    }
  }

  const requestHeaders = new Headers(request.headers);
  const locale = isChinesePath ? 'zh-CN' : 'en';

  requestHeaders.set(LOCALE_HEADER, locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
