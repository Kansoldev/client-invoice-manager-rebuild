import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="fixed top-0 w-full flex lg:flex-col justify-between items-center lg:w-24 bg-tranquil lg:h-screen lg:rounded-tr-[25px] lg:rounded-br-[25px]">
      <img src="/logo.svg" className="w-20 lg:w-full" />

      <div
        className="flex lg:flex-col gap-10 lg:gap-0 justify-around items-center lg:mb-5 pr-5 lg:pr-0"
        onClick={() => setDarkMode(!darkMode)}
      >
        <button
          className="cursor-pointer text-center lg:mb-20 transition"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun className="text-amber-300" />
          ) : (
            <Moon className="fill-glaucous text-glaucous hover:fill-[#DFE3FA] hover:text-[#DFE3FA]" />
          )}
        </button>

        <img src="/profile.png" className="w-12" alt="Profile image" />
      </div>
    </aside>
  );
};

export default Sidebar;
