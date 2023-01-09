import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:1337/graphql',
  documents: ['./**/*.tsx', './**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './codegen/strapi/': {
      preset: 'client',
      // plugins: ['typescript', 'typescript-resolvers'],
      plugins: [],
    },
  },
};
export default config;
