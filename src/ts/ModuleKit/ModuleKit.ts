import './module-kit.scss';
import { ModuleKitContents, ModuleKitType } from './ModuleKit.types';

export class ModuleKit extends HTMLElement implements ModuleKitType {
  static observedAttributes = ["data-test"];

  private shadow: ShadowRoot;
  private template: HTMLElement;

  contents: ModuleKitContents;

  constructor() {
    super();
  }

  connectedCallback() {

    this.shadow = this.attachShadow({
      mode: 'closed',
      delegatesFocus: true
    });

    this.contents?.styles && this.contents.styles.forEach((s) => {
      const style = document.createElement('link');

      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', s);
      this.shadow.appendChild(style);
    });

    this.template = document.createElement('div');
    this.template.setAttribute('style', `width: 20px; height: 20px;`);
    this.shadow.appendChild(this.template.cloneNode(true));
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== null && oldValue !== undefined) {
      console.log(`Attribute ${ name } has changed. The old value was ${ oldValue }. The new value is ${ newValue }`);
    }
  }

}