export interface EditorContents {
  test: string;
  styles: string[];
}
export interface EditorType extends HTMLElement {
  contents: EditorContents;
}