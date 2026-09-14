import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { OutletContext } from "@/types";

const DeleteInvoice = ({
  invoiceId,
  onDeleteInvoice,
}: {
  invoiceId: string;
  onDeleteInvoice: () => void;
}) => {
  const { invoices, setInvoices } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  function handleDeleteInvoice() {
    setInvoices(invoices.filter((invoice) => invoice.invoiceId !== invoiceId));
    navigate("/");
  }

  return (
    <div
      className="bg-black/50 fixed top-0 right-0 bottom-0 left-0 overflow-y-scroll flex justify-center items-center"
      onClick={onDeleteInvoice}
    >
      <div
        className="bg-form md:w-120 mx-auto md:rounded-xl p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-primary text-3xl font-bold">Confirm Deletion</h2>

        <p className="my-4 text-glaucous font-medium">
          Are you sure you want to delete invoice #{invoiceId.toUpperCase()}?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-5">
          <Button
            className="bg-strong-white pb-5 font-bold text-glaucous"
            size="lg"
            onClick={onDeleteInvoice}
          >
            Cancel
          </Button>

          <Button variant="danger" size="lg" onClick={handleDeleteInvoice}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoice;
