import React from "react";
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex items-center">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group rounded-full p-1 flex-center",
            "bg-dark-300 shadow-md transition hover:scale-105",
            index !== 0 && "-ml-3" // overlap effect
          )}
          style={{ zIndex: 10 - index }} // ensures correct stacking order
        >
          {/* Tooltip */}
          <span
            className={cn(
              "tech-tooltip",
              "absolute -top-8 hidden group-hover:block text-xs px-2 py-1 rounded-md bg-gray-800 text-white"
            )}
          >
            {tech}
          </span>

          {/* Icon */}
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-6 rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
