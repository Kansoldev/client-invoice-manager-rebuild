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
      <section>
        <Link
          to="/"
          className="inline-flex items-center gap-4 ml-64 mt-20 font-semibold text-sm text-primary"
        >
          <ChevronLeft
            size={18}
            className="text-secondary hidden sm:block cursor-pointer mb-1"
          />{" "}
          Go back
        </Link>

        {filteredInvoice.map((invoice: invoiceFormProps) => (
          <>
            <div className="bg-invoice flex lg:w-210 mx-auto items-center justify-between gap-2 mt-8 py-6 px-9 rounded-[10px]">
              <div className="flex items-center gap-5">
                <span className="text-pastel-indigo font-medium">Status</span>
                <span
                  className={cn(
                    "inline-block px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full",
                    checkStatus(invoice.status, darkMode),
                  )}
                >
                  {capitalizeFirstLetter(invoice.status)}
                </span>
              </div>

              <div className="flex gap-2">
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

            <div className="bg-invoice w-210 mt-10 shadow-lg mx-auto rounded-[10px] py-6 px-9">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-primary mb-2">
                    <span className="text-glaucous">#</span>
                    <span className="uppercase">{invoice.invoiceId}</span>
                  </div>

                  <p className="text-label w-2/3">
                    {invoice.projectDescription}
                  </p>
                </div>

                <div className="text-right text-label">
                  <p>{invoice.fromAddress}</p>
                  <p>{invoice.fromCity}</p>
                  <p>{invoice.fromPostCode}</p>
                  <p>{invoice.fromCountry}</p>
                </div>
              </div>

              <div className="flex gap-40 mt-20">
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

              <div className="bg-strong-white dark:bg-comet rounded-[10px] mt-10 overflow-hidden">
                <table className="w-full">
                  <thead>
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
                      <tr className="grid grid-cols-5 gap-4 mb-6 text-center px-10">
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
          </>
        ))}
      </section>
    </>
  );
};

export default ViewInvoice;
