export interface Interest {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface UserSettings {
  interests: string[];
  learningLanguages: string[];
  proficiency: Record<string, string>;
}
