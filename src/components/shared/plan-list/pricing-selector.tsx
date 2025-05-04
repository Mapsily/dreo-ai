"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Badge } from "../../ui/badge";

const PricingSelector = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialValue = searchParams.get("pricing") || "yearly";
  const [value, setValue] = useState(initialValue);

  const handlePricingChange = (newValue: string) => {
    setValue(newValue);
    const params = new URLSearchParams(searchParams);
    params.set("pricing", newValue);
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const urlValue = searchParams.get("pricing") || "yearly";
    setValue(urlValue);
  }, [searchParams]);

  return (
    <Tabs value={value} onValueChange={handlePricingChange} className="w-fit">
      <TabsList className="border">
        <TabsTrigger
          value="yearly"
          className={cn(value === "yearly" && "!bg-white !text-black")}
        >
          Yearly <Badge className="ml-2">Save 15%</Badge>
        </TabsTrigger>
        <TabsTrigger
          value="monthly"
          className={cn(value === "monthly" && "!bg-white !text-black")}
        >
          Monthly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default PricingSelector;
