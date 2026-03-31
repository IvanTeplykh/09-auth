"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useAuthStore } from "../../lib/store/authStore";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  return (
    <ul className={css.navigation}>
      {isAuthenticated && (
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
      )}

      {isAuthenticated && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>User email</p>
          <button onClick={clearIsAuthenticated} className={css.logoutButton}>
            Logout
          </button>
        </li>
      )}
      {!isAuthenticated && (
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>
      )}

      {!isAuthenticated && (
        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      )}
    </ul>
  );
}
