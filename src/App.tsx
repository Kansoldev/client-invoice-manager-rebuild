import { useRef } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import InvoiceItem from "./components/InvoiceItem";
import "./App.css";

function App() {
  const showInvoice = useRef(true);

  return (
    <>
      <Sidebar />
      <Header />

      {!showInvoice.current && (
        <section className="flex flex-col justify-center items-center mt-20">
          <img src="/Email campaign.svg" />

          <h2 className="font-bold text-2xl mb-2 text-primary">
            There is nothing here
          </h2>

          <p className="w-2/3 md:w-1/3 lg:w-1/4 text-center text-lavender">
            Create a new invoice by clicking the <b>New Invoice</b> button and
            get started
          </p>
        </section>
      )}

      {showInvoice.current && (
        <>
          <InvoiceItem
            invoiceId="XM9141"
            dueDate="19 Aug 2021"
            clientName="Jensen Huang"
            amount="1,800.00"
            status="paid"
          />

          <InvoiceItem
            invoiceId="RT3080"
            dueDate="20 Sep 2021"
            clientName="Alex Grim"
            amount="556.00"
            status="pending"
          />

          <InvoiceItem
            invoiceId="FV2353"
            dueDate="12 Nov 2021"
            clientName="Anita Wainwright"
            amount="3,102.04"
            status="draft"
          />
        </>
      )}
    </>
  );
}

export default App;
