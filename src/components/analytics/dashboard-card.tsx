import React, { JSX } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  title: string;
  value: number | string;
  icon: JSX.Element;
  direction: "UP" | "DOWN" | "DEFAULT";
  percentage: number;
};

const DashboardCard = ({
  icon,
  title,
  value,
  direction,
  percentage = 0,
}: Props) => {
  return (
    <Card>
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="py-4">
        <p className="font-bold text-4xl">{value}</p>
      </CardContent>
      <CardFooter>
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <span
            className={`flex items-center gap-1 ${
              direction === "DEFAULT"
                ? ""
                : direction === "UP"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {percentage}%{" "}
            {direction === "DEFAULT" ? (
              <> </>
            ) : direction === "UP" ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
          </span>{" "}
          compared to yesterday
        </p>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
