import type { Dispatch, SetStateAction } from "react";

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

export type formErrorsProps = {
  fromAddress: boolean;
  fromCity: boolean;
  fromPostCode: boolean;
  fromCountry: boolean;
  clientName: boolean;
  clientEmail: boolean;
  clientAddress: boolean;
  clientCity: boolean;
  clientPostCode: boolean;
  clientCountry: boolean;
  invoiceDueDate: boolean;
  projectDescription: boolean;
};

export type OutletContext = {
  showAddInvoice: boolean;
  darkMode: boolean;
  invoices: invoiceFormProps[];
  formErrors: {
    fromAddress: boolean;
    fromCity: boolean;
    fromPostCode: boolean;
    fromCountry: boolean;
    clientName: boolean;
    clientEmail: boolean;
    clientAddress: boolean;
    clientCity: boolean;
    clientPostCode: boolean;
    clientCountry: boolean;
    invoiceDueDate: boolean;
    projectDescription: boolean;
  };
  setFormErrors: Dispatch<SetStateAction<formErrorsProps>>;
  setInvoices: Dispatch<SetStateAction<invoiceFormProps[]>>;
  setShowAddInvoice: (val: boolean) => void;
};
