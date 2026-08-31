import { useOutletContext } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OutletContext } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMediaQuery from "@/hooks/useMediaQuery";

const Header = ({
  onToggleAddInvoiceModal,
}: {
  onToggleAddInvoiceModal: () => void;
}) => {
  const isPhone = useMediaQuery("(max-width: 640px)");
  const { invoices, statusFilter, setStatusFilter } =
    useOutletContext<OutletContext>();

  return (
    <header className="text-center mt-20 w-full lg:w-200 mx-auto px-4 py-6 lg:p-0 flex items-center justify-between">
      <div className="text-left">
        <h1 className="text-primary font-bold text-2xl lg:text-[40px] leading-10">
          Invoices
        </h1>

        <p className="text-paragraph text-sm lg:text-base">
          {invoices.length > 0 ? `${invoices.length} Invoices` : "No invoices"}
        </p>
      </div>

      <div className="flex items-center lg:gap-15">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="lg:w-45 border-0 font-bold data-placeholder:text-primary">
            <SelectValue
              placeholder={isPhone ? "Filter" : "Filter by status"}
            />
          </SelectTrigger>

          <SelectContent className="bg-white">
            <SelectGroup className="border-0 font-bold space-y-2 p-5 hover:bg-transparent">
              <SelectItem value="all" className="cursor-pointer">
                All
              </SelectItem>

              <SelectItem value="draft" className="cursor-pointer">
                Draft
              </SelectItem>

              <SelectItem value="pending" className="cursor-pointer">
                Pending
              </SelectItem>

              <SelectItem value="paid" className="cursor-pointer">
                Paid
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="secondary"
          size="lg"
          className="text-base rounded-full"
          onClick={onToggleAddInvoiceModal}
        >
          <PlusCircle className="mr-2 fill-white text-secondary" />{" "}
          <span>
            New <span className="hidden sm:inline">Invoice</span>
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
