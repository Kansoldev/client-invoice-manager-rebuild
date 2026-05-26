import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils";

type InvoiceItemProps = {
  invoiceId: string;
  dueDate: string;
  clientName: string;
  amount: string;
  status: string;
};

export default function InvoiceItem({
  invoiceId,
  dueDate,
  clientName,
  amount,
  status,
}: InvoiceItemProps) {
  let statusbg = "";

  switch (status) {
    case "paid":
      statusbg = "bg-emerald-50 text-emerald-400 before:bg-emerald-400";
      break;

    case "pending":
      statusbg = "bg-pizazz/12 text-pizazz before:bg-pizazz";
      break;

    case "draft":
      statusbg = "bg-tranquil/12 text-tranquil before:bg-tranquil";
      break;

    default:
      statusbg = "";
  }

  return (
    <section className="mx-4 lg:mx-0">
      <div className="bg-white grid sm:flex lg:w-210 mx-auto items-center justify-between gap-2 rounded-md shadow mt-8 py-6 px-6">
        <p className="font-bold text-primary">
          <span className="text-lavender sm:order-1">#</span>
          {invoiceId}
        </p>
        <p className="text-lavender row-start-2 col-end-1 sm:order-2 mt-5 sm:mt-0">
          {dueDate}
        </p>
        <p className="text-primary font-bold row-start-3 col-end-1 sm:order-3">
          £{amount}
        </p>
        <p className="text-lavender col-start-2 sm:order-2 text-right">
          {clientName}
        </p>
        <p
          className={cn(
            "px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full",
            statusbg,
          )}
        >
          {capitalizeFirstLetter(status)}
        </p>

        <ChevronRight
          size={18}
          className="text-secondary hidden sm:block order-4"
        />
      </div>
    </section>
  );
}
