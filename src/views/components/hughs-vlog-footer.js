"use strict";
import HughsVlogElement from '../../lib/hughs-vlog-element.js';

let HughsVlogFooter = class HughsVlogFooter extends HTMLElement {
  static get is() {
    return 'hughs-vlog-footer';
  }

  static get template() {
    return `
      <template id="${HughsVlogFooter.is}">
        <style>
          * {
            box-sizing: border-box;
          }

          :host {
            text-align: center;
            font-size: 0.95rem;
          }

          p a {
            color: inherit;
            transition: 0.125s color ease;
          }

          p:hover a {
            color: hsl(310, 100%, 70%);
          }

          p:hover {
            opacity: 1;
          }
        </style>
        <p>© 2016–<span id="current-year"></span> <a href="https://hughguiney.com/" rel="me" aria-label="Hugh Guyknee">Hugh Guiney</a></p>
      </template>
    `;
  }

  connectedCallback() {
    const $currentYear = this.shadowRoot.querySelector( '#current-year' );
    $currentYear.textContent = this.currentYear;
    this.setAttribute( 'role', 'contentinfo' );
  }

  get currentYear() {
    return new Date().getFullYear().toString();
  }
}

HughsVlogFooter = HughsVlogElement( HughsVlogFooter );

window.customElements.define( HughsVlogFooter.is, HughsVlogFooter );

export default HughsVlogFooter;
