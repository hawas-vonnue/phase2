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
    preset: "ts-jest",
    testPathIgnorePatterns: [`<rootDir>/dist/`],
    moduleNameMapper: {
        // "(.+)\\.js": "$1",
        // "^(\\..*)\\.js$": "$1",
    },
};
