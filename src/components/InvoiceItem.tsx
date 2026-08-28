import { Link, useOutletContext } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { invoiceFormProps, OutletContext } from "@/types";
import { capitalizeFirstLetter, formatDueDate, checkStatus } from "@/utils";

export default function InvoiceItem() {
  const { invoices, darkMode } = useOutletContext<OutletContext>();

  function calculateInvoicePrice(invoice: invoiceFormProps) {
    const invoicePrice = invoice.invoiceItems
      .map((item) => item.total)
      .reduce((acc, currentValue) => acc + currentValue, 0);

    return invoicePrice;
  }

  return (
    <section className="mx-4 lg:mx-0">
      {invoices.map((invoice, index: number) => {
        return (
          <div
            key={index}
            className="bg-invoice grid sm:flex lg:w-210 mx-auto items-center justify-between gap-2 rounded-md shadow mt-8 py-6 px-6"
          >
            <p className="font-bold text-primary">
              <span className="text-glaucous sm:order-1">#</span>
              <span className="uppercase">{invoice.invoiceId}</span>
            </p>

            <p className="text-lavender font-medium row-start-2 col-end-1 sm:order-2 mt-5 sm:mt-0">
              Due {formatDueDate(invoice.invoiceDueDate)}
            </p>

            <p className="text-primary font-bold row-start-3 col-end-1 sm:order-3">
              £{calculateInvoicePrice(invoice)}
            </p>

            <p className="text-lavender font-medium col-start-2 sm:order-2 text-right">
              {invoice.clientName}
            </p>

            <p
              className={cn(
                "px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full",
                checkStatus(invoice.status, darkMode),
              )}
            >
              {capitalizeFirstLetter(invoice.status)}
            </p>

            <Link to={`/invoice/id/${invoice.invoiceId}`} className="order-4">
              <ChevronRight
                size={18}
                className="text-secondary hidden sm:block cursor-pointer"
              />
            </Link>
          </div>
        );
      })}
    </section>
  );
}
