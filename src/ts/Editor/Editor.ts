import './editor.scss';
import { EditorContents, EditorType } from './editor.types';

export class Editor extends HTMLElement implements EditorType {
  static observedAttributes = ["data-test"];

  private shadow: ShadowRoot;
  private template: HTMLElement;

  contents: EditorContents;

  constructor() {
    super();

    fetch('configs/editor.json').then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error("Unable to fetch data:", error)
    });

  }

  connectedCallback() {

    this.shadow = this.attachShadow({
      mode: 'closed',
      delegatesFocus: true
    });

    this.setStyles();

    this.template = document.createElement('div');
    this.template.classList.add('editor');
    this.shadow.appendChild(this.template.cloneNode(true));
  };

  disconnectedCallback() {
    console.log("Editor closed");
  };

  // adoptedCallback() {
  //   console.log("Custom element moved to new page.");
  // };

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== null && oldValue !== undefined) {
      console.log(`Attribute ${ name } has changed. The old value was ${ oldValue }. The new value is ${ newValue }`);
    }
  };

  private setStyles = () => {
    this.contents?.styles && this.contents.styles.forEach((s) => {
      const style = document.createElement('link');

      style.setAttribute('rel', 'stylesheet');
      style.setAttribute('href', s);
      this.shadow.appendChild(style);
    });
  };

}