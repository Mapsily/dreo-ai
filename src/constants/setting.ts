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

const DEFAULT_KNOWLEDGE_BASE =
  "We are a leading real estate firm with a strong track record of helping property owners sell their properties quickly and efficiently. Our experienced team specializes in matching sellers with the right buyers, ensuring a smooth transaction process. With our deep market knowledge and personalized approach, we help homeowners maximize their property value.";

const DEFAULT_INITIAL_SCRIPT =
  "Hello, this is krishna calling on behalf of [Company Name]. I wanted to check if you’ve considered selling or renting your property. Right now, the market is strong, and we have buyers actively looking. Would you be open to discussing your options?";

const DEFAULT_FOLLOWUP_SCRIPT =
  "Hi [Seller Name], I wanted to follow up on our last conversation about your property. We’re seeing a lot of interest in homes like yours, and I’d love to help you explore the best possible deal. Do you have time for a quick chat?";

const DEFAULT_QUALIFICATION_QUESTIONS = [
  "Have you thought about selling your property in the near future?",
  "If so, what’s your timeline for selling?",
  "Are there any specific factors motivating you to sell?",
  "Would you be open to an evaluation to determine the best possible price?",
  "Have you spoken with any other agents about selling?",
];

const DEFAULT_FIRST_MESSAGE = "Hello, this is krishna from [Company Name]";

const DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const DEFAULT_SETTINGS = {
  agent: {
    language: "en",
    firstMessage: DEFAULT_FIRST_MESSAGE,
    knowledgeBase: DEFAULT_KNOWLEDGE_BASE,
    voice: "Mark",
  },
  script: {
    initial: DEFAULT_INITIAL_SCRIPT,
    followUp: DEFAULT_FOLLOWUP_SCRIPT,
  },
  advanced: {
    questions: DEFAULT_QUALIFICATION_QUESTIONS,
    maxConversationDuration: "300s",
    timeZone: DEFAULT_TIMEZONE,
    startAt: "9",
    endAt: "18",
  },
};
