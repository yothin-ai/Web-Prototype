import type { Localized } from '../../i18n'
import type { Channel, ExpenseCategory, LedgerKind } from '../../accounting/accounting'

export const ac = {
  groupAccounting: { th: 'บัญชี', en: 'Accounting' },
  navCashBook: { th: 'รายรับ-รายจ่าย', en: 'Cash book' },
  navInvoices: { th: 'ใบกำกับภาษี', en: 'Tax invoices' },
  navVat: { th: 'ภาษีมูลค่าเพิ่ม', en: 'VAT' },
  navProfit: { th: 'กำไรขาดทุน', en: 'Profit and loss' },
  navClose: { th: 'ปิดยอดรายวัน', en: 'Daily close' },
  notAdvice: { th: 'ตัวเลขเป็นข้อมูลตัวอย่างสำหรับเดโม ไม่ใช่คำแนะนำด้านบัญชีหรือภาษี', en: 'The figures are sample information for a demo, not accounting or tax advice.' },
  month: { th: 'เดือน', en: 'Month' },

  // Cash book
  cashBookTitle: { th: 'รายรับ-รายจ่าย', en: 'Cash book' },
  cashBookText: { th: 'เงินเข้าและเงินออกของร้านในแต่ละเดือน เงินเข้าจากคำสั่งซื้อนับเมื่อได้รับเงินจริง', en: 'The money in and out of the shop each month. An order counts as money in once the money has arrived.' },
  moneyIn: { th: 'เงินเข้า', en: 'Money in' },
  moneyOut: { th: 'เงินออก', en: 'Money out' },
  moneyNet: { th: 'สุทธิ', en: 'Net' },
  receivable: { th: 'รอรับเงิน', en: 'Still to come' },
  receivableNote: { th: 'คำสั่งซื้อที่ยังไม่ได้รับเงิน', en: 'Orders not paid yet' },
  colDesc: { th: 'รายการ', en: 'Entry' },
  colChannel: { th: 'ช่องทาง', en: 'Channel' },
  colIn: { th: 'เงินเข้า', en: 'In' },
  colOut: { th: 'เงินออก', en: 'Out' },
  colVat: { th: 'VAT', en: 'VAT' },
  cashLabel: { th: 'รายการรับจ่าย', en: 'Cash book entries' },
  cashEmpty: { th: 'ไม่มีรายการในเดือนนี้', en: 'No entries this month' },
  kindSale: { th: 'ขาย', en: 'Sale' },
  kindDaily: { th: 'สรุปยอดขายประจำวัน', en: 'Daily sales summary' },
  kindExpense: { th: 'ค่าใช้จ่าย', en: 'Expense' },
  kindPurchase: { th: 'ซื้อสินค้า', en: 'Purchase' },
  chCash: { th: 'เงินสดที่สาขา', en: 'Cash at the branch' },
  chCod: { th: 'เก็บเงินปลายทาง', en: 'Cash on delivery' },
  chTransfer: { th: 'โอน/พร้อมเพย์/Wallet', en: 'Transfer, PromptPay, wallet' },
  chCard: { th: 'บัตร', en: 'Card' },
  catShipping: { th: 'ค่าจัดส่ง', en: 'Delivery' },
  catAdvertising: { th: 'โฆษณา', en: 'Advertising' },
  catRent: { th: 'ค่าเช่า', en: 'Rent' },
  catUtilities: { th: 'ค่าน้ำค่าไฟ', en: 'Utilities' },
  catFees: { th: 'ค่าธรรมเนียมชำระเงินและแพลตฟอร์ม', en: 'Payment and platform fees' },
  catOther: { th: 'อื่นๆ', en: 'Other' },
  payCourier: { th: 'บริษัทขนส่งตัวอย่าง', en: 'Sample courier' },
  payAds: { th: 'แพลตฟอร์มโฆษณาตัวอย่าง', en: 'Sample ad platform' },
  payLandlord: { th: 'ผู้ให้เช่าตัวอย่าง', en: 'Sample landlord' },
  payUtility: { th: 'ผู้ให้บริการสาธารณูปโภคตัวอย่าง', en: 'Sample utility' },
  payPayments: { th: 'ผู้ให้บริการชำระเงินตัวอย่าง', en: 'Sample payment provider' },
  payShop: { th: 'ร้านตัวอย่าง', en: 'Sample shop' },
  exportCsv: { th: 'ส่งออก CSV', en: 'Export CSV' },

  // Expense form
  expAdd: { th: 'บันทึกค่าใช้จ่าย', en: 'Record an expense' },
  expEditTitle: { th: 'แก้ไขค่าใช้จ่าย', en: 'Edit the expense' },
  expDate: { th: 'วันที่จ่าย', en: 'Date paid' },
  expCategory: { th: 'หมวด', en: 'Category' },
  expPayee: { th: 'จ่ายให้', en: 'Paid to' },
  expAmount: { th: 'จำนวนเงิน (บาท)', en: 'Amount (baht)' },
  expVat: { th: 'ภาษีมูลค่าเพิ่ม', en: 'VAT' },
  expVatYes: { th: 'รวม VAT 7% แล้ว', en: 'Includes VAT 7%' },
  expVatNo: { th: 'ไม่มี VAT', en: 'No VAT' },
  expNote: { th: 'หมายเหตุ (ไม่บังคับ)', en: 'Note (optional)' },
  expSave: { th: 'บันทึก', en: 'Save' },
  expClose: { th: 'ปิด', en: 'Close' },
  expErrPayee: { th: 'ระบุว่าจ่ายให้ใคร', en: 'Say who it was paid to' },
  expErrAmount: { th: 'กรอกจำนวนเงินมากกว่า 0', en: 'Enter an amount above 0' },
  expErrDate: { th: 'เลือกวันที่จ่าย', en: 'Choose the date paid' },
  expErrClosed: { th: 'วันนี้ปิดยอดแล้ว เปิดยอดใหม่ที่หน้าปิดยอดรายวันก่อนจึงจะบันทึกได้', en: 'That day is closed. Reopen it on the daily close page first.' },
  expSaved: { th: 'บันทึกค่าใช้จ่ายแล้ว', en: 'Expense saved' },
  expDelete: { th: 'ลบ', en: 'Delete' },
  expEdit: { th: 'แก้ไข', en: 'Edit' },
  expOwnOnly: { th: 'แก้หรือลบได้เฉพาะรายการที่คุณบันทึกเอง', en: 'You can edit or delete only the entries you recorded' },
} satisfies Record<string, Localized>

export const channelLabel = (c: Channel) => ({ cash: ac.chCash, cod: ac.chCod, transfer: ac.chTransfer, card: ac.chCard })[c]
export const categoryLabel = (c: ExpenseCategory) => ({ shipping: ac.catShipping, advertising: ac.catAdvertising, rent: ac.catRent, utilities: ac.catUtilities, fees: ac.catFees, other: ac.catOther })[c]
export const kindLabel = (k: LedgerKind) => ({ sale: ac.kindSale, daily: ac.kindDaily, expense: ac.kindExpense, purchase: ac.kindPurchase })[k]
const samplePayees: Record<string, Localized> = { '@courier': ac.payCourier, '@ads': ac.payAds, '@landlord': ac.payLandlord, '@utility': ac.payUtility, '@payments': ac.payPayments, '@shop': ac.payShop }
// A sample expense stores a marker for its payee so it reads in either language; one the visitor typed is shown as typed.
export const payeeText = (payee: string | undefined, t: (x: Localized) => string) => (payee?.startsWith('@') ? t(samplePayees[payee] ?? {}) : (payee ?? ''))
