import { Fragment } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { OutletContext, invoiceFormProps } from "@/types";
import { capitalizeFirstLetter, checkStatus, formatDueDate } from "@/utils";

const ViewInvoice = () => {
  const { darkMode, invoices } = useOutletContext<OutletContext>();
  const params = useParams();
  const filteredInvoice = invoices.filter(
    (invoice: invoiceFormProps) => invoice.invoiceId === params.id,
  );

  const TotalItemPrices: number[] = [];
  filteredInvoice.map((invoice: invoiceFormProps) => {
    invoice.invoiceItems.map((item) => {
      TotalItemPrices.push(item.total);
    });
  });

  return (
    <>
      <section className="px-6 mt-20">
        <div className="lg:w-210 mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-4 mt-10 mb-5 font-semibold text-sm text-primary"
          >
            <ChevronLeft
              size={18}
              className="text-secondary cursor-pointer mb-1"
            />{" "}
            Go back
          </Link>
        </div>

        {filteredInvoice.map((invoice: invoiceFormProps) => (
          <Fragment key={invoice.invoiceId}>
            <div className="bg-invoice flex items-center justify-center md:justify-between lg:w-210 mx-auto py-6 px-6 md:px-9 rounded-[10px]">
              <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-5">
                <span className="text-pastel-indigo font-medium">Status</span>
                <span
                  className={cn(
                    "inline-block px-11 py-3 rounded-md col-start-2 sm:order-4 font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full",
                    checkStatus(invoice.status, darkMode),
                  )}
                >
                  {capitalizeFirstLetter(invoice.status)}
                </span>
              </div>

              <div className="hidden md:flex gap-2">
                <Button
                  size="lg"
                  className="text-[15px] bg-strong-white dark:bg-comet text-secondary dark:text-white"
                >
                  Edit
                </Button>

                <Button variant="danger" size="lg" className="text-[15px]">
                  Delete
                </Button>

                <Button variant="secondary" size="lg" className="text-[15px]">
                  Mark as Paid
                </Button>
              </div>
            </div>

            <div className="bg-invoice lg:w-210 mt-10 shadow-lg mx-auto rounded-[10px] py-6 px-6">
              <div className="md:flex justify-between">
                <div>
                  <div className="font-bold text-primary mb-2">
                    <span className="text-glaucous">#</span>
                    <span className="uppercase">{invoice.invoiceId}</span>
                  </div>

                  <p className="text-label">{invoice.projectDescription}</p>
                </div>

                <div className="md:text-right text-label mt-6 md:mt-0">
                  <p>{invoice.fromAddress}</p>
                  <p>{invoice.fromCity}</p>
                  <p>{invoice.fromPostCode}</p>
                  <p>{invoice.fromCountry}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 mt-12">
                <div>
                  <div>
                    <span className="text-label block">Invoice Date</span>
                    <p className="mt-3 font-bold text-primary">
                      {formatDueDate(invoice.invoiceDueDate)}
                    </p>
                  </div>

                  <div className="mt-10">
                    <span className="text-label block">Payment Due</span>
                    <p className="mt-3 font-bold text-primary">#</p>
                  </div>
                </div>

                <div>
                  <p className="text-label">Bill To</p>
                  <p className="my-3 font-bold text-primary">
                    {invoice.clientName}
                  </p>
                  <p className="text-label text-xm">{invoice.clientAddress}</p>
                </div>

                <div>
                  <p className="text-label">Sent to</p>
                  <p className="my-3 font-bold text-primary">
                    {invoice.clientEmail}
                  </p>
                </div>
              </div>

              <div className="bg-strong-white dark:bg-comet rounded-2xl mt-16 md:hidden">
                <div className="p-6">
                  {invoice.invoiceItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between ${Number(item.id) !== 1 ? "mt-5" : ""}`}
                    >
                      <div>
                        <h4 className="text-primary font-bold">
                          {item.itemName}
                        </h4>
                        <p className="text-glaucous font-bold">
                          {item.itemQuantity} x £{" "}
                          {Number(item.itemPrice).toFixed(2)}
                        </p>
                      </div>

                      <p className="text-primary font-bold">
                        £ {Number(item.total).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-tranquil dark:bg-black-pepper flex items-center justify-between mt-5 p-6 rounded-br-[10px] rounded-bl-[10px]">
                  <p className="text-white text-sm">Grand Total</p>
                  <p className="text-white font-bold text-xl min-[25rem]:text-3xl md:text-base">
                    £
                    {TotalItemPrices.reduce(
                      (acc, currentValue) => acc + currentValue,
                      0,
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="bg-strong-white dark:bg-comet rounded-2xl mt-16 hidden md:block">
                <table className="w-full">
                  <thead className="hidden md:block">
                    <tr className="grid grid-cols-5 w-full p-10">
                      <th className="text-left text-label font-medium ml-3 col-span-2">
                        Item Name
                      </th>
                      <th className="text-label uppercase font-medium">Qty.</th>
                      <th className="text-label font-medium">Price</th>
                      <th className="text-label font-medium">Total</th>
                    </tr>
                  </thead>

                  <tbody className="flex flex-col mt-2">
                    {invoice.invoiceItems.map((item) => (
                      <tr
                        key={item.id}
                        className="grid grid-cols-5 gap-4 mb-6 text-center px-10"
                      >
                        <td className="col-span-2 text-left">
                          <span className="font-bold text-primary">
                            {item.itemName}
                          </span>
                        </td>

                        <td>
                          <span className="font-bold text-primary">
                            {item.itemQuantity}
                          </span>
                        </td>

                        <td>
                          <span className="font-bold text-primary">
                            £{Number(item.itemPrice).toFixed(2)}
                          </span>
                        </td>

                        <td className="flex items-center justify-center">
                          <span className="font-bold text-primary">
                            £{Number(item.total).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}

                    <tr className="bg-tranquil dark:bg-black-pepper py-10 grid grid-cols-5 justify-end items-center gap-4 text-center px-6">
                      <td>
                        <span className="text-white col-span-1">
                          Amount Due
                        </span>
                      </td>

                      <td>
                        <span className="font-bold text-primary"></span>
                      </td>

                      <td>
                        <span className="font-bold text-primary"></span>
                      </td>

                      <td className="flex items-center justify-center">
                        <span className="font-bold text-white text-2xl">
                          £
                          {TotalItemPrices.reduce(
                            (acc, currentValue) => acc + currentValue,
                            0,
                          ).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default ViewInvoice;
