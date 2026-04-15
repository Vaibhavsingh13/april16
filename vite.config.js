import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set base to your repo name (used only in production builds).
  // Update '/april16/' to match your GitHub repository name.
  // Leave as '/' if you are deploying to a custom domain or the root of GH Pages.
  base: process.env.NODE_ENV === 'production' ? '/april16/' : '/',
})
