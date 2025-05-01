
import React from "react";
import { 
  Award, 
  SparklesIcon, 
  BrainIcon, 
  ZapIcon, 
  HandshakeIcon, 
  PencilIcon, 
  Volume2, 
  Timer, 
  CalendarClock,
  Clock,
  BookOpen,
  Puzzle
} from "lucide-react";

interface BadgeIconProps {
  name: string;
  level: string;
  size?: string;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ name, level, size }) => {
  const iconSize = size || 
    (level === "Diamond" || level === "Platinum" ? "h-8 w-8" : 
    level === "Gold" || level === "Silver" ? "h-7 w-7" : "h-6 w-6");
  
  const colorClass = getBadgeColorClass(level);
  
  switch (name) {
    case "Creative Spark":
      return <SparklesIcon className={`${iconSize} ${colorClass}`} />;
    case "Executive Ninja":
      return <ZapIcon className={`${iconSize} ${colorClass}`} />;
    case "Focus & Stamina":
      return <Clock className={`${iconSize} ${colorClass}`} />;
    case "Math Mastermind":
      return <BrainIcon className={`${iconSize} ${colorClass}`} />;
    case "Precision Pro":
      return <Award className={`${iconSize} ${colorClass}`} />;
    case "Problem Solver":
      return <Puzzle className={`${iconSize} ${colorClass}`} />;
    case "Reading Rockstar":
      return <BookOpen className={`${iconSize} ${colorClass}`} />;
    case "Self Advocacy":
      return <HandshakeIcon className={`${iconSize} ${colorClass}`} />;
    case "Sound Decoder":
      return <Volume2 className={`${iconSize} ${colorClass}`} />;
    case "Speed Champ":
      return <Timer className={`${iconSize} ${colorClass}`} />;
    case "Streak Keeper":
      return <CalendarClock className={`${iconSize} ${colorClass}`} />;
    case "Wordsmith Wizard":
      return <PencilIcon className={`${iconSize} ${colorClass}`} />;
    default:
      return <Award className={`${iconSize} ${colorClass}`} />;
  }
};

export const getBadgeColorClass = (level: string) => {
  switch (level) {
    case "Diamond": return "text-purple-500";
    case "Platinum": return "text-blue-500";
    case "Gold": return "text-yellow-500";
    case "Silver": return "text-gray-400";
    case "Bronze": return "text-amber-600";
    default: return "text-gray-500";
  }
};
