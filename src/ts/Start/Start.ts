import './start.scss';
import { ModuleKitType } from '../ModuleKit/ModuleKit.types';
import { Utils } from '../utils';

export class Start {

  constructor () {

    const moduleKit = document.createElement('module-kit') as ModuleKitType;
    moduleKit.dataset.test = 'test is 1';
    moduleKit.contents = {
      test: 'test text',
      styles: Utils.styles
    };
    document.body.append(moduleKit);

    setTimeout(()=>{
      moduleKit.dataset.test = 'test is 2';
    }, 3000);

  }

}