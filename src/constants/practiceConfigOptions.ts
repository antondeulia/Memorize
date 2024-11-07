export type PracticeConfigOption = {
  label: string;
  value: string;
};

export const langLevelOptions: PracticeConfigOption[] = [
  {
    label: "Any",
    value: "any",
  },
  {
    label: "A1",
    value: "A1",
  },
  {
    label: "A2",
    value: "A2",
  },
  {
    label: "B1",
    value: "B1",
  },
  {
    label: "B2",
    value: "B2",
  },
  {
    label: "C1",
    value: "C1",
  },
  {
    label: "C2",
    value: "C2",
  },
];

export const lengthOptions: PracticeConfigOption[] = [
  {
    label: "Short",
    value: "short",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Long",
    value: "long",
  },
];

export const topicOptions: PracticeConfigOption[] = [
  {
    label: "Any",
    value: "any",
  },
  {
    label: "School",
    value: "school",
  },
  {
    label: "Family",
    value: "family",
  },
  {
    label: "Relationships",
    value: "relationships",
  },
  {
    label: "Interview",
    value: "interview",
  },
  {
    label: "Work",
    value: "work",
  },
];

export const tenseOptions: PracticeConfigOption[] = [
  { label: "Present Simple", value: "present simple" },
  { label: "Present Continuous (Progressive)", value: "present continuous" },
  { label: "Present Perfect", value: "present perfect" },
  {
    label: "Present Perfect Continuous (Progressive)",
    value: "present perfect continuous",
  },
  { label: "Past Simple", value: "past simple" },
  { label: "Past Continuous (Progressive)", value: "past continuous" },
  { label: "Past Perfect", value: "past perfect" },
  {
    label: "Past Perfect Continuous (Progressive)",
    value: "past perfect continuous",
  },
  { label: "Future Simple", value: "future simple" },
  { label: "Future Continuous (Progressive)", value: "future continuous" },
  { label: "Future Perfect", value: "future perfect" },
  {
    label: "Future Perfect Continuous (Progressive)",
    value: "future perfect continuous",
  },
];

export const langOptions: PracticeConfigOption[] = [
  { label: "English", value: "english" },
  { label: "Svergies", value: "sweden" },
  { label: "Русский", value: "russian" },
  { label: "Українська", value: "ukrainian" },
  { label: "Deutschland", value: "german" },
];
