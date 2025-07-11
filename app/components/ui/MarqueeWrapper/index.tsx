import React from "react";
import Marquee from "react-fast-marquee";
import { services } from "./marqueeItems";
import { GiStarShuriken } from "react-icons/gi";

interface MarqueeProps {
  direction?: "left" | "right";
  wrapperClassName?: string;
  itemClassName?: string;
  sparkleClassName?: string;
}

const MarqueeWrapper: React.FC<MarqueeProps> = ({
  direction = "left",
  wrapperClassName = "bg-primary py-4 lg:py-6 font-medium text-primary-foreground",
  itemClassName = "flex gap-x-2 items-center text-xl sm:text-2xl font-bold lg:text-3xl font-inter",
  sparkleClassName = "w-4 h-4",
}) => {
  return (
    <div className={wrapperClassName}>
      <div className="marquee-inner">
        <Marquee direction={direction} speed={40}>
          {services?.map(({ id, name }) => (
            <div key={id} className={itemClassName}>
              <GiStarShuriken className={sparkleClassName} />
              <span>{name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeWrapper;
