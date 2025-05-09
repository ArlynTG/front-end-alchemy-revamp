
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Info } from "lucide-react";
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
        <CardDescription className="flex items-center">
          Earned so far | May 1, 2025
          <span className="ml-2 text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            Click on badges to see details
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sortedBadges.map((badge, index) => (
            <SingleBadge
              key={`${badge.name}-${index}`}
              name={badge.name}
              updatedName={badge.updatedName}
              level={badge.level}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
