import {
  Bot,
  Box,
  Calendar,
  ChartLineIcon,
  Contact,
  FileText,
  MessageCircle,
  MonitorCog,
  Settings,
  User,
} from "lucide-react";
import * as React from "react";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: React.ComponentType;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Analytics",
    icon: ChartLineIcon,
    path: "analytics",
  },
  {
    label: "Products",
    icon: Box,
    path: "products",
  },
  {
    label: "Prospects",
    icon: Contact,
    path: "prospects",
  },
  {
    label: "Conversations",
    icon: MessageCircle,
    path: "conversations",
  },
  {
    label: "Appointments",
    icon: Calendar,
    path: "appointments",
  },
];

type HEADER_LINK = {
  title: string;
  path: string;
};

export const HEADER_LINKS: HEADER_LINK[] = [
  { path: "/developers", title: "Developers" },
  { path: "/pricing", title: "Pricing" },
  { path: "/docs", title: "Docs" },
  { path: "/blogs", title: "Blogs" },
];

type SETTINGS_TABS_PROPS = {
  label: string;
  path: string;
  icon: React.ComponentType;
};

export const SETTINGS_TABS: SETTINGS_TABS_PROPS[] = [
  { label: "Account", path: "account", icon: User },
  { label: "AI Agent", path: "agent", icon: Bot },
  { label: "Script", path: "script", icon: FileText },
  { label: "Advanced", path: "advanced", icon: MonitorCog },
];
