import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { ChevronLeft, Plus, Trash } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { generateRandomString } from "@/utils";

type invoiceItemsProps = {
  id: string;
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
  total: number;
};

type invoiceFormProps = {
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

function AddInvoice({ onShowAddInvoice }: { onShowAddInvoice: () => void }) {
  const [invoiceFormData, setInvoiceFormData] = useState<invoiceFormProps>({
    invoiceId: generateRandomString(),
    fromAddress: "",
    fromCity: "",
    fromPostCode: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDueDate: "",
    paymentTerms: "",
    projectDescription: "",
    status: "pending",
    invoiceItems: [],
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInvoiceFormData((prevInvoiceData) => ({
      ...prevInvoiceData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleAddItem() {
    const newItem = {
      id: uuidv4(),
      itemName: "",
      itemPrice: "",
      itemQuantity: "",
      total: 0,
    };

    setInvoiceFormData((prevInvoiceData) => ({
      ...prevInvoiceData,
      invoiceItems: [...prevInvoiceData.invoiceItems, newItem],
    }));
  }

  function handleUpdateInvoiceItem(
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    setInvoiceFormData((prevInvoiceData) => {
      return {
        ...prevInvoiceData,
        invoiceItems: prevInvoiceData.invoiceItems.map((invoiceItem) => {
          if (invoiceItem.id === id) {
            const updatedItem = {
              ...invoiceItem,
              [e.target.name]: e.target.value,
            };

            return {
              ...updatedItem,
              total:
                Number(updatedItem.itemQuantity) *
                Number(updatedItem.itemPrice),
            };
          }

          return invoiceItem;
        }),
      };
    });
  }

  function handleRemoveInvoiceItem(itemID: string) {
    setInvoiceFormData((prevInvoiceData) => {
      return {
        ...prevInvoiceData,
        invoiceItems: prevInvoiceData.invoiceItems.filter(
          (invoiceItem) => invoiceItem.id !== itemID,
        ),
      };
    });
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div
      className="bg-black/50 fixed top-0 right-0 bottom-0 left-0 overflow-y-scroll"
      onClick={onShowAddInvoice}
    >
      <div
        className="bg-form md:w-1/2 px-2 md:rounded-tr-[20px] md:rounded-br-[20px] lg:pl-40 lg:pr-18 md:pt-30 lg:pt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="bg-transparent mt-24 mb-4 md:hidden text-primary"
          onClick={onShowAddInvoice}
        >
          <ChevronLeft size={18} className="text-secondary cursor-pointer" /> Go
          back
        </Button>

        <h2 className="text-primary text-3xl font-bold pl-2.5 lg:pl-0">
          New Invoice
        </h2>

        <form onSubmit={handleSubmit} className="relative mt-7 px-3 lg:px-0">
          <h3 className="capitalize text-secondary font-bold">bill from</h3>

          <Field className="relative mt-4 md:col-span-3">
            <FieldLabel htmlFor="address1" className="text-label font-normal">
              Street Address
            </FieldLabel>

            <Input
              id="address1"
              value={invoiceFormData.fromAddress}
              name="fromAddress"
              onChange={handleChange}
            />
          </Field>

          <FieldGroup className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-6 mt-8">
            <Field className="relative">
              <FieldLabel htmlFor="city" className="text-label font-normal">
                City
              </FieldLabel>

              <Input
                id="city"
                value={invoiceFormData.fromCity}
                name="fromCity"
                onChange={handleChange}
              />
            </Field>

            <Field className="relative">
              <FieldLabel htmlFor="postcode" className="text-label font-normal">
                Post Code
              </FieldLabel>

              <Input
                id="postcode"
                value={invoiceFormData.fromPostCode}
                name="fromPostCode"
                maxLength={6}
                onChange={handleChange}
              />
            </Field>

            <Field className="relative col-span-2 sm:col-span-1">
              <FieldLabel htmlFor="country" className="text-label font-normal">
                Country
              </FieldLabel>

              <Input
                id="country"
                value={invoiceFormData.fromCountry}
                name="fromCountry"
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>

          <h3 className="capitalize text-secondary font-bold mt-10">bill to</h3>

          <Field className="relative mt-4">
            <FieldLabel htmlFor="cname" className="text-label font-normal">
              Client's Name
            </FieldLabel>

            <Input
              id="cname"
              value={invoiceFormData.clientName}
              name="clientName"
              onChange={handleChange}
            />
          </Field>

          <Field className="relative mt-4">
            <FieldLabel htmlFor="cemail" className="text-label font-normal">
              Client's Email
            </FieldLabel>

            <Input
              id="cemail"
              value={invoiceFormData.clientEmail}
              name="clientEmail"
              onChange={handleChange}
            />
          </Field>

          <Field className="relative mt-4">
            <FieldLabel htmlFor="caddress" className="text-label font-normal">
              Street Address
            </FieldLabel>

            <Input
              id="caddress"
              value={invoiceFormData.clientAddress}
              name="clientAddress"
              onChange={handleChange}
            />
          </Field>

          <FieldGroup className="grid grid-cols-2 sm:grid-cols-3 justify-between gap-6">
            <Field className="relative mt-4">
              <FieldLabel htmlFor="ccity" className="text-label font-normal">
                City
              </FieldLabel>

              <Input
                id="ccity"
                value={invoiceFormData.clientCity}
                name="clientCity"
                onChange={handleChange}
              />
            </Field>

            <Field className="relative mt-4">
              <FieldLabel
                htmlFor="cpostcode"
                className="text-label font-normal"
              >
                Post Code
              </FieldLabel>

              <Input
                id="cpostcode"
                value={invoiceFormData.clientPostCode}
                name="clientPostCode"
                maxLength={6}
                onChange={handleChange}
              />
            </Field>

            <Field className="relative mt-4">
              <FieldLabel htmlFor="ccountry" className="text-label font-normal">
                Country
              </FieldLabel>

              <Input
                id="ccountry"
                value={invoiceFormData.clientCountry}
                name="clientCountry"
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="md:flex-row mt-10">
            <Field className="mt-4">
              <FieldLabel htmlFor="city" className="text-label font-normal">
                Invoice Date
              </FieldLabel>

              <Input
                type="date"
                value={invoiceFormData.invoiceDueDate}
                name="invoiceDueDate"
                onChange={handleChange}
              />
            </Field>

            <Field className="mt-4">
              <FieldLabel htmlFor="" className="text-label font-normal">
                Payment Terms
              </FieldLabel>

              <Select
                name="paymentTerms"
                onValueChange={(val) =>
                  setInvoiceFormData({ ...invoiceFormData, paymentTerms: val })
                }
              >
                <SelectTrigger className="py-6 border-glaucous/25 font-bold data-placeholder:text-primary text-primary">
                  <SelectValue placeholder="Net 30 Days" />
                </SelectTrigger>

                <SelectContent className="bg-white">
                  <SelectGroup className="border-0 font-bold space-y-2 p-5 hover:bg-transparent">
                    <SelectItem value="1" className="cursor-pointer">
                      Net 1 Day
                    </SelectItem>

                    <SelectItem value="7" className="cursor-pointer">
                      Net 7 Days
                    </SelectItem>

                    <SelectItem value="14" className="cursor-pointer">
                      Net 14 Days
                    </SelectItem>

                    <SelectItem value="30" className="cursor-pointer">
                      Net 30 Days
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <Field className="relative mt-7">
            <FieldLabel
              htmlFor="description"
              className="text-label font-normal"
            >
              Project Description
            </FieldLabel>

            <Input
              id="description"
              value={invoiceFormData.projectDescription}
              name="projectDescription"
              onChange={handleChange}
            />
          </Field>

          <h3 className="mt-10 mb-4 text-blue-gray text-lg font-bold">
            Item List
          </h3>

          <div>
            <table>
              <thead>
                <tr className="grid grid-cols-5 w-full">
                  <th className="text-left table-heading">Item Name</th>
                  <th className="table-heading">Qty.</th>
                  <th className="table-heading">Price</th>
                  <th className="table-heading">Total</th>
                </tr>
              </thead>

              <tbody className="flex flex-col mt-2">
                {invoiceFormData.invoiceItems.length > 0 &&
                  invoiceFormData.invoiceItems.map(
                    (invoiceItem: invoiceItemsProps) => {
                      return (
                        <tr
                          key={invoiceItem.id}
                          className="grid grid-cols-5 justify-between gap-4 mb-2"
                        >
                          <td>
                            <Input
                              name="itemName"
                              onChange={(e) =>
                                handleUpdateInvoiceItem(e, invoiceItem.id)
                              }
                            />
                          </td>

                          <td>
                            <Input
                              name="itemQuantity"
                              onChange={(e) =>
                                handleUpdateInvoiceItem(e, invoiceItem.id)
                              }
                            />
                          </td>

                          <td>
                            <Input
                              type="text"
                              name="itemPrice"
                              onChange={(e) =>
                                handleUpdateInvoiceItem(e, invoiceItem.id)
                              }
                            />
                          </td>

                          <td className="flex items-center justify-center">
                            <span
                              className={`${invoiceItem.total == 0 ? "hidden" : "inline-block text-primary"}`}
                            >
                              £{invoiceItem.total}
                            </span>
                          </td>

                          <td>
                            <Trash
                              className="ml-2 mt-4 fill-lavender text-lavender hover:fill-red-aura hover:text-red-aura cursor-pointer"
                              size={20}
                              onClick={() =>
                                handleRemoveInvoiceItem(invoiceItem.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    },
                  )}
              </tbody>
            </table>

            <Button
              type="button"
              size="lg"
              className="bg-strong-white text-glaucous dark:bg-comet dark:text-white w-full mt-10"
              onClick={handleAddItem}
            >
              <Plus className="relative top-[-1.3px]" /> Add New Item
            </Button>
          </div>

          <div className="flex flex-col min-[400px]:flex-row items-center justify-between mt-10 pb-2">
            <Button
              type="button"
              size="lg"
              className="bg-strong-white pb-5 font-bold text-glaucous"
            >
              Discard
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                size="lg"
                className="pb-5 bg-tranquil text-lavender dark:text-ana font-bold"
              >
                Save as Draft
              </Button>

              <Button variant="secondary" size="lg" className="pb-5">
                Save & Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInvoice;
