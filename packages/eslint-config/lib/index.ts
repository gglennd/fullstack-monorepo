import antfu from "@antfu/eslint-config";

type AntfuParams = Parameters<typeof antfu>;
type AntfuReturn = ReturnType<typeof antfu>;
type Options = AntfuParams[0];
type UserConfigs = AntfuParams[1][];

export default function createConfig(options: Options, ...userConfigs: UserConfigs): AntfuReturn {
  return antfu({
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: [
      "./**/*.md",
      "./**/*.mdx",
      "./**/*.gen.ts",
      "./**/*.css",
      "./**/*.svg",
      "./**/*.html",
      "./**/*.png",
      "./**/*.jpg",
      "./**/*.jpeg",
      "./**/*.gif",
      "./**/*.webp",
      "./**/*.ico",
      "./**/*.woff",
      "./**/*.woff2",
      "./**/*.ttf",
      "./**/*.eot",
      "./**/*.otf",
      "**/*.yaml",
    ],
    ...options,
  }, {
    rules: {
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["warn"],
      "perfectionist/sort-imports": ["error", {
        tsconfig: {
          rootDir: ".",
        },
      }],
      "unicorn/filename-case": ["error", {
        case: "kebabCase",
        ignore: [
          "README.md",
          "^\\.(md|mdx)$",
          "^\\$",
        ],
      }],
    },
  }, ...userConfigs);
}
