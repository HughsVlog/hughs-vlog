"use strict";
import HughsVlogElement from '/lib/hughs-vlog-element.js';

class HughsVlogSubscribe extends HTMLElement {
  static get is() {
    return 'hughs-vlog-subscribe';
  }

  static get template() {
    return `
      <template id="${HughsVlogSubscribe.is}">
        <style>
          /*@namespace "http://www.w3.org/1999/xhtml";*/
          @namespace fb "http://www.facebook.com/2008/fbml";

          * {
            box-sizing: border-box;
          }

          :host {
            display: block;
            background: #eee;
            padding: 1rem;
            margin: 1rem auto;
          }

          .h {
            margin-top: 0;
          }

          dl {
            height: 56px;
          }

          dd {
            margin-left: 0;
          }

          dt:first-of-type + dd::after {
            content: '';
            opacity: 0.25;
            display: inline-block;
            border-right: 1px solid black;
            margin-right: 1rem;
            padding-right: 1rem;
            width: 0;
            height: 100%;
          }

          dt {
            /* @todo: sr-only */
            display: none;
          }

          .subscribe-button-container {
            display: inline-block;
            vertical-align: middle;
            height: 100%;
          }

          .subscribe-button-container.subscribe-button-container--fb {
            width: 198px;
          }

          /*.subscribe-button-container.subscribe-button-container--yt {
            height: 48px;
          }*/

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            clip-path: inset(50%);
            border: 0;
          }

          /*fb\:like {
            @apply --fb-like;
          }*/

          /*fb|like {
            @apply --fb-like;
          }*/
        </style>
        <h2 class="h h--2">Subscribe</h2>
        <dl>
          <dt class="sr-only">YouTube</dt>
          <dd class="subscribe-button-container subscribe-button-container--yt">
            <div id="yt-button-container-render">
              <div class="g-ytsubscribe"></div>
            </div>
          </dd>
          <dt class="sr-only">Facebook</dt>
          <dd class="subscribe-button-container subscribe-button-container--fb">
            <div id="fb-button-container-render">
              <!-- layout="button_count" -->
              <fb:like
                href="https://www.facebook.com/HughsVlog/"
                action="like"
                width="116"
                size="small"
                show-faces="true"
                share="false"></fb:like>
            </div>
          </dd>
          <!-- <dt>hugh.today</dt> -->
          <!-- <dd></dd> -->
        </dl>
      </template>
    `;
  }

  connectedCallback() {
    this.setAttribute( 'role', 'complementary' );

    this.youtubeChannelID = 'UCGPCcxdykgp6hgvL0XE3yaA';

    this.render();
  }

  renderFbLikeButton() {
    FB.XFBML.parse( ( this.shadowRoot || document ).getElementById( 'fb-button-container-render' ) );
  }

  // https://developers.google.com/youtube/subscribe/reference
  renderYtSubscribeButton( channelID ) {
    channelID = channelID || this.youtubeChannelID;

    var container = this.shadowRoot.getElementById( 'yt-button-container-render' );
    var options = {
      "channelId": channelID,
      // "layout": "default"
      "layout": "full"
    };
    gapi.ytsubscribe.render( container, options );
  }

  render() {
    this.renderYtSubscribeButton();
    // this.renderFbLikeButton();
  }
}

HughsVlogSubscribe = HughsVlogElement( HughsVlogSubscribe );

window.customElements.define( HughsVlogSubscribe.is, HughsVlogSubscribe );