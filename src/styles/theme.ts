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

export const mode = {
  light: 'light',
  dark: 'dark',
} as const

export type Mode = keyof typeof mode

export const themeCSS = css`
  :host {
    font-family: 'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }

  :host([mode='light']) {
    --radix-popover-background: color-mix(in srgb, #f4f5f9 20%, transparent);
    --radix-popover-background-hover: var(--color-radix-blue-1);
    --radix-popover-border-color: var(--color-radix-blue-2);
    --radix-popover-text-color: var(--color-grey-1);

    --radix-popover-tabs-background: color-mix(
      in srgb,
      var(--color-grey-2) 30%,
      transparent
    );
    --radix-popover-tabs-button-active-background: var(--color-light);

    --radix-card-background: var(--color-light);
    --radix-card-text-color: var(--color-grey-1);
    --radix-card-text-dimmed-color: var(--color-grey-2);
    --radix-card-link-color: var(--color-radix-blue-2);
    --radix-card-inverted-background: var(--color-grey-1);
    --radix-card-inverted-text-color: var(--color-light);

    --radix-avatar-border-color: var(--color-grey-5);

    --radix-button-background: var(--color-light);
    --radix-button-text-color: var(--color-radix-blue-2);

    color: var(--color-grey-1);
  }

  :host([mode='dark']) {
    --radix-popover-background: color-mix(in srgb, #f4f5f9 20%, transparent);
    --radix-popover-background-hover: var(--color-radix-blue-1);
    --radix-popover-border-color: var(--color-radix-blue-2);
    --radix-popover-text-color: var(--color-light);

    --radix-popover-tabs-background: color-mix(
      in srgb,
      var(--color-dark) 60%,
      transparent
    );
    --radix-popover-tabs-button-active-text-color: var(--color-light);
    --radix-popover-tabs-button-active-background: #515151;

    --radix-card-background: #515151;
    --radix-card-text-color: var(--color-light);
    --radix-card-text-dimmed-color: var(--color-grey-3);
    --radix-card-link-color: var(--color-white);
    --radix-card-inverted-background: var(--color-grey-5);
    --radix-card-inverted-text-color: var(--color-grey-1);

    --radix-avatar-border-color: #656565;

    --radix-button-background: color-mix(
      in srgb,
      var(--color-dark) 40%,
      transparent
    );
    --radix-button-text-color: var(--color-light);
    color: var(--color-light);
  }

  button {
    font-weight: 500;
    transition: background-color 0.1s cubic-bezier(0.45, 0, 0.55, 1);
    border-radius: 12px;
    border: none;
    background: var(--radix-button-background);
    color: var(--radix-button-text-color);
    font-size: 16px;
    font-weight: 600;
  }

  :host([theme='radix-blue']) {
    --radix-connect-button-background: var(--color-radix-blue-2);
    --radix-connect-button-background-hover: var(--color-radix-blue-1);
    --radix-connect-button-border-color: var(--color-radix-blue-2);
    --radix-connect-button-text-color: var(--color-light);
  }

  :host([theme='black']) {
    --radix-connect-button-background: var(--color-dark);
    --radix-connect-button-background-hover: #3e3e3e;
    --radix-connect-button-border-color: var(--color-dark);
    --radix-connect-button-text-color: var(--color-light);
  }

  :host([theme='white-with-outline']) {
    --radix-connect-button-background: var(--color-light);
    --radix-connect-button-background-hover: var(--color-grey-5);
    --radix-connect-button-border-color: var(--color-dark);
    --radix-connect-button-text-color: var(--color-dark);
  }

  :host([theme='white']) {
    --radix-connect-button-background: var(--color-light);
    --radix-connect-button-background-hover: var(--color-grey-5);
    --radix-connect-button-border-color: var(--color-light);
    --radix-connect-button-text-color: var(--color-dark);
  }
`
