export interface InvoiceTemplate {
  // Name of template must be simple and preferably 1 word.
  name: string;
  // Version of template must be simple. Examples 1.0, 1.2, 2.3.
  version: string;
  // Authors of a template. Anyone who contributes. Example ["Amir Savand"].
  authors: string[];
}
