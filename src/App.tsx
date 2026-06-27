import { useState, useEffect } from "react";
import type { invoiceFormProps } from "./types";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import InvoiceItem from "./components/InvoiceItem";
import AddInvoice from "./components/AddInvoice";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const darkModeVal = window.localStorage.getItem("darkMode");

    if (darkModeVal) return JSON.parse(darkModeVal);

    return false;
  });
  const [invoices, setInvoices] = useState<invoiceFormProps[]>(() => {
    const invoices = window.localStorage.getItem("invoices");
    if (invoices) return JSON.parse(invoices);
    return [];
  });
  const [showAddInvoice, setShowAddInvoice] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    window.localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    window.localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  function handleAddInvoice(data: invoiceFormProps) {
    setInvoices((prevInvoices) => [...prevInvoices, data]);
  }

  return (
    <>
      <Sidebar darkMode={darkMode} onChangeTheme={setDarkMode} />
      <Header
        onToggleAddInvoiceModal={() => setShowAddInvoice(!showAddInvoice)}
      />

      {invoices.length === 0 && (
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

      {invoices.length > 0 && (
        <InvoiceItem invoices={invoices} darkMode={darkMode} />
      )}

      {showAddInvoice && (
        <AddInvoice
          onAddInvoice={handleAddInvoice}
          onShowAddInvoice={() => setShowAddInvoice(!showAddInvoice)}
        />
      )}
    </>
  );
}

export default App;
