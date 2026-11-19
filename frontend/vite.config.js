import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      input: ['index.html', 'admin/index.html', 'login/index.html', 'apply/index.html'],
    },
  },
});
