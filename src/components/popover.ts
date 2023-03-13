import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { color } from '../styles'

@customElement('radix-popover')
export class Popover extends LitElement {
  render() {
    return html`<div class="wrapper">
      <div id="arrow"></div>
      <slot></slot>
    </div>`
  }

  static styles = css`
    :host {
      width: 18rem;
      border-radius: 12px;
      position: absolute;
      background: ${color.radixGrey5};
      box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      border: 1px solid ${color.radixGrey4};
      padding: 1.13rem 1.13rem 0 1.13rem;
      z-index: 9999;
    }

    #arrow,
    #arrow::before {
      position: absolute;
      width: 8px;
      height: 8px;
      top: -0.21rem;
      right: 2rem;
      background: ${color.radixGrey5};
      border: 1px solid ${color.radixGrey4};
      border-bottom-width: 0;
      border-right-width: 0;
    }

    #arrow {
      visibility: hidden;
    }

    #arrow::before {
      visibility: visible;
      content: '';
      transform: rotate(45deg);
    }

    .wrapper {
      display: flex;
      flex-direction: column;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-popover': Popover
  }
}
