/**
 * Available transaction export options.
 * Values are used for API actions (ex: /transactions/csv/).
 *
 * Used in export and transactions page.
 */
export enum ExportFile {
  PAGE = 'page',
  PDF = 'pdf',
  XLSX = 'xlsx',
  CSV = 'csv',
}
