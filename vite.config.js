import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Also read the NEXT_PUBLIC_ names that Vercel's Supabase connection creates
export default defineConfig({ plugins: [react()], envPrefix: ['VITE_', 'NEXT_PUBLIC_'] });
