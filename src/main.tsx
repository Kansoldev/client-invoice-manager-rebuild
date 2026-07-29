import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewInvoice from "@/components/ViewInvoice";
import Layout from "@/components/Layout";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<App />} index />
          <Route path="/invoice/id/:id" element={<ViewInvoice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
