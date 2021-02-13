import { DatePipe } from '@angular/common';
import { Color } from '@shared/classes/color';
import { icons } from '@shared/constants/icons';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class Utils {

  /**
   * API datetime format for HTML native datetime-local.
   */
  static readonly HTML_DATETIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm';

  /**
   * API datetime format for filtering.
   */
  static readonly API_DATE_FORMAT = 'yyyy-MM-dd';
  static readonly API_DATE_FORMAT_MOMENT = 'yyyy-MM-DD';

  /**
   * List of all expense kinds with their label.
   */
  static readonly EXPENSE_KIND_LABEL: Record<ExpenseKind, string> = {
    [ExpenseKind.INCOME]: 'Income',
    [ExpenseKind.EXPENSE]: 'Expense',
    [ExpenseKind.TRANSFER]: 'Transfer',
  };

  /**
   * @returns A random item from the given list
   */
  static getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * @returns List of icons as {@see SelectItem} list for {@see SelectModule}
   */
  static getSelectItemFromIcons(): SelectItem[] {
    const output: SelectItem[] = [];
    for (const icon of icons) {
      output.push({
        id: icon,
        color: Color.COLORS_RESERVED.default,
        icon,
        name: icon.toUpperCase().replace(/-/g, ' '),
      });
    }
    return output;
  }

  /**
   * Takes the required data to make a table to convert to
   * a PDF file using pdfmake and then downloads it for the
   * client.
   *
   * Since it's being used in more than 1 places, we've kept
   * it in {@see Utils}.
   *
   * @see https://pdfmake.github.io/docs/0.1/
   */
  static exportTransactionsToPDF(
    transactions: Transaction[],
    file: string,
    categoryDict: Record<number, Category>,
    date: DatePipe,
    profileCurrency: ProfileCurrencyPipe,
  ): void {
    // Row margin
    const margin = [0, 5, 0, 5];
    // Table body
    const body = [
      [
        { text: 'Category', style: 'header', margin },
        { text: 'Type', style: ['header', 'center'], margin },
        { text: 'Amount', style: ['header', 'right'], margin },
        { text: 'Date', style: ['header', 'center'], margin },
        { text: 'Time', style: ['header', 'center'], margin },
        { text: 'Note', style: 'header', margin },
      ],
    ];
    // Add rows
    for (const transaction of transactions) {
      // Style of amount column
      const style = transaction.kind === ExpenseKind.EXPENSE ? ['right', 'red'] : 'right';
      (body as any[]).push([
        { text: categoryDict[transaction.category].name, margin },
        { text: Utils.EXPENSE_KIND_LABEL[transaction.kind], style: 'center', margin },
        { text: profileCurrency.transform(transaction.amount), style, margin },
        { text: date.transform(transaction.time, 'mediumDate'), style: ['center'], margin },
        { text: date.transform(transaction.time, 'h:mm a'), style: 'center', margin },
        { text: transaction.note, margin },
      ]);
    }
    // Feed the data and download the PDF
    pdfMake.createPdf({
      content: [
        {
          layout: 'lightHorizontalLines',
          pageSize: 'A4',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*'],
            body,
          },
        },
      ],
      defaultStyle: { fontSize: 9 },
      styles: {
        header: { bold: true },
        center: { alignment: 'center' },
        right: { alignment: 'right' },
        red: { color: '#ff5252' },
      },
    }).download(file);
  }
}
