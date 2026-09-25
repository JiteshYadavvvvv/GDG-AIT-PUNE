import type { Metadata } from "next";
import nextPackage from "next/package.json";

import { EnvironmentCheck } from "./_environment-check/environment-check";

// Temporary Stage 0 page. Delete `_environment-check/` and replace this file
// with the real homepage in Stage 1.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Home() {
  return <EnvironmentCheck nextVersion={nextPackage.version} />;
}
