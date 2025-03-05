"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "../ui/input";

export default function SupportHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(currentQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set("q", search);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex justify-between items-center">
      <div className="mt-2 flex items-center py-1 px-4 text-gray-600 rounded-sm bg-gray-100">
        <Search />
        <Input
          placeholder="Search by “ticket id”"
          className="w-[250px] text-gray-600 border-none shadow-none focus:ring-0 focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
