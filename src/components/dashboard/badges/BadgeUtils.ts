
import { BadgeData } from "./types";

// Badge style variants based on level
export const getBadgeVariant = (level: string) => {
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
export const getBadgeStyle = (level: string) => {
  const baseStyle = "flex flex-col items-center p-3 rounded-lg transition-transform duration-300";
  
  switch (level) {
    case "Bronze": return `${baseStyle} bg-amber-50 animate-fade-in`;
    case "Silver": return `${baseStyle} bg-gray-200 animate-fade-in`;
    case "Gold": return `${baseStyle} bg-yellow-100 animate-fade-in`;
    case "Platinum": return `${baseStyle} bg-blue-100 animate-fade-in`;
    case "Diamond": return `${baseStyle} bg-purple-100 animate-fade-in`;
    default: return baseStyle;
  }
};

// Map the old badge names to new names
export const mapOldToNewBadgeName = (oldName: string) => {
  const nameMap: { [key: string]: string } = {
    "Accuracy": "Precision Pro",
    "Creativity": "Creative Spark",
    "Math Skills": "Math Mastermind",
    "Executive Functioning": "Executive Ninja",
    "Self Advocacy": "Self Advocacy",
    "Writing": "Wordsmith Wizard",
    "Phonics": "Sound Decoder",
    "Speed": "Speed Champ",
    "Attendance": "Streak Keeper",
    "Focus": "Focus & Stamina",
    "Reading": "Reading Rockstar",
    "Problem Solving": "Problem Solver"
  };
  
  return nameMap[oldName] || oldName;
};

// Badge descriptions
export const getBadgeDescription = (name: string) => {
  switch (name) {
    case "Creative Spark":
      return "Celebrates unique ideas, original writing, or innovative problem-solving";
    case "Executive Ninja":
      return "Earned for planning ahead, staying organized, or following complex directions smoothly";
    case "Focus & Stamina":
      return "Rewards sustained attention and the ability to finish long or challenging tasks";
    case "Math Mastermind":
      return "Highlights logic, number sense, and advanced math thinking";
    case "Precision Pro":
      return "Rewards careful work and high correctness — whether in reading, math, or reasoning";
    case "Problem Solver":
      return "Highlights flexible thinking, strategy use, and success on multi-step or real-world challenges";
    case "Reading Rockstar":
      return "Targets inference, main idea, and evidence-based reading responses";
    case "Self Advocacy":
      return "Given for speaking up clearly, asking for help, or using self-advocacy strategies effectively";
    case "Sound Decoder":
      return "Earned for decoding tricky words, mastering spelling patterns, or Orton-Gillingham drills";
    case "Speed Champ":
      return "Celebrates increased fluency, fast math facts, or timed challenge wins";
    case "Streak Keeper":
      return "For showing up consistently and building a strong learning streak";
    case "Wordsmith Wizard":
      return "Rewards strong sentences, thoughtful paragraphs, and deep analysis";
    default:
      return "";
  }
};

// Process badges: map names and sort alphabetically
export const processBadges = (badges: BadgeData[]): (BadgeData & { updatedName: string })[] => {
  // Map old names to new names
  const badgesWithUpdatedNames = badges.map((badge) => ({
    ...badge,
    updatedName: mapOldToNewBadgeName(badge.name)
  }));
  
  // Sort alphabetically by updated name
  return [...badgesWithUpdatedNames].sort((a, b) => 
    a.updatedName.localeCompare(b.updatedName)
  );
};
