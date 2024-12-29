"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserSettings } from "@/features/users/types";

import InterestSelector from "./interests-selector";
import LanguageSelector from "./language-selector";

const UserSettingsContainer: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    interests: [],
    learningLanguages: [],
    proficiency: {},
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <InterestSelector
            selectedInterests={settings.interests}
            onInterestChange={(interests) =>
              setSettings((prev) => ({ ...prev, interests }))
            }
          />

          <LanguageSelector
            selectedLanguages={settings.learningLanguages}
            proficiency={settings.proficiency}
            onLanguageChange={(languages) =>
              setSettings((prev) => ({ ...prev, learningLanguages: languages }))
            }
            onProficiencyChange={(language, level) =>
              setSettings((prev) => ({
                ...prev,
                proficiency: { ...prev.proficiency, [language]: level },
              }))
            }
          />

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingsContainer;
