import { Interest, Language } from "../types";

export const availableInterests: Interest[] = [
  { id: "tech", name: "Technology" },
  { id: "science", name: "Science" },
  { id: "art", name: "Art" },
  { id: "music", name: "Music" },
  { id: "sports", name: "Sports" },
  { id: "cooking", name: "Cooking" },
  { id: "travel", name: "Travel" },
  { id: "photography", name: "Photography" },
];

export const availableLanguages: Language[] = [
  { id: "en", name: "English", level: "Native" },
  { id: "es", name: "Spanish", level: "Beginner" },
  { id: "fr", name: "French", level: "Intermediate" },
  { id: "de", name: "German", level: "Beginner" },
  { id: "it", name: "Italian", level: "Beginner" },
  { id: "jp", name: "Japanese", level: "Advanced" },
  { id: "kr", name: "Korean", level: "Beginner" },
  { id: "ch", name: "Chinese", level: "Intermediate" },
];

export const proficiencyLevels = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Upper Intermediate",
  "Advanced",
  "Native",
];
