import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:       '#0f65ef',
        'text-muted': '#606060',
        'text-ph':   '#969696',
        'input-bg':  '#f6f6f6',
        'input-border': '#dddddd',
        'badge-bg':  '#d0e1fd',
        'tag-bg':    '#e8f0fc',
        'card-bg':   '#f6f6f6',
        'btn-pass':  '#f8abab',
        'btn-like':  '#a3f096',
        'border-light': '#e4e4e4',
      },
      fontFamily: {
        display: ['"Charlie Display"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight96: '-0.96px',
        hero:    '-1.92px',
        heading: '-1.2px',
        body:    '-0.48px',
        sm:      '-0.42px',
        xs:      '-0.36px',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
}

export default config
