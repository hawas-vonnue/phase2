import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
// export const testEnvironment = "node";
// export const transform = {
//     ...tsJestTransformCfg,
// };
// export const  testPathIgnorePatterns: [`<rootDir>/dist/`]
export default {
    testEnvironment: "node",
    // preset: "ts-jest",
    preset: "ts-jest/presets/default-esm",
    // setupFiles: ["dotenv/config?path=./.env"],
    // setupFiles: ["<rootDir>/jest-setup.js"],
    transform: {
        ...tsJestTransformCfg, // Applies ESM transformations to TS files
    },

    testPathIgnorePatterns: [`<rootDir>/dist/`],
    moduleNameMapper: {
        // "(.+)\\.js": "$1",
        "^(\\..*)\\.js$": "$1",
    },

    // extensionsToTreatAsEsm: [".ts"],
};
