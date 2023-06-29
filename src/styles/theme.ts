import { css } from 'lit'
import './variables.css'
import './fonts.css'

export const theme = {
  'radix-blue': 'radix-blue',
  black: 'black',
  'white-with-outline': 'white-with-outline',
  white: 'white',
} as const

export type Theme = keyof typeof theme

export const themeCSS = css`
  :host {
    font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  :host([theme='radix-blue']) {
    --theme-background: var(--color-radix-blue-2);
    --theme-background-hover: var(--color-radix-blue-1);
    --theme-border-color: var(--color-radix-blue-2);
    --theme-text-color: var(--color-light);
  }

  :host([theme='black']) {
    --theme-background: var(--color-dark);
    --theme-background-hover: #3e3e3e;
    --theme-border-color: var(--color-dark);
    --theme-text-color: var(--color-light);
  }

  :host([theme='white-with-outline']) {
    --theme-background: var(--color-light);
    --theme-background-hover: var(--color-grey-5);
    --theme-border-color: var(--color-dark);
    --theme-text-color: var(--color-dark);
  }

  :host([theme='white']) {
    --theme-background: var(--color-light);
    --theme-background-hover: var(--color-grey-5);
    --theme-border-color: var(--color-light);
    --theme-text-color: var(--color-dark);
  }
`
