import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: ['index.html', 'admin/index.html', 'login/index.html', 'apply/index.html'],
    },
  },
});
