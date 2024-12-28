import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { availableInterests } from "@/features/users/constants";

const InterestSelector: React.FC<{
  selectedInterests: string[];
  onInterestChange: (interests: string[]) => void;
}> = ({ selectedInterests, onInterestChange }) => {
  const handleInterestSelect = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestChange(selectedInterests.filter((i) => i !== interest));
    } else {
      onInterestChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Interests</Label>
      <div className="flex flex-wrap gap-2">
        {availableInterests.map((interest) => (
          <Badge
            key={interest.id}
            variant={
              selectedInterests.includes(interest.id) ? "default" : "outline"
            }
            className="cursor-pointer hover:opacity-80"
            onClick={() => handleInterestSelect(interest.id)}
          >
            {interest.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
