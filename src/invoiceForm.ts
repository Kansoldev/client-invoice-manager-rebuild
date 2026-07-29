import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import type { invoiceFormProps } from "./types";

export function handleValidation(formData: invoiceFormProps) {
  const REQUIRED_FIELDS = [
    "fromAddress",
    "fromCity",
    "fromPostCode",
    "fromCountry",
    "clientName",
    "clientEmail",
    "clientAddress",
    "clientCity",
    "clientPostCode",
    "clientCountry",
    "projectDescription",
    "invoiceDueDate",
  ] as const;

  let isValid = false;

  const newErrors = Object.fromEntries(
    REQUIRED_FIELDS.map((field) => [field, formData[field] === ""]),
  );

  if (!Object.values(newErrors).includes(true)) {
    isValid = true;
  }

  return {
    newErrors,
    isValid,
  };
}

export function handleAddInvoiceItem(
  updateFunc: Dispatch<SetStateAction<invoiceFormProps>>,
) {
  const newItem = {
    id: uuidv4(),
    itemName: "",
    itemPrice: "",
    itemQuantity: "",
    total: 0,
  };

  updateFunc((prevInvoiceData) => ({
    ...prevInvoiceData,
    invoiceItems: [...prevInvoiceData.invoiceItems, newItem],
  }));
}

export function handleEditInvoiceItem(
  e: ChangeEvent<HTMLInputElement>,
  id: string,
  updateFunc: Dispatch<SetStateAction<invoiceFormProps>>,
) {
  updateFunc((prevInvoiceData: invoiceFormProps) => {
    return {
      ...prevInvoiceData,
      invoiceItems: prevInvoiceData.invoiceItems.map((invoiceItem) => {
        if (invoiceItem.id === id) {
          const editedItem = {
            ...invoiceItem,
            [e.target.name]: e.target.value,
          };

          return {
            ...editedItem,
            total:
              Number(editedItem.itemQuantity) * Number(editedItem.itemPrice),
          };
        }

        return invoiceItem;
      }),
    };
  });
}

export function handleRemoveInvoiceItem(
  itemID: string,
  updateFunc: Dispatch<SetStateAction<invoiceFormProps>>,
) {
  updateFunc((prevInvoiceData: invoiceFormProps) => {
    return {
      ...prevInvoiceData,
      invoiceItems: prevInvoiceData.invoiceItems.filter(
        (invoiceItem) => invoiceItem.id !== itemID,
      ),
    };
  });
}
