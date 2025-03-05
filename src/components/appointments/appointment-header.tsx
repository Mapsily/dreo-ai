"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, List, Search } from "lucide-react";
import { Input } from "../ui/input";

export default function AppointmentHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentQuery = searchParams.get("q") || "";
  const currentLayout = searchParams.get("layout") || "list";

  const [search, setSearch] = useState(currentQuery);
  const [layout, setLayout] = useState(currentLayout);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set("q", search);
        params.set("layout", "list");
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const toggleLayout = () => {
    const newLayout = layout === "list" ? "grid" : "list";
    setLayout(newLayout);
    const params = new URLSearchParams(searchParams);
    params.set("layout", newLayout);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="mt-2 flex items-center py-1 px-4 text-gray-600 rounded-sm bg-gray-100">
        <Search />
        <Input
          placeholder="Search by “number, name”"
          className="w-[250px] text-gray-600 border-none shadow-none focus:ring-0 focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={layout === "grid"}
          onChange={toggleLayout}
        />
        <div className="flex items-center justify-between px-[0.6rem] relative w-20 h-10 bg-gray-100 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-10 rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-primary">
          <List size={20} className="z-10" />
          <LayoutGrid size={20} className="z-10" />
        </div>
      </label>
    </div>
  );
}
