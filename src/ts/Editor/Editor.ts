import Moveable, { OnScale } from 'moveable';
import './editor.scss';
import { EditorContents, EditorType } from './editor.types';

export class Editor extends HTMLElement implements EditorType {
  static observedAttributes = ["data-test"];

  private shadow: ShadowRoot;
  private template: HTMLElement;

  protected matrix;

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

    const target = document.createElement('div');
    target.classList.add('editor-target');

    this.template.append(target);
    this.shadow.append(this.template);

    const moveable = new Moveable(this.template, {
      target,
      // If the container is null, the position is fixed. (default: parentElement(document.body))
      // container: this.template,
      draggable: true,
      resizable: true,
      scalable: true,
      rotatable: true,
      warpable: true,
      // Enabling pinchable lets you use events that
      // can be used in draggable, resizable, scalable, and rotateable.
      pinchable: true, // ["resizable", "scalable", "rotatable"]
      origin: true,
      keepRatio: true,
      // Resize, Scale Events at edges.
      edge: false,
      throttleDrag: 0,
      throttleResize: 0,
      throttleScale: 0,
      throttleRotate: 0
    });

    /* draggable */
    moveable.on("dragStart", ({ target, clientX, clientY }) => {
      console.log("onDragStart", target);
    }).on("drag", ({
      target, transform,
      left, top, right, bottom,
      beforeDelta, beforeDist, delta, dist,
      clientX, clientY,
    }) => {
      console.log("onDrag left, top", left, top);
      target!.style.left = `${ left }px`;
      target!.style.top = `${ top }px`;
      this.template!.style.left = `${ left }px`;
      this.template!.style.top = `${ top }px`;
      // console.log("onDrag translate", dist);
      // target!.style.transform = transform;
    }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onDragEnd", target, isDrag);
    });

    /* resizable */
    moveable.on("resizeStart", ({ target, clientX, clientY }) => {
      console.log("onResizeStart", target);
    }).on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
      console.log("onResize", target);
      delta[0] && (target!.style.width = `${ width }px`) && (this.template!.style.width = `${ width }px`);
      delta[1] && (target!.style.height = `${ height }px`) && (this.template!.style.height = `${ height }px`);
    }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onResizeEnd", target, isDrag);
    });

    /* scalable */
    moveable.on("scaleStart", ({ target, clientX, clientY }) => {
      console.log("onScaleStart", target);
    }).on("scale", ({
      target, scale, dist, delta, transform, clientX, clientY,
    }: OnScale) => {
      console.log("onScale scale", scale);
      target!.style.transform = transform;
      this.template!.style.transform = transform;
    }).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onScaleEnd", target, isDrag);
    });

    /* rotatable */
    moveable.on("rotateStart", ({ target, clientX, clientY }) => {
      console.log("onRotateStart", target);
    }).on("rotate", ({ target, beforeDelta, delta, dist, transform, clientX, clientY }) => {
      console.log("onRotate", dist);
      // target!.style.transform = transform;
      this.template!.style.transform = transform;
    }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onRotateEnd", target, isDrag);
    });

    /* warpable */
    this.matrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
    moveable.on("warpStart", ({ target, clientX, clientY }) => {
      console.log("onWarpStart", target);
    }).on("warp", ({
      target,
      clientX,
      clientY,
      delta,
      dist,
      multiply,
      transform,
    }) => {
      console.log("onWarp", target);
      // target.style.transform = transform;
      this.matrix = multiply(this.matrix, delta);
      // target.style.transform = `matrix3d(${ this.matrix.join(",") })`;
      this.template.style.transform = `matrix3d(${ this.matrix.join(",") })`;
    }).on("warpEnd", ({ target, isDrag, clientX, clientY }) => {
      console.log("onWarpEnd", target, isDrag);
    });

    /* pinchable */
    // Enabling pinchable lets you use events that
    // can be used in draggable, resizable, scalable, and rotateable.
    moveable.on("pinchStart", ({ target, clientX, clientY }) => {
      // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
      console.log("onPinchStart");
    }).on("pinch", ({ target, clientX, clientY, datas }) => {
      // pinch event occur before drag, rotate, scale, resize
      console.log("onPinch");
    }).on("pinchEnd", ({ isDrag, target, clientX, clientY, datas }) => {
      // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
      console.log("onPinchEnd");
    });

    // this.shadow.append(this.template.cloneNode(true));


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