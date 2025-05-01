
export interface BadgeData {
  name: string;
  level: string;
  description?: string;
}

export interface AchievementBadgesProps {
  skillBadges: BadgeData[];
}

export interface SingleBadgeProps {
  name: string;
  updatedName: string;
  level: string;
  index: number;
}
