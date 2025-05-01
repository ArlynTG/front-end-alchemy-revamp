
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getBadgeStyle, getBadgeVariant, getBadgeDescription } from "./BadgeUtils";
import { BadgeIcon } from "./BadgeIcon";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { SingleBadgeProps } from "./types";

export const SingleBadge: React.FC<SingleBadgeProps> = ({ 
  name, 
  updatedName, 
  level, 
  index 
}) => {
  const description = getBadgeDescription(updatedName);
  
  return (
    <Tooltip key={`${name}-${index}`}>
      <TooltipTrigger asChild>
        <div 
          className={getBadgeStyle(level)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="mb-2">
            <BadgeIcon name={updatedName} level={level} />
          </div>
          <span className="text-sm font-medium mb-1 text-center">{updatedName}</span>
          <Badge variant={getBadgeVariant(level)} className="mt-1">
            {level}
          </Badge>
        </div>
      </TooltipTrigger>
      <TooltipContent className="w-60 p-3 text-sm">
        <p className="font-medium">{updatedName}</p>
        <p className="text-gray-600 mt-1">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};
