import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/**.config.js"]), {
    extends: [
        ...nextCoreWebVitals,
        ...compat.extends("plugin:@typescript-eslint/recommended"),
        ...compat.extends("plugin:tailwindcss/recommended"),
        ...compat.extends("plugin:jsx-a11y/recommended"),
        ...compat.extends("plugin:sonarjs/recommended"),
        ...compat.extends("prettier")
    ],

    plugins: {
        tailwindcss,
    },

    settings: {
        "jsx-a11y": {
            components: {
                Link: "a",
            },
        },
    },
}]);