import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Animation architecture guard-rails (see README → Animation ownership).
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/animations/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "gsap",
              message: "Import from '@/lib/animations/gsap' so plugins are registered once.",
            },
            {
              name: "@gsap/react",
              message: "Import useGSAP from '@/lib/animations/gsap'.",
            },
            {
              name: "framer-motion",
              message: "Use 'motion/react' (Framer Motion's current package).",
            },
            {
              name: "motion/react",
              importNames: ["motion"],
              message: "Use `m` — LazyMotion runs in strict mode and throws on `motion.*`.",
            },
          ],
          patterns: [
            {
              group: ["gsap/*"],
              message: "Import GSAP plugins via '@/lib/animations/gsap'.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
