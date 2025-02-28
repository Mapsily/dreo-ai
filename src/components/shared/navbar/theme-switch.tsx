import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="flex items-center justify-between px-[0.5rem] relative w-14 h-8 bg-primary/50 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-primary">
        <Sun size={16} className="z-10" />
        <Moon size={16} className="z-10" />
      </div>
    </label>
  );
}
