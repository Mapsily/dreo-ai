import {
  BarChart,
  Bot,
  Box,
  Building2,
  Check,
  ClockArrowDown,
  Component,
  Laptop,
  ListTree,
  MailCheck,
  Phone,
  Rocket,
  Ticket,
  UserSquare,
} from "lucide-react";

export const PLANS_FEATURES = [
  {
    id: "1f4ee208-89b8-4537-a8f4-a48f5902e506",
    Icon: Box,
    features: [
      { text: "50 AI outreach calls/month", Icon: Phone },
      { text: "Basic conversation history (7 days)", Icon: ClockArrowDown },
      { text: "Basic Agent modification", Icon: Bot },
      { text: "Email Support", Icon: MailCheck },
    ],
  },
  {
    id: "bdb8dbbb-2f7b-4f54-a323-dd03d86e587a",
    Icon: Laptop,
    features: [
      { text: "100 AI outreach calls/month", Icon: Phone },
      { text: "Conversation history (Full time)", Icon: ClockArrowDown },
      { text: "Advanced Agent modification", Icon: Bot },
      { text: "Ticket Support", Icon: Ticket },
    ],
  },
  {
    id: "e8a86330-934e-4051-9f0a-d090dbba844c",
    Icon: Rocket,
    features: [
      { text: "Everything in Basic +", Icon: Check },
      { text: "200 AI outreach calls/month", Icon: Phone },
      { text: "Advanced Call Analytics", Icon: BarChart },
      { text: "CRM Integration", Icon: ListTree },
    ],
  },
  {
    id: "23640eb7-e4d7-4b77-b8d4-3e448d3fa36b",
    Icon: Building2,
    features: [
      { text: "Everything in Growth +", Icon: Check },
      { text: "Unlimited AI calls", Icon: Bot },
      { text: "Dedicated Account Manager", Icon: UserSquare },
      { text: "Custom Integrations", Icon: Component },
    ],
  },
];
