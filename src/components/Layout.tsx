import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { formErrorsProps, invoiceFormProps } from "@/types";
import Sidebar from "@/components/Sidebar";

function Layout() {
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
  const [formErrors, setFormErrors] = useState<formErrorsProps>({
    fromAddress: false,
    fromCity: false,
    fromPostCode: false,
    fromCountry: false,
    clientName: false,
    clientEmail: false,
    clientAddress: false,
    clientCity: false,
    clientPostCode: false,
    clientCountry: false,
    invoiceDueDate: false,
    projectDescription: false,
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

  return (
    <>
      <Sidebar darkMode={darkMode} onChangeTheme={setDarkMode} />
      <Outlet
        context={{
          showAddInvoice,
          setShowAddInvoice,
          invoices,
          setInvoices,
          darkMode,
          formErrors,
          setFormErrors,
        }}
      />
    </>
  );
}

export default Layout;
