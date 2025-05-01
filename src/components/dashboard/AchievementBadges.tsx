
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SingleBadge } from "./badges/SingleBadge";
import { AchievementBadgesProps } from "./badges/types";
import { processBadges } from "./badges/BadgeUtils";

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ skillBadges }) => {
  // Process badges to update names and sort them
  const sortedBadges = processBadges(skillBadges);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-amber-500" />
          Achievement Badges
        </CardTitle>
        <CardDescription>Earned so far | May 1, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <TooltipProvider>
            {sortedBadges.map((badge, index) => (
              <SingleBadge
                key={`${badge.name}-${index}`}
                name={badge.name}
                updatedName={badge.updatedName}
                level={badge.level}
                index={index}
              />
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
