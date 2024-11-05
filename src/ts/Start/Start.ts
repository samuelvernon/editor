import './start.scss';
import { Utils } from '../utils';
import { EditorType } from '../Editor/editor.types';

export class Start {

  constructor() {

    const sEditor = document.createElement('s-editor') as EditorType;
    // sEditor.dataset.test = 'test is 1';
    sEditor.contents = {
      test: 'test text',
      styles: Utils.styles
    };
    document.body.append(sEditor);

    // setTimeout(()=>{
    //   sEditor.dataset.test = 'test is 2';
    // }, 3000);

  }

}