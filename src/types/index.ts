export type invoiceItemsProps = {
  id: string;
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
  total: number;
};

export type invoiceFormProps = {
  invoiceId: string;
  fromAddress: string;
  fromCity: string;
  fromPostCode: string;
  fromCountry: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  invoiceDueDate: string;
  paymentTerms: string;
  projectDescription: string;
  status: string;
  invoiceItems: invoiceItemsProps[];
};

export type invoiceItemProps = {
  invoices: invoiceFormProps[];
  darkMode: boolean;
};
