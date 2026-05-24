import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
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
        <section className="mx-4 lg:mx-0">
          <div className="bg-white grid sm:flex lg:w-210 mx-auto items-center justify-between gap-2 rounded-md shadow mt-8 py-6 px-6">
            <p className="font-bold text-primary">
              <span className="text-lavender sm:order-1">#</span>XM9141
            </p>
            <p className="text-lavender row-start-2 col-end-1 sm:order-2 mt-5 sm:mt-0">
              Due 19 Aug 2021
            </p>
            <p className="text-primary font-bold row-start-3 col-end-1 sm:order-3">
              £1,800.90
            </p>
            <p className="text-lavender col-start-2 sm:order-2 text-right">
              Jensen Huang
            </p>
            <p className="bg-emerald-50 px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 text-emerald-400 font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full before:bg-emerald-400">
              Paid
            </p>

            <ChevronRight
              size={18}
              className="text-secondary hidden sm:block order-4"
            />
          </div>

          <div className="bg-white grid sm:flex lg:w-210 mx-auto items-center justify-between gap-2 rounded-md shadow mt-8 py-6 px-6">
            <p className="font-bold text-primary">
              <span className="text-lavender sm:order-1">#</span>RT3080
            </p>
            <p className="text-lavender row-start-2 col-end-1 sm:order-2 mt-5 sm:mt-0">
              Due 20 Sep 2021
            </p>
            <p className="text-primary font-bold row-start-3 col-end-1 sm:order-3">
              £556.00
            </p>
            <p className="text-lavender col-start-2 sm:order-2 text-right">
              Alex Grim
            </p>
            <p className="bg-pizazz/12 px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 text-pizazz font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full before:bg-pizazz">
              Pending
            </p>

            <ChevronRight
              size={18}
              className="text-secondary hidden sm:block order-4"
            />
          </div>

          <div className="bg-white grid sm:flex lg:w-210 mx-auto items-center justify-between gap-2 rounded-md shadow mt-8 py-6 px-6">
            <p className="font-bold text-primary">
              <span className="text-lavender sm:order-1">#</span>FV2353
            </p>
            <p className="text-lavender row-start-2 col-end-1 sm:order-2 mt-5 sm:mt-0">
              Due 12 Nov 2021
            </p>
            <p className="text-primary font-bold row-start-3 col-end-1 sm:order-3">
              £3,102.04
            </p>
            <p className="text-lavender col-start-2 sm:order-2 text-right">
              Anita Wainwright
            </p>
            <p className="bg-tranquil/12 px-11 py-3 rounded-md col-start-2 sm:order-4 relative top-4 sm:top-0 text-tranquil font-bold before:content-[''] before:absolute before:top-4.75 before:bottom-0 before:left-7 before:w-2 before:h-2 before:rounded-full before:bg-tranquil">
              Draft
            </p>

            <ChevronRight
              size={18}
              className="text-secondary hidden sm:block order-4"
            />
          </div>
        </section>
      )}
    </>
  );
}

export default App;
