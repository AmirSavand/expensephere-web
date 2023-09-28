import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InvoiceService } from '@app/dash/invoice/invoice.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Contact } from '@shared/interfaces/contact';
import { Currency } from '@shared/interfaces/currency';
import { Invoice } from '@shared/interfaces/invoice';
import { InvoiceItem } from '@shared/interfaces/invoice-item';
import { InvoiceTemplate } from '@shared/interfaces/invoice-template';
import { Profile } from '@shared/interfaces/profile';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { ContactFormModalComponent } from '@shared/modules/contact-form-modal';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
import { Payload } from '@shared/types/payload';
import { format } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  readonly faBreadcrumbArrow: IconDefinition = faChevronRight;
  readonly faDelete: IconDefinition = faTrash;
  readonly faAdd: IconDefinition = faPlus;

  /**
   * List of available templates for selection.
   * We map the structure for support for our selection.
   */
  readonly templates: SelectItem[] = this.invoiceService.templates.map((template: InvoiceTemplate): SelectItem => ({
    id: template.name.toLowerCase().replace(/ /g, '-'),
    name: template.name,
    icon: 'box',
    color: '#333333',
  }));

  /**
   * UI only configuration. We use this show
   * and hide options from the main forms and
   * it should be excluded from API as well.
   */
  readonly options = this.formBuilder.group({
    discount: [],
    tax: [],
    is_paid: [true],
    date: [true],
    due_date: [true],
    note: [true],
    items_label: [],
  });

  /**
   * Main invoice form for creation and update.
   */
  readonly form: ReactiveFormData<Invoice> = {
    error: {},
    form: this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      template: [this.templates[0].id, Validators.required],
      invoice_id: [null, Validators.required],
      client: [null, Validators.required],
      company: [null, Validators.required],
      is_published: [false],
      is_paid: [false],
      currency: [],
      date: [format(new Date(), Utils.HTML_DATE_FORMAT)],
      due_date: [],
      items_label: [],
      note: [],
      discount_flat: [true],
      discount: [null],
      tax: [],
    }),
  };

  // Form for every invoice item for their creation and update.
  readonly itemForms: ReactiveFormData<InvoiceItem>[] = [];

  // List of currencies for select input.
  currencies: SelectItem[];

  // List of contacts for select input.
  contacts: SelectItem[];

  // Flag for when editing invoice is not found.
  notFound: boolean;

  // Invoice currency for UI purposes.
  currency: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private router: Router) {
  }

  /** Redirect to edit page of this invoice. */
  private redirectToEdit(): void {
    this.router.navigate(['/dash', 'invoice', this.form.id]);
  }

  ngOnInit(): void {
    /**
     * We need to set the "currency" field default value to current
     * profile currency. Which makes sense.
     */
    ProfileService.profile.subscribe((data: Profile): void => {
      this.form.form.patchValue({ currency: data.currency });
    });
    /**
     * If editing an invoice, let's load and fill the form from API.
     */
    this.route.params.subscribe((params: Params): void => {
      if (params.id) {
        this.form.id = params.id;
        /**
         * We're in edit route so let's load the invoice from API.
         */
        Api.invoice.retrieve(this.form.id).subscribe((data: Invoice): void => {
          /**
           * Loop through options and toggle them based on invoice
           * keys and values (if an invoice item is set, enable its option).
           */
          for (const key of Object.keys(this.options.controls)) {
            this.options.get(key).setValue(data[key as keyof Invoice] !== null);
          }
          Utils.patchForm(this.form, data);
          this.form.data = data;
          /**
           * Now that we've loaded the invoice, let's load all the invoice
           * items as well. Create a for each of them.
           */
          Api.invoiceItem.list({ invoice: data.id }).subscribe((items: ApiResponse<InvoiceItem>): void => {
            items.results.forEach((item: InvoiceItem): void => {
              this.addItemForm(item);
            });
          });
        }, (): void => {
          this.notFound = true;
        });
      }
    });
    /**
     * Get list of currencies.
     */
    Api.currency.list().subscribe((data: Currency[]): void => {
      this.currencies = [];
      for (const currency of data) {
        this.currencies.push({
          color: Color.COLORS_RESERVED.default,
          icon: 'money',
          id: currency.code,
          name: `${currency.code}`,
        });
      }
    });
    /** Get list of contacts. */
    Api.invoiceContact.list().subscribe({
      next: (data: ApiResponse<Contact>): void => {
        this.contacts = data.results.map((item: Contact): SelectItem => ({
          id: item.id,
          name: item.name,
          icon: 'people',
          color: Color.COLORS_RESERVED.default,
        }));
      },
    });
    /**
     * Store currency and watch for changes.
     */
    this.form.form.get('currency').valueChanges.subscribe((value: string): void => {
      this.currency = value;
    });
  }

  /**
   * Add a new invoice item form to the list.
   */
  addItemForm(data?: InvoiceItem): void {
    // We need to set these default ones to access amount property even for new forms.
    data = data || { id: null, amount: null, description: null, order: null, price: null, quantity: null };
    // Create the form object.
    const form: ReactiveFormData<InvoiceItem> = {
      id: data?.id,
      error: {},
      data,
      form: this.formBuilder.group({
        description: [null, Validators.required],
        price: [null, Validators.required],
        quantity: [null],
      }),
    };
    /**
     * Watch changes to invoice item to recalculate the amount.
     */
    form.form.valueChanges.subscribe((): void => {
      const price = form.form.value.price || 0;
      const quantity = form.form.value.quantity || 0;
      form.data.amount = price * quantity;
    });
    Utils.patchForm(form, data);
    this.itemForms.push(form);
  }

  /**
   * Delete the editing invoice and redirect to list view.
   */
  remove(): void {
    if (confirm('Are you sure you want to delete this?')) {
      Api.invoice.delete(this.form.id).subscribe((): void => {
        this.router.navigate(['../list'], { relativeTo: this.route });
      });
    }
  }

  /**
   * Delete an invoice item (do API call if it's already created).
   */
  removeItem(item: ReactiveFormData): void {
    if (item.id) {
      if (confirm('Are you sure you want to delete this item?')) {
        Api.invoiceItem.delete(item.id).subscribe();
      } else {
        return;
      }
    }
    Utils.removeChild(this.itemForms, item);
  }

  /**
   * Submit the invoice form and all the item forms.
   */
  submit(): void {
    if (!Utils.validateForms([this.form, ...this.itemForms])) {
      return;
    }
    this.form.loading = true;
    const payload: Payload<Invoice> = this.form.form.value;
    /**
     * For every option that is toggled off, set the option
     * invoice property to null.
     */
    for (const key of Object.keys(this.options.controls)) {
      if (!this.options.value[key]) {
        // @ts-ignore
        payload[key] = null;
      }
    }
    /** Validate discount. */
    if (!payload.discount_flat && payload.discount > 100) {
      this.form.error = {
        discount: ['Discount percentage can not be more than 100.'],
        detail: 'Invoice discount is invalid.',
      };
      this.form.errorStatus = 400;
      this.form.loading = false;
      return;
    }
    /**
     * Submit the invoice form and all the invoice item forms.
     */
    Utils.getFormSubmission(Api.invoice, this.form).subscribe((data: Invoice): void => {
      const isCreate = !Boolean(this.form.id);
      this.form.loading = false;
      this.form.error = {};
      this.form.id = data.id;
      this.form.data = data;
      Utils.patchForm(this.form, data);
      /** If we're creating and there are no invoice items, let's redirect. */
      if (isCreate && !this.itemForms.length) {
        this.redirectToEdit();
      }
      /**
       * Loop through invoice items and submit them as well.
       */
      else {
        this.itemForms.forEach((itemForm: ReactiveFormData<InvoiceItem>, index: number): void => {
          Utils.getFormSubmission(
            Api.invoiceItem,
            itemForm,
            Object.assign(itemForm.form.value, { invoice: data.id, order: index }),
          ).subscribe((itemData: InvoiceItem): void => {
            itemForm.error = {};
            itemForm.id = itemData.id;
            itemForm.data = itemData;
            itemForm.success = true;
            Utils.patchForm(itemForm, itemData);
            /**
             * If we're creating this invoice and there are no invoice items that failed
             * let's redirect user to edit page (change param ID).
             */
            if (isCreate && !this.itemForms.some((item: ReactiveFormData<InvoiceItem>): boolean => !item.success)) {
              this.redirectToEdit();
            }
          }, (error: HttpErrorResponse): void => {
            Utils.handleError(itemForm, error);
          });
        });
      }
    }, (error: HttpErrorResponse): void => {
      Utils.handleError(this.form, error);
    });
  }

  /** Add a client or company from the dropdowns. */
  addContact(field: 'client' | 'company'): void {
    const modal: BsModalRef<ContactFormModalComponent> = this.modalService.show(ContactFormModalComponent, {
      initialState: { redirect: false },
    });
    modal.content.submitted.subscribe({
      next: (data: Contact): void => {
        this.contacts.push(data);
        this.form.form.get(field).patchValue(data.id);
      },
    });
  }
}
