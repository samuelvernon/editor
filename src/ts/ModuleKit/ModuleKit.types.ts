export interface ModuleKitContents {
  test: string;
  styles: string[];
}
export interface ModuleKitType extends HTMLElement {
  contents: ModuleKitContents;
}