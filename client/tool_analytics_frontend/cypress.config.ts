import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    video: false,
    screenshotOnRunFailure: false,
    supportFile: 'cypress/support/e2e.ts',
  },
});
