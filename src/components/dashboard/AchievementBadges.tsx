
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  SparklesIcon, 
  BrainIcon, 
  ZapIcon, 
  HandshakeIcon, 
  PencilIcon, 
  Volume2, 
  Timer, 
  CalendarClock 
} from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface BadgeData {
  name: string;
  level: string;
  description?: string;
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

  // Badge descriptions
  const getBadgeDescription = (name: string) => {
    switch (name) {
      case "Precision Pro":
        return "Rewards careful work and high correctness — whether in reading, math, or reasoning";
      case "Creative Spark":
        return "Celebrates unique ideas, original writing, or innovative problem-solving";
      case "Math Mastermind":
        return "Highlights logic, number sense, and advanced math thinking";
      case "Executive Ninja":
        return "Earned for planning ahead, staying organized, or following complex directions smoothly";
      case "Self Advocacy":
        return "Given for speaking up clearly, asking for help, or using self-advocacy strategies effectively";
      case "Wordsmith Wizard":
        return "Rewards strong sentences, thoughtful paragraphs, and deep analysis";
      case "Sound Decoder":
        return "Earned for decoding tricky words, mastering spelling patterns, or Orton-Gillingham drills";
      case "Speed Champ":
        return "Celebrates increased fluency, fast math facts, or timed challenge wins";
      case "Streak Keeper":
        return "For showing up consistently and building a strong learning streak";
      default:
        return "";
    }
  };

  // Icon for badge based on badge name
  const getBadgeIcon = (name: string, level: string) => {
    const size = level === "Diamond" || level === "Platinum" ? "h-8 w-8" : level === "Gold" || level === "Silver" ? "h-7 w-7" : "h-6 w-6";
    const colorClass = getColorClass(level);
    
    switch (name) {
      case "Precision Pro":
        return <Award className={`${size} ${colorClass}`} />;
      case "Creative Spark":
        return <SparklesIcon className={`${size} ${colorClass}`} />;
      case "Math Mastermind":
        return <BrainIcon className={`${size} ${colorClass}`} />;
      case "Executive Ninja":
        return <ZapIcon className={`${size} ${colorClass}`} />;
      case "Self Advocacy":
        return <HandshakeIcon className={`${size} ${colorClass}`} />;
      case "Wordsmith Wizard":
        return <PencilIcon className={`${size} ${colorClass}`} />;
      case "Sound Decoder":
        return <Volume2 className={`${size} ${colorClass}`} />;
      case "Speed Champ":
        return <Timer className={`${size} ${colorClass}`} />;
      case "Streak Keeper":
        return <CalendarClock className={`${size} ${colorClass}`} />;
      default:
        return <Award className={`${size} ${colorClass}`} />;
    }
  };

  // Get color class based on level
  const getColorClass = (level: string) => {
    switch (level) {
      case "Diamond": return "text-purple-500";
      case "Platinum": return "text-blue-500";
      case "Gold": return "text-yellow-500";
      case "Silver": return "text-gray-400";
      default: return "text-gray-500";
    }
  };
  
  // Map the old badge names to new names
  const getUpdatedBadgeName = (oldName: string) => {
    const nameMap: { [key: string]: string } = {
      "Accuracy": "Precision Pro",
      "Creativity": "Creative Spark",
      "Math Skills": "Math Mastermind",
      "Executive Functioning": "Executive Ninja",
      "Self Advocacy": "Self Advocacy",
      "Writing": "Wordsmith Wizard",
      "Phonics": "Sound Decoder",
      "Speed": "Speed Champ",
      "Attendance": "Streak Keeper"
    };
    
    return nameMap[oldName] || oldName;
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
          <TooltipProvider>
            {skillBadges.map((badge, index) => {
              const updatedName = getUpdatedBadgeName(badge.name);
              const description = getBadgeDescription(updatedName);
              
              return (
                <Tooltip key={`${badge.name}-${index}`}>
                  <TooltipTrigger asChild>
                    <div 
                      className={getBadgeStyle(badge.level)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-2">
                        {getBadgeIcon(updatedName, badge.level)}
                      </div>
                      <span className="text-sm font-medium mb-1 text-center">{updatedName}</span>
                      <Badge variant={getBadgeVariant(badge.level)} className="mt-1">
                        {badge.level}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="w-60 p-3 text-sm">
                    <p className="font-medium">{updatedName}</p>
                    <p className="text-gray-600 mt-1">{description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementBadges;
