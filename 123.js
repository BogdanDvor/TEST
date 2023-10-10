// This extension highlights the word "price" in red.

// Import the necessary libraries.
import { chrome } from "chrome";
import { css } from "lit-element";
import { html } from "lit-html";

// Create a class for the extension.
class PriceHighlight extends HTMLElement {
  // The constructor function.
  constructor() {
    super();

    // Create a shadow DOM for the extension.
    this.attachShadow({ mode: "open" });

    // Add the CSS to the shadow DOM.
    this.shadowRoot.appendChild(document.createTextNode(css`
      .price {
        color: red;
      }
    `));

    // Add an event listener for the document load event.
    document.addEventListener("DOMContentLoaded", () => {
      // Get all of the elements on the page.
      const elements = document.querySelectorAll("*");

      // Loop through the elements and highlight the word "price".
      for (const element of elements) {
        if (element.textContent.toLowerCase().includes("price")) {
          element.classList.add("price");
        }
      }
    });
  }

  // The render function.
  render() {
    return html`
      <div>
        <h1>Price Highlight</h1>
        <p>This extension highlights the word "price" in red.</p>
      </div>
    `;
  }
}

// Register the extension with Chrome.
chrome.webNavigation.onCommitted.addListener((details) => {
  const frame = details.frame;
  const element = frame.contentWindow.document.createElement("price-highlight");
  frame.contentWindow.document.body.appendChild(element);
});

// Export the extension.
customElements.define("price-highlight", PriceHighlight);