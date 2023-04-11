import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

/**
 * @see https://blog.abrocadabro.com/set-up-a-turborepo-monorepo-with-vite-typescript-tailwind-express-and-react-vue
 */
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/main.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {},
    }),
  ],
});
