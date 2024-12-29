import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  availableLanguages,
  proficiencyLevels,
} from "@/features/users/constants";

const LanguageSelector: React.FC<{
  selectedLanguages: string[];
  proficiency: Record<string, string>;
  onLanguageChange: (languages: string[]) => void;
  onProficiencyChange: (language: string, level: string) => void;
}> = ({
  selectedLanguages,
  proficiency,
  onLanguageChange,
  onProficiencyChange,
}) => {
  const handleLanguageSelect = (languageId: string) => {
    if (!selectedLanguages.includes(languageId)) {
      onLanguageChange([...selectedLanguages, languageId]);
      onProficiencyChange(languageId, "Beginner");
    }
  };

  const handleLanguageRemove = (languageId: string) => {
    onLanguageChange(selectedLanguages.filter((l) => l !== languageId));
    const newProficiency = { ...proficiency };
    delete newProficiency[languageId];
    onProficiencyChange(languageId, "");
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Learning Languages</Label>

      <Select onValueChange={handleLanguageSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add a language" />
        </SelectTrigger>
        <SelectContent>
          {availableLanguages
            .filter((lang) => !selectedLanguages.includes(lang.id))
            .map((language) => (
              <SelectItem key={language.id} value={language.id}>
                {language.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {selectedLanguages.map((languageId) => {
            const language = availableLanguages.find(
              (l) => l.id === languageId
            );
            if (!language) return null;

            return (
              <div
                key={languageId}
                className="flex items-center justify-between gap-4 p-2 border rounded-lg"
              >
                <div className="flex items-center gap-4 px-3">
                  <span className="font-medium">{language.name}</span>
                  <Select
                    value={proficiency[languageId]}
                    onValueChange={(level) =>
                      onProficiencyChange(languageId, level)
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLanguageRemove(languageId)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LanguageSelector;
