# Invoice Templates

Invoices can have template. In here, you can create invoice templates.

## Development

### Rules

- Template must have a simple, understandable, 1 word name.
- Template component name must start with `Template`.
- Template must handle cases where invoice values are `null`.
- Template must be fully mobile friendly.
- Template must show the owner if the invoice is private.
- After creating a template, it must be added in `InvoiceService.templates`.

### Notes

- Here are the rules, for sample on creating templates, look at the "soft" template.
- Note that template component is rendered only when invoice is loaded.
- Loading and error is handled in parent component.
