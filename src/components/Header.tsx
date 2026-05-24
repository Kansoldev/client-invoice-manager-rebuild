import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMediaQuery from "@/hooks/useMediaQuery";

const Header = () => {
  const isPhone = useMediaQuery("(max-width: 640px)");

  return (
    <header className="text-center mt-20 w-full lg:w-200 mx-auto px-4 py-6 lg:p-0 flex items-center justify-between">
      <div className="text-left">
        <h1 className="text-primary font-bold text-2xl lg:text-[40px] leading-10">
          Invoices
        </h1>

        <p className="text-lavender text-sm lg:text-base">No invoices</p>
      </div>

      <div className="flex items-center lg:gap-15">
        <Select>
          <SelectTrigger className="lg:w-45 border-0 font-bold data-placeholder:text-primary">
            <SelectValue
              placeholder={isPhone ? "Filter" : "Filter by status"}
            />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup className="border-0 font-bold space-y-2 p-5 hover:bg-transparent">
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
