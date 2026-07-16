/* Set NEXT_PUBLIC_SITE_URL to the production domain at deploy time. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
