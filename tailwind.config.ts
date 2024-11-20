import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				grey: 'rgb(var(--grey-rgb))',
				white: 'rgb(var(--white-rgb))',
				active_color: 'rgb(var(--active_color-rgb))',
				blue_ui: 'rgb(var(--blue_ui-rgb))',
				dark_blue: 'rgb(var(--dark_blue-rgb))',
				dominion: 'rgb(var(--dominion-rgb))',
				popularity: 'rgb(var(--popularity-rgb))',
				richness: 'rgb(var(--richness-rgb))',
				attractiveness: 'rgb(var(--attractiveness-rgb))',
				bg_dominion: 'rgb(var(--bg_dominion-rgb))',
				bg_popularity: 'rgb(var(--bg_popularity-rgb))',
				bg_richness: 'rgb(var(--bg_richness-rgb))',
				bg_attractiveness: 'rgb(var(--bg_attractiveness-rgb))',
				bg_opacity_1: 'rgba(var(--white-rgb), 0.1)',
				bg_opacity_2: 'rgba(var(--grey-rgb), 0.3)',
				default_bg: 'rgba(var(--white-rgb), 0.15)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				glow: 'glow 1.5s infinite ease-in-out',
			},
			boxShadow: {
				glow: '0 0 10px 1px rgba(255, 255, 255, 0.7)',
			},
		},
	},
	plugins: [
    require('tailwindcss-animate'),
    // Добавьте сюда кастомное правило для container-style
    function ({ addComponents }) {
      addComponents({
        '.container-style': {
          '@apply rounded-xl bg-gradient-to-r from-[rgba(58,49,79,0.8)] to-[rgba(46,38,69,0.8)] bg-background/40': '',
        },
      });
    },
  ],
};

export default config;
