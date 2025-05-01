
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star } from "lucide-react";

interface BadgeData {
  name: string;
  level: string;
}

interface AchievementBadgesProps {
  skillBadges: BadgeData[];
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ skillBadges }) => {
  // Badge style variants based on level
  const getBadgeVariant = (level: string) => {
    switch (level) {
      case "Bronze": return "outline";
      case "Silver": return "secondary";
      case "Gold": return "default";
      case "Platinum": return "destructive";
      case "Diamond": return "default";
      default: return "outline";
    }
  };

  // Badge style for badges component
  const getBadgeStyle = (level: string) => {
    const baseStyle = "flex flex-col items-center p-3 rounded-lg transition-transform duration-300 hover:scale-105";
    
    switch (level) {
      case "Bronze": return `${baseStyle} bg-gray-100 animate-fade-in`;
      case "Silver": return `${baseStyle} bg-gray-200 animate-fade-in`;
      case "Gold": return `${baseStyle} bg-yellow-100 animate-fade-in`;
      case "Platinum": return `${baseStyle} bg-blue-100 animate-fade-in`;
      case "Diamond": return `${baseStyle} bg-purple-100 animate-fade-in`;
      default: return baseStyle;
    }
  };

  // Icon for badge based on level
  const getBadgeIcon = (level: string) => {
    switch (level) {
      case "Diamond": return <Award className="h-8 w-8 text-purple-500" />;
      case "Platinum": return <Award className="h-8 w-8 text-blue-500" />;
      case "Gold": return <Award className="h-8 w-8 text-yellow-500" />;
      case "Silver": return <Award className="h-7 w-7 text-gray-400" />;
      default: return <Star className="h-6 w-6 text-gray-500" />;
    }
  };

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
          {skillBadges.map((badge, index) => (
            <div 
              key={badge.name} 
              className={getBadgeStyle(badge.level)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-2">
                {getBadgeIcon(badge.level)}
              </div>
              <span className="text-sm font-medium mb-1">{badge.name}</span>
              <Badge variant={getBadgeVariant(badge.level)} className="mt-1">
                {badge.level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
