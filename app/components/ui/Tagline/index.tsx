import { cn } from "@/app/lib/utils";

interface TaglineProps {
  children: React.ReactNode;
  variant?: "left" | "right" | "center";
  className?: string;
}

const Tagline: React.FC<TaglineProps> = ({
  children,
  variant = "center",
  className,
}) => {
  return (
    <h4
      className={cn(
        "inline-block text-[17px] leading-7 uppercase text-primary font-semibold font-space-grotesk relative z-[1] max-w-fit mb-3",
        {
          "ml-20": variant === "left" || variant === "center",
          "mr-20": variant === "right" || variant === "center",
          "tagline-left": variant === "left" || variant === "center",
          "tagline-right": variant === "right" || variant === "center",
        },
        className
      )}
    >
      {children}
    </h4>
  );
};

export default Tagline;
