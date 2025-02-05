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
import { JSX } from "react";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Analytics",
    icon: <ChartLineIcon />,
    path: "analytics",
  },
  {
    label: "Prospects",
    icon: <Contact />,
    path: "prospects",
  },
  {
    label: "Products",
    icon: <Box />,
    path: "products",
  },
  {
    label: "Conversations",
    icon: <MessageCircle />,
    path: "conversation",
  },
  {
    label: "Appointments",
    icon: <Calendar />,
    path: "appointment",
  },
  {
    label: "Settings",
    icon: <Settings />,
    path: "settings",
  },
];

type SETTINGS_TABS_PROPS = {
  label: string;
  path: string;
  icon: JSX.Element;
};

export const SETTINGS_TABS: SETTINGS_TABS_PROPS[] = [
  { label: "Account", path: "account", icon: <User /> },
  { label: "Agent", path: "agent", icon: <Bot /> },
  { label: "Script", path: "script", icon: <FileText /> },
  { label: "Advance", path: "advance", icon: <MonitorCog /> },
];
