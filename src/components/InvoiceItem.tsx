import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { invoiceFormProps, invoiceItemProps } from "@/types";
import { capitalizeFirstLetter, formatDueDate } from "@/utils";

export default function InvoiceItem({ invoices, darkMode }: invoiceItemProps) {
  function calculateInvoicePrice(invoice: invoiceFormProps) {
    const invoicePrice = invoice.invoiceItems
      .map((item) => item.total)
      .reduce((acc, currentValue) => acc + currentValue, 0);

    return invoicePrice;
  }

  function checkStatus(status: string) {
    let statusbg = "";

    switch (status) {
      case "paid":
        statusbg = `${darkMode ? "bg-emerald-50/5" : "bg-emerald-50"} before:bg-emerald-400 text-emerald-400`;
        break;

      case "pending":
        statusbg = `${darkMode ? "bg-pizazz/5" : "bg-pizazz/12"} before:bg-pizazz text-pizazz`;
        break;

      case "draft":
        statusbg = `${darkMode ? "bg-tranquil/50 before:bg-ana text-ana" : "bg-tranquil/12 before:bg-tranquil text-tranquil"}`;
        break;

      default:
        statusbg = "";
    }

    return statusbg;
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
                checkStatus(invoice.status),
              )}
            >
              {capitalizeFirstLetter(invoice.status)}
            </p>

            <ChevronRight
              size={18}
              className="text-secondary hidden sm:block order-4 cursor-pointer"
            />
          </div>
        );
      })}
    </section>
  );
}
