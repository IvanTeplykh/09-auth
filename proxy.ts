import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isAuthorized = !!(accessToken || refreshToken);

  const privateRoutes = ["/profile", "/notes"];
  const publicOnlyRoutes = ["/sign-in", "/sign-up"];

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !isAuthorized) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicOnlyRoute && isAuthorized) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

/**
 * For some environments, "proxy" needs to be named specifically.
 * We also provide a default export as middleware often uses it.
 */
export default proxy;

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
