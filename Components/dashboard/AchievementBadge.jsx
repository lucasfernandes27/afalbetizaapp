import React from 'react';
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AchievementBadge({ achievement, isUnlocked, index }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
                            isUnlocked 
                                ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-200' 
                                : 'bg-gray-200 grayscale opacity-50'
                        }`}
                    >
                        {achievement.emoji}
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="text-center">
                        <p className="font-semibold">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}