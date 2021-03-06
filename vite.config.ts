/// <reference types="vitest" />
import eslintPlugin from '@nabla/vite-plugin-eslint';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import macrosPlugin from 'vite-plugin-babel-macros';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
	define: {
		'process.env': process.env
	},
	envDir: process.cwd(),
	envPrefix: 'REACT_APP_PUBLIC',
	test: {
		include: ['src/**/__tests__/*'],
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests.ts',
		clearMocks: true,

		coverage: {
			enabled: true,
			'100': true,
			reporter: ['text', 'lcov'],
			reportsDirectory: 'coverage/jest',
		},
	},
	plugins: [
		tsconfigPaths(),
		react(),
		macrosPlugin(),
		viteCommonjs(),
		...(mode !== 'test'
			? [
				eslintPlugin(),
				VitePWA({
					registerType: 'autoUpdate',
					includeAssets: ['public/icons/*.*', 'robots.txt', 'fonts/*.woff2', 'assets/*.*'],
					manifest: {
						theme_color: '#BD34FE',
						icons: [
							{
								src: '/android-chrome-192x192.png',
								sizes: '192x192',
								type: 'image/png',
								purpose: 'any maskable',
							},
							{
								src: '/android-chrome-512x512.png',
								sizes: '512x512',
								type: 'image/png',
							},
						],
					},
				}),
			]
			: []),
	],
}));
