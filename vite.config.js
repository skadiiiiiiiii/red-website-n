import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'./',plugins:[react()],build:{target:'edge90',cssTarget:'chrome90',assetsInlineLimit:0}});
