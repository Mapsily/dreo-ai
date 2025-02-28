export const CONVERSATION_DURATIONS = [
  { value: "300s", label: "300s", id: "300s" },
  { value: "600s", label: "600s", id: "600s" },
  { value: "1200s", label: "1200s", id: "1200s" },
  { value: "1800s", label: "1800s", id: "1800s" },
];

export const TIMEZONES = Intl.supportedValuesOf("timeZone").map((zone) => ({
  label: zone,
  value: zone,
  id: zone,
}));

export const LANGUAGES = [
  { label: "Arabic", id: "Arabic", value: "ar" },
  { label: "Bulgarian", id: "Bulgarian", value: "bg" },
  { label: "Chinese", id: "Chinese", value: "zh" },
  { label: "Czech", id: "Czech", value: "cs" },
  { label: "Danish", id: "Danish", value: "da" },
  { label: "Dutch", id: "Dutch", value: "nl" },
  { label: "English", id: "English", value: "en" },
  { label: "Finnish", id: "Finnish", value: "fi" },
  { label: "French", id: "French", value: "fr" },
  { label: "German", id: "German", value: "de" },
  { label: "Greek", id: "Greek", value: "el" },
  { label: "Hindi", id: "Hindi", value: "hi" },
  { label: "Hungarian", id: "Hungarian", value: "hu" },
  { label: "Italian", id: "Italian", value: "it" },
  { label: "Japanese", id: "Japanese", value: "ja" },
  { label: "Polish", id: "Polish", value: "pl" },
  { label: "Portuguese", id: "Portuguese", value: "pt" },
  { label: "Romanian", id: "Romanian", value: "ro" },
  { label: "Russian", id: "Russian", value: "ru" },
  { label: "Slovak", id: "Slovak", value: "sk" },
  { label: "Spanish", id: "Spanish", value: "es" },
  { label: "Swedish", id: "Swedish", value: "sv" },
  { label: "Tamil", id: "Tamil", value: "ta" },
  { label: "Turkish", id: "Turkish", value: "tr" },
  { label: "Ukrainian", id: "Ukrainian", value: "uk" },
  { label: "Vietnamese", id: "Vietnamese", value: "vi" },
];

export const SETTING_STEPS = ["ACCOUNT", "AI AGENT", "SCRIPT", "ADVANCED"];

export const DEFAULT_SETTINGS = {
  agent: {
    language: "en",
    firstMessage: "Hello",
    knowledgeBase: "",
    voice: "Mark",
  },
  script: {
    initial: "Hii there",
    followUp: "Hello, as we discussed",
  },
  advanced: {
    maxConversationDuration: "300s",
    timeZone: "Asia/Kolkata",
    startAt: 9,
    endAt: 18,
  },
};
