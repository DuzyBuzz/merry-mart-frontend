import * as pdfMake from 'pdfmake/build/pdfmake';
const pdfFonts = require('pdfmake/build/vfs_fonts');
import { UserResponse } from '../models/login.model';
(pdfMake as any).vfs = pdfFonts.vfs;

export function generatePDFReport(
  tableData: any[],
  headers: string[],
  reportTitle: string,
  user: UserResponse,
  logoUrl?: string
) {
  const body = [
    headers,
    ...tableData.map(row => headers.map(header => row[header] || ''))
  ];

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 100, 40, 60],
    header: (currentPage: number, pageCount: number) => ({
      columns: [
        logoUrl ? { image: logoUrl, width: 50 } : {},
        { text: `Merry Mart\n${reportTitle}`, margin: [10, 15, 0, 0], fontSize: 14 }
      ]
    }),
    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        { text: `Generated: ${new Date().toLocaleString()} | By: ${user.firstName} ${user.lastName} - ${user.role}`, fontSize: 9 },
        { text: `Page ${currentPage} / ${pageCount}`, alignment: 'right', fontSize: 9 }
      ]
    }),
    content: [
      {
        table: {
          headerRows: 1,
          widths: Array(headers.length).fill('*'),
          body
        },
        layout: { fillColor: (rowIndex: number) => rowIndex === 0 ? '#CCCCCC' : null }
      }
    ]
  };

  (pdfMake as any).createPdf(docDefinition).open();
}
