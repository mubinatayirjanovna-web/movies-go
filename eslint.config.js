import js from "@eslint/js";
import globals from "globals";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.browser,
		},
		plugins: {
			perfectionist,
			"unused-imports": unusedImports,
		},
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"perfectionist/sort-imports": [
				"error",
				{
					type: "natural",
					order: "asc",
					ignoreCase: true,
					internalPattern: ["^@/"],
				},
			],
			"perfectionist/sort-named-imports": ["error", { type: "natural", order: "asc" }],
			"perfectionist/sort-named-exports": ["error", { type: "natural", order: "asc" }],
			"perfectionist/sort-exports": ["error", { type: "natural", order: "asc" }],
		},
	},
]);
