// @ts-check

/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config = {
  schema: "http://localhost:4000/",
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/services/graphql/types.ts": {
      plugins: ["typescript"],
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
};

module.exports = config;
