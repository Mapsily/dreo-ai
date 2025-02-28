"use server";

import {
  fetchConversationAnalytics,
  fetchAppointmentAnalytics,
  fetchConversionRateAnalytics,
  fetchActiveProspectAnalytics,
  fetchLastWeekCalls,
  fetchTodaysAppointments,
} from "./services";
import {
  calculateConversationRate,
  calculatePercentageChange,
} from "@/lib/utils";

export async function fetchAnalytics(clerkId: string) {
  try {
    const [
      conversations,
      appointments,
      conversionRate,
      activeProspect,
      lastWeekCalls,
      todaysAppointments,
    ] = await Promise.all([
      fetchConversationAnalytics(clerkId),
      fetchAppointmentAnalytics(clerkId),
      fetchConversionRateAnalytics(clerkId),
      fetchActiveProspectAnalytics(clerkId),
      fetchLastWeekCalls(clerkId),
      fetchTodaysAppointments(clerkId),
    ]);

    const todayConversionRate = calculateConversationRate(
      appointments.todayAppointmentCount,
      conversations.todayCallCount
    );

    const conversionCTY = calculatePercentageChange(
      todayConversionRate,
      conversionRate.yesterdayConversionRate
    );

    return {
      todayCallCount: conversations.todayCallCount,
      callCTY: conversations.cty,
      todayAppointmentCount: appointments.todayAppointmentCount,
      appointmentCTY: appointments.cty,
      todayConversionRate,
      conversionCTY,
      todayActiveProspect: activeProspect.todayActiveProspectCount,
      activeProspectCTY: activeProspect.cty,
      lastWeekCalls,
      todaysAppointments,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {};
  }
}
