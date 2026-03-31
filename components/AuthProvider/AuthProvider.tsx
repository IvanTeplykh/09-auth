"use client";

import { useAuthStore } from "../../lib/store/authStore";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout, getMe } from "../../lib/api/clientApi";

const privateRoutes = ["/profile", "/notes"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const verifySession = async () => {
      try {
        let session = await checkSession();
        
        // If session exists but no user info, try getMe() as a fallback
        if (session && !session.user && !session.email && !session.username) {
          try {
            const user = await getMe();
            if (user) session = user;
          } catch (e) {
            console.error("Session check succeeded but getMe failed:", e);
          }
        }

        if (session && (session.user || session.email || session.username)) {
          setUser(session.user || session);
        } else {
          handleAuthFailure();
        }
      } catch (error) {
        handleAuthFailure();
      } finally {
        setIsLoading(false);
      }
    };

    const handleAuthFailure = async () => {
      if (isPrivateRoute) {
        await logout();
        clearIsAuthenticated();
        router.push("/sign-in");
      }
    };

    verifySession();
  }, [pathname, isPrivateRoute, setUser, clearIsAuthenticated, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <p style={{ fontSize: "1.2rem", color: "#6c757d" }}>
          Loading session...
        </p>
      </div>
    );
  }

  // Prevent rendering private content if not authenticated
  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
