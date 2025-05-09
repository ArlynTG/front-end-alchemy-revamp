
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getBadgeStyle, getBadgeVariant, getBadgeDescription } from "./BadgeUtils";
import { BadgeIcon } from "./BadgeIcon";
import { motion } from "framer-motion";
import { SingleBadgeProps } from "./types";

export const SingleBadge: React.FC<SingleBadgeProps> = ({ 
  name, 
  updatedName, 
  level, 
  index 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const description = getBadgeDescription(updatedName);
  
  return (
    <div 
      className="perspective-500 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`${updatedName} badge, click to see details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <motion.div
        className={`relative w-full h-full preserve-3d transition-all duration-500`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      >
        {/* Front of card (Badge) */}
        <div 
          className={`${getBadgeStyle(level)} absolute w-full h-full backface-hidden`}
        >
          <div className="mb-2">
            <BadgeIcon name={updatedName} level={level} />
          </div>
          <span className="text-sm font-medium mb-1 text-center">{updatedName}</span>
          <Badge variant={getBadgeVariant(level)} className="mt-1">
            {level}
          </Badge>
        </div>
        
        {/* Back of card (Description) */}
        <div 
          className={`${getBadgeStyle(level)} absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-3`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-xs text-center font-medium">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};
